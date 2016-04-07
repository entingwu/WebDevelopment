var mongoose      = require("mongoose");

module.exports = function() {

    var UserSchema = new mongoose.Schema(
        {
            username: String,
            password: String,
            firstName: String,
            lastName: String,
            email: String,
            roles: [String]
        }, {collection: "securityUser"});

    var SecurityUserModel = mongoose.model('SecurityUserModel', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        createUser: createUser,
        removeUser: removeUser,
        updateUser: updateUser,
        getMongooseModel: getMongooseModel
    };
    return api;

    function updateUser(userId, user) {
        return SecurityUserModel.update({_id: userId}, {$set: user});//$set: update with the new json object
    }

    function removeUser(userId) {
        return SecurityUserModel.remove({_id: userId});
    }

    function findAllUsers() {
        return SecurityUserModel.find();
    }
    function createUser(user) {
        return SecurityUserModel.create(user);
    }

    function findUserByUsername(username) {
        return SecurityUserModel.findOne({username: username});
    }

    function getMongooseModel() {
        return SecurityUserModel;
    }

    function findUserById(userId) {
        return SecurityUserModel.findById(userId);
    }

    function findUserByCredentials(credentials) {
        return SecurityUserModel.findOne(
            {
                username: credentials.username,
                password: credentials.password
            }
        );
    }
};