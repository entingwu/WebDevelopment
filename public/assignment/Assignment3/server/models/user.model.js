var users = require("./user.mock.json");
var Guid = require('guid');
module.exports = function(app) {
    "use strict";
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
        var newUser = {
            _id : Guid.create(),
            username : user.username,
            password : user.password,
            email : user.email
        };
        users.push(newUser);//restore
        return newUser;
    }

    //update the found instance with property values in the argument instance object
    function updateUserById(userId, user) {
        for(var i = 0; i < users.length; i++) {
            if(users[i]._id == userId) {
                users[i] = {
                    _id : user._id,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    username : user.username,
                    password : user.password,
                    email : user.email
                };
                return users[i];
            }
        }
        return null;
    }

    function deleteUserById(userId) {
        for(var i = 0; i < users.length; i++) {
            if(users[i]._id == userId) {
                users.splice(i, 1);
            }
        }
        return users;
    }

    function findAllUsers() {
        return users;
    }

    function findUserById(userId) {
        for(var i = 0; i < users.length; i++) {
            if(users[i]._id == userId) {
                return users[i];
            }
        }
        return null;
    }

    /* findUserByUsername(username) - returns a single user | null */
    function findUserByUsername(username) {
        for(var i = 0; i < users.length; i++) {
            if(users[i].username == username) {
                return users[i];
            }
        }
        return null;
    }

    /* findUserByCredentials(credentials) - accepts an object credentials with properties username and password.
       Returns a single user from the model */
    function findUserByCredentials(credentials) {
        for(var i = 0; i < users.length; i++) {
            if(credentials.username == users[i].username
                && credentials.password == users[i].password) {
                return users[i];
            }
        }
        return null;
    }

};