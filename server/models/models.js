const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Artist = sequelize.define('artist', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fullname: {type: DataTypes.STRING},
    datebirth: {type: DataTypes.DATE},
    information: {type: DataTypes.TEXT}
})

const Track = sequelize.define('track', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    information: {type: DataTypes.TEXT},
    file: {type: DataTypes.STRING, allowNull:false}
})

const ArtistTrack = sequelize.define('artist_track', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

Artist.belongsToMany(Track, {through: ArtistTrack});
Track.belongsToMany(Artist, {through: ArtistTrack});

module.exports = {
    User,
    Artist,
    ArtistTrack,
    Track
}