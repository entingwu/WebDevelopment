module.exports = function(mongoose) {
	var CommentSchema = mongoose.Schema({
		type: String,
		id: String, /*id of song or artist or album*/
		name: String,
		username: String,
		userId: String,
		content: String,
		date: Date
	}, {collection: "example.comment"});

	return CommentSchema;
};