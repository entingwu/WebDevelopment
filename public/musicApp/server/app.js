module.exports = function(app, db, mongoose) {
	var userModel = require("./models/user.model.js")(db, mongoose);
	var commentModel = require("./models/comment.model.js")(db, mongoose);
//	var albumModel = require("./models/album.model.js")();
//	var artistModel = require("./models/artist.model.js")();
//	var searchModel = require("./models/search.model.js")();
//	var songModel = require("./models/song.model.js")();

	require("./services/user.service.js")(app, userModel);
	require("./services/comment.service.js")(app, commentModel);
//	require("./services/album.service.js")(app, albumModel);
//	require("./services/artist.service.js")(app, artistModel);
//	require("./services/search.service.js")(app, searchModel);
//	require("./services/song.service.js")(app, songModel);
};