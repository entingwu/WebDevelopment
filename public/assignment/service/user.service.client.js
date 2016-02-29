/**
 * The user service will provide data access to user data across the application.
 * Controllers for various views will use the user service to create, lookup, and update user data.
 * We'll group all our services under a directory called services.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService() {
        var users = [
            {"_id":123, "firstName":"Alice",  "lastName":"Wonderland","username":"alice",  "password":"alice", "roles": ["student"]},
            {"_id":234, "firstName":"Bob",    "lastName":"Hope",      "username":"bob",    "password":"bob", "roles": ["admin"]},
            {"_id":345, "firstName":"Charlie","lastName":"Brown",     "username":"charlie","password":"charlie", "roles": ["faculty"]},
            {"_id":456, "firstName":"Dan",    "lastName":"Craig",     "username":"dan",    "password":"dan", "roles": ["faculty", "admin"]},
            {"_id":567, "firstName":"Edward", "lastName":"Norton",    "username":"ed",     "password":"ed", "roles": ["student"]}
        ];

        var service = {
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser
        };
        return service;

        function findUserByCredentials(username, password, callback) {
            for(var i = 0; i < users.length; i++) {
                if(users[i].username == username && users[i].password == password) {
                    console.log("find user: " + username);
                    callback(users[i]);
                    break;
                }
            }
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function createUser(user, callback) {
            var newUser = {
                _id :(new Date).getTime(),
                username : user.username,
                password : user.password,
                email : user.email
            };
            users.push(newUser);
            callback(newUser);
        }

        function deleteUserById(userId, callback) {
            for(var i = 0; i < users.length; i++) {
                if(users[i]._id == userId) {
                    users.splice(i, 1);
                    //The second parameter of splice is the number of elements to remove.
                    //Note that splice modifies the array in place and returns a new array containing the elements that have been removed.
                }
            }
            callback(users);
        }

        function updateUser(userId, user, callback) {
            var updatedUser;
            for(var i = 0; i < users.length; i++) {
                if(users[i]._id == userId) {
                    users[i] = {
                        _id :userId,
                        username : user.username,
                        password : user.password,
                        firsNname : user.firstName,
                        lastName : user.lastName,
                        email : user.email
                    }
                    updatedUser = users[i];
                }
            }
            callback(updatedUser);
        }
    }
})();