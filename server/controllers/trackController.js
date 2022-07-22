const uuid = require('uuid');
const path = require('path');
const sequelize = require('../db');
const ApiError = require('../error/apiError');

class TrackController {
    async create(req, res, next) {
        try {
            const { name, information, artistId } = req.body;
            const {file} = req.files;
            let fileName = uuid.v4() + ".ogg";
            file.mv(path.resolve(__dirname,'..', 'static', fileName));
            const sql = `
    	INSERT INTO tracks (name, information, file)
    	VALUES ('${name}', '${information}', '${fileName}')
        RETURNING id, name, information
  		`;
          const newTrack = await sequelize.query(sql, {
				type: sequelize.QueryTypes.INSERT
			});
            if (artistId){
                const sqlArtistTrack = `
            INSERT INTO artist_tracks ("artistId", "trackId")
            VALUES (${artistId}, ${newTrack[0][0].id})
              `;
                const newArtistTrack = await sequelize.query(sqlArtistTrack, {
                    type: sequelize.QueryTypes.INSERT
                })}
			return res.json(newTrack);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
	}

	async getAll(req, res, next) {
		try {
            const {artistId, limit, page} = req.query;
			const pageCol = page || 1;
			const limitCol = limit || 7;
			let offset = pageCol * limitCol - limitCol;
            let sql;
            if (artistId===undefined) {
                sql = `
				SELECT * FROM tracks JOIN artist_tracks ON tracks.id = artist_tracks."trackId"
                JOIN artists ON artist_tracks."artistId"=artists.id OFFSET ${offset} LIMIT ${limitCol}
      `;
			} else {
                sql = `
                SELECT * FROM tracks JOIN artist_tracks ON tracks.id = artist_tracks."trackId"
                JOIN artists ON artist_tracks."artistId"=artists.id WHERE "artistId"=${artistId} OFFSET ${offset} LIMIT ${limitCol}
      `;
            }
			const tracks = await sequelize.query(sql, {
				type: sequelize.QueryTypes.SELECT
			})
			let sqlTotalCount;
			if (artistId===undefined) {
                sqlTotalCount = `
				SELECT count(1) FROM tracks JOIN artist_tracks ON tracks.id = artist_tracks."trackId"
                JOIN artists ON artist_tracks."artistId"=artists.id 
      `;
			} else {
                sqlTotalCount = `
                SELECT count(1) FROM tracks JOIN artist_tracks ON tracks.id = artist_tracks."trackId"
                JOIN artists ON artist_tracks."artistId"=artists.id WHERE "artistId"=${artistId}
      `;
            }
			const totalCount = await sequelize.query(sqlTotalCount, {
				type: sequelize.QueryTypes.SELECT
			})
			return res.json([totalCount,tracks]);
		} catch (error) {
            next(ApiError.badRequest(error.message));
		}

	}

	async getOne(req, res, next) {
		try {
			const id = req.params.id;
			const sql = `
        SELECT tracks.name, tracks.information, tracks.file, artists.fullname, artists.id FROM tracks JOIN artist_tracks ON tracks.id = artist_tracks."trackId"
		JOIN artists ON artist_tracks."artistId"=artists.id WHERE "trackId"=${id}
      `;
			const track = await sequelize.query(sql, {
				type: sequelize.QueryTypes.SELECT
			});
			return res.json(track);
		} catch (error) {
            next(ApiError.badRequest(error.message));
		}

	}

	async deleteOne(req, res, next) {
		try {
			const id = req.params.id;
			const sql = `
        DELETE FROM tracks WHERE id=${id}
      `;
			const track = await sequelize.query(sql, {
				type: sequelize.QueryTypes.DELETE
			});
			return res.json(track);
		} catch (error) {
            next(ApiError.badRequest(error.message));
		}

	}

	async updateTrack(req, res, next) {
		try {
			const data = req.body;
			let nameSql = ["name", "information", "artist"];
			let names = [];
			for (var key in nameSql) {
				if (data[nameSql[key]] !== undefined) {
					names.push(nameSql[key] + '=' + `'${data[nameSql[key]]}'`);

				}
			}
			const sql = "UPDATE artists SET " + names.join(',') + ` WHERE id=${data.id}`;
			const track = await sequelize.query(sql, {
				type: sequelize.QueryTypes.UPDATE
			});
			return res.json(track);
		} catch (error) {
            next(ApiError.badRequest(error.message));
		}

	}
}

module.exports = new TrackController();