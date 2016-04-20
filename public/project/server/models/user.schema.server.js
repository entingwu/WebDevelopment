module.exports = function(mongoose) {
    var SongSchema = require("./song.schema.server.js")(mongoose);
    var ArtistSchema = require("./artist.schema.server.js")(mongoose);
    var AlbumSchema = require("./album.schema.server.js")(mongoose);
    var FollowSchema = require("./follow.schema.server.js")(mongoose);
    var UserSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        password: String,
        email: String,
        genres: String,
        favoriteSongs:[SongSchema],
        favoriteArtists:[ArtistSchema],
        favoriteAlbums:[AlbumSchema],
        following: [FollowSchema],/* an array of users I am following*/
        followers:[FollowSchema]/* an array of users who are following me*/
    }, {collection: "project.musicMood.user"});

    return UserSchema;
};