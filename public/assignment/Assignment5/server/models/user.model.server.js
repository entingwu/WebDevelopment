var q = require("q");//load a promise library

// pass db and mongoose reference to model
module.exports = function(db, mongoose) {
    "use strict";
    //1. load user schema, sharing the mongoose instance
    var UserSchema = require("./user.schema.server.js")(mongoose);

    //2. create user model(data access object, high level api) from schema. To use mongoose raw database operations.
    var UserModel = mongoose.model('AdminUserModel', UserSchema);//'User' default collection name

    var api = {
        //CRUD
        createUser : createUser,
        findAllUsers : findAllUsers,
        findUserById : findUserById,
        updateUserById : updateUserById,
        deleteUserById : deleteUserById,
        //USER
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials
    };
    return api;

    //CRUD
    function createUser(user) {
        // use q to defer the response
        var deferred = q.defer();
        // insert new user with mongoose user model's create().  low level api, talk to mongoDB
        // send command to database, nodeJs don't wait, come back call this function at some point
        // user: actual instance store in database.
        UserModel.create(user, function(err, user) {//asynchronize call
            console.log(user);
            if(err) {
                //reject promise if error
                deferred.reject(err);
            }else {
                //resolve promise
                deferred.resolve(user);
            }
        });
        return deferred.promise;//return a promise
    }

    //update the found instance with property values in the argument instance object
    //The $set operator replaces the value of a field with the specified value.
    function updateUserById(userId, user) {
        var deferred = q.defer();
        UserModel.update(
            {_id : userId},
            {$set : user},
            function(err, user) {
                if(err) {
                    deferred.reject(err);
                }else {
                    UserModel.findOne({_id : userId}, function(err, user) {
                        if(err) {
                            deferred.reject(err);
                        }else {
                            deferred.resolve(user);
                        }
                    });
                }
            }
        );
        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();
        UserModel.remove({
            _id : userId
        }, function(err, doc) {
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        UserModel.find(function(err, users) {
            if(err) {
                deferred.reject(err);
            }else {
                console.log("find users from model :" + users);
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        /* findById is in mongoose API, find the instance matching this primary key */
        UserModel.findById(userId, function(err, user) {
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    /* findUserByUsername(username) - returns a single user | null */
    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne({username : username},function(err, user){
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    /* findUserByCredentials(credentials) - accepts an object credentials with properties username and password.
       Returns a single user from the model */
    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        // find one retrieves one document
        UserModel.findOne({
            // first argument is predicate
            username : credentials.username,
            password : credentials.password
            // user is unique instance matches predicate
            }, function(err, user) {
                if(err) {
                    // reject promise if error
                    deferred.reject(err);
                }else {
                    console.log("Call from credentials");
                    // resolve promise
                    deferred.resolve(user);
                }
        });
        return deferred.promise;
    }

};