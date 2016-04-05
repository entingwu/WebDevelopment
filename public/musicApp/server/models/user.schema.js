module.exports = function(mongoose) {
	var SongSchema = require("./Song.schema.js")(mongoose);
	var ArtistSchema = require("./Artist.schema.js")(mongoose);
	var AlbumSchema = require("./Album.schema.js")(mongoose);
	var FollowSchema = require("./Follow.schema.js")(mongoose);
	var UserSchema = mongoose.Schema({
		firstName: String,
		lastName: String,
		username: String,
		password: String,
		email: String,
		favoriteSongs:[SongSchema],
		favoriteArtists:[ArtistSchema],
		favoriteAlbums:[AlbumSchema],
		following: [FollowSchema],/* an array of users I am following*/
		followers:[FollowSchema]/* an array of users who are following me*/
	}, {collection: "example.user"});

	return UserSchema;
};