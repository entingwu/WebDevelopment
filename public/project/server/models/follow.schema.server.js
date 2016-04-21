module.exports = function(mongoose) {
    var FollowSchema = mongoose.Schema({
        _id: String,
        username: String
    });
    return FollowSchema;
};