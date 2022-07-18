
const sequelize = require('../db');
const ApiError = require('../error/apiError');

class ArtistController {
	async create(req, res, next) {
		try {
			const { fullname, datebirth, information, trackId} = req.body;
			const sql = `
    	INSERT INTO artists (fullname, datebirth, information)
    	VALUES ('${fullname}', '${datebirth}', '${information}')
			RETURNING id, fullname, datebirth, information
  		`;
			const newArtist = await sequelize.query(sql, {
				type: sequelize.QueryTypes.INSERT
			});
			if (trackId){
				const sqlArtistTrack = `
		INSERT INTO artist_tracks ("trackId", "artistId")
		VALUES (${trackId}, ${newArtist[0][0].id})
			`;
				const newArtistTrack = await sequelize.query(sqlArtistTrack, {
						type: sequelize.QueryTypes.INSERT
				})}
			return res.json(newArtist[0]);

		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}

	async getAll(req, res, next) {
		try {
			const trackId = req.query;
			let sql;
			if (Object.keys(trackId).length===0) {
			sql = `
        SELECT * FROM artists
      `;
			}
			if (Object.keys(trackId).length>0) {
				sql = `
				SELECT * FROM artists JOIN artist_tracks ON artists.id = artist_tracks."artistId"
				JOIN tracks ON artist_tracks."trackId"=tracks.id WHERE "trackId"=${trackId.trackId}
`;
		}
			const artists = await sequelize.query(sql, {
				type: sequelize.QueryTypes.SELECT
			})
			return res.json(artists);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}

	}

	async getOne(req, res) {
		try {
			const id = req.params.id;
			const sql = `
        SELECT * FROM artists WHERE id=${id}
      `;
			const artist = await sequelize.query(sql, {
				type: sequelize.QueryTypes.SELECT
			});
			return res.json(artist);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}

	}

	async deleteOne(req, res) {
		try {
			const id = req.params.id;
			const sql = `
        DELETE FROM artists WHERE id=${id}
      `;
			const artist = await sequelize.query(sql, {
				type: sequelize.QueryTypes.DELETE
			});
			return res.json(artist);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}

	}

	async updateArtist(req, res) {
		try {
			const data = req.body;
			let nameSql = ["fullname", "datebirth", "information"];
			let names = [];
			for (var key in nameSql) {
				if (data[nameSql[key]] !== undefined) {
					names.push(nameSql[key] + '=' + `'${data[nameSql[key]]}'`);

				}
			}
			const sql = "UPDATE artists SET " + names.join(',') + ` WHERE id=${data.id}`;
			const artist = await sequelize.query(sql, {
				type: sequelize.QueryTypes.UPDATE
			});
			return res.json(artist);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}

	}
}

module.exports = new ArtistController();