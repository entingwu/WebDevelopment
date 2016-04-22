module.exports = function(mongoose) {
    //use mongoose to declare a user schema, json object, {enum, type}
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        phone: [String],
        roles: {
            type: [String],
            default: ['student']
        }
    }, {collection: 'assignment4.user'});//show collections
    return UserSchema;
};