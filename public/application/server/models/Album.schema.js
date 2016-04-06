module.exports = function(mongoose) {
	var AlbumSchema = mongoose.Schema({
		id: String,
		name: String,
		imageUrl: String
	});

	return AlbumSchema;
};