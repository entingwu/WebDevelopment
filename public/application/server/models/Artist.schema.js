module.exports = function(mongoose) {
	var ArtistSchema = mongoose.Schema({
		id: String,
		name: String,
		imageUrl: String
	});

	return ArtistSchema;
};