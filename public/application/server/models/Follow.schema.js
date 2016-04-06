module.exports = function(mongoose) {
	var FollowSchema = mongoose.Schema({
		id: String,
		username: String
	});

	return FollowSchema;
};