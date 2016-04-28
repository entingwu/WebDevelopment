var bcrypt = require("bcrypt-nodejs");
module.exports = function(app, userModel, passport, LocalStrategy) {
    var admin = isAdmin;
    var auth = authorized;

    /* USER SERVICE */
    app.post('/api/project/login', passport.authenticate('local-project'), login);
    app.get('/api/project/loggedin',         loggedin);
    app.post('/api/project/logout',          logout);
    app.post('/api/project/register',        register);
    app.put('/api/project/user/:userId',     updateUserById);
    app.get('/api/project/user',             findUser);
    app.get('/api/project/user/:userId',     findUserById);

    /* ADMIN */
    app.get('/api/project/admin/user',            /*admin,*/     getAllUsers);
    app.post('/api/project/admin/user',           /*admin,*/     createUser);
    app.put('/api/project/admin/user/:userId',    /*admin,*/     updateUserByAdmin);
    app.delete('/api/project/admin/user/:userId', /*admin,*/     deleteUserById);

    /* Follower */
    app.post('/api/project/user/:userId/following', addFollowToUser);
    app.get('/api/project/user/:userId/following', findFollowingByUserId);
    app.get('/api/project/user/:userId/follower', findFollowerByUserId);
    app.delete('/api/project/user/:userId/following/:followId', deleteFollowingFromUser);
    app.delete('/api/project/user/:userId/follower/:followId', deleteFollowerFromUser);


    /* new LocalStrategy(function) */
    passport.use('local-project', new LocalStrategy(localStrategyProject));
    passport.serializeUser(serializeUser);//to client
    passport.deserializeUser(deserializeUser);//back from client

    /* localStrategy : If is username && password, done */
    function localStrategyProject(username, password, done) {
        userModel
            .findOne({username : username, password : password})
            .then(
                function(user) {
                    if(user == null) {
                        return done(null, false);
                    }else if(bcrypt.compareSync(password, user.password)) {
                        console.log("localStrategy: ", user);
                        return done(null, user);
                    }else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if(err) { return done(err); }
                }
            );
    }

    /* serializeUser : serialize the user object into the session*/
    function serializeUser(user, done) {
        done(null, user);
    }

    /* deserializeUser : retrieve the user object from the session */
    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user) {
                    done(null, user);
                },
                function(err) {
                    done(err, null);
                }
            );
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function isAdmin(req, res, next) {
        if (req.isAuthenticated()  && req.user.roles.indexOf("admin") >= 0) {
            next();
        } else {
            res.status(403);
        }
    }

    /* login, loggedin, logout, register */
    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        console.log("loggedin: ",req.user);
        res.send(req.isAuthenticated()? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        userModel
            .findUserByUsername(newUser.username)//check if user exists
            .then(
                function(user) {
                    if(user) {
                        res.json(null);//exist
                    }else {//not exist, create in database
                        newUser.password = bcrypt.hashSync(newUser.password);
                        console.log("register hashSync", newUser.password);
                        return userModel.createUser(newUser);
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(user) {//return new user from createUser
                    if(user) {
                        req.login(user, function(err) {//notify passport, serialize
                            if(err) {
                                res.status(400).send(err);
                            }else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err) {//createUser error
                    res.status(400).send(err);
                }
            );
    }

    function updateUserById(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }
        console.log("update in server : ", newUser);
        //If user has not updated password, user.password will be the same as db
        //Or it will perform hash on the new password
        userModel
            .findUserById(userId)
            .then(function(user) {
                if(user.password != newUser.password) {
                    newUser.password = bcrypt.hashSync(newUser.password);
                }
                userModel
                    .updateUserById(userId, newUser)
                    .then(
                        function(user) {
                            console.log("update newUser : ",user);
                            res.json(user);
                        },
                        function(err) {
                            res.status(400).send(err);
                        }
                    );
            });
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username != null && password != null) {
            var credentials = { username: username, password: password
            };
            console.log("credential is: ", credentials);
            userModel
                .findUserByCredentials(credentials)
                .then(function(user) {
                    res.json(user);
                    console.log("found user by credentials: ", user);
                });
        } else if (username != null) {
            userModel
                .findUserByUsername(username)
                .then(function(user) {
                    res.json(user);
                    console.log("found user by username", user);
                });

        } else {
            userModel
                .findAllUsers()
                .then(function(users) {
                    res.json(users);
                    console.log("found all users", users);
                });
        }
    }

    function findUserById(req, res) {
        userModel
            .findUserById(req.params.userId)
            .then(function(user) {
                res.json(user);
            });
    }

    /* ADMIN */
    function getAllUsers(req, res) {
        console.log("server");
        userModel
            .findAllUsers()
            .then(
                function(users) {
                    console.log("server",users);
                    res.json(users);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createUser(req, res) {
        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1) {
            var role_str = newUser.roles.toString();
            var roles = role_str.split(",");
            newUser.roles = roles;
        }

        //first check if a user already exists with the username
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user) {
                    //a. if the user does not already exist
                    if(user == null) {
                        //create a new user
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser)
                            .then(
                                function(user) {
                                    console.log("create server", user);
                                    res.json(user);//successfully
                                },
                                function(err) {
                                    res.status(400).send(err);
                                }
                            );
                    }
                },
                function(err) {//c. find user error
                    res.status(400).send(err);
                }
            );
    }

    function updateUserByAdmin(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }
        console.log("update in server : ", newUser);
        //If user has not updated password, user.password will be the same as db
        //Or it will perform hash on the new password
        userModel
            .findUserById(userId)
            .then(function(user) {
                if(user.password != newUser.password) {
                    newUser.password = bcrypt.hashSync(newUser.password);
                }
                userModel
                    .updateUserById(userId, newUser)
                    .then(
                        function(user) {
                            console.log("update newUser : ",user);
                            res.json(user);
                        },
                        function(err) {
                            res.status(400).send(err);
                        }
                    );
            });
    }

    function deleteUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUserById(userId)
            .then(
                function(user) {//return from delete
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
           );
    }

    /* FOLLOW */
    function addFollowToUser(req, res) {
        userModel
            .addFollowToUser(req.params.userId, req.body)
            .then(function(result) {
                res.json(result);
            });
    }

    function findFollowingByUserId(req, res) {
        userModel
            .findFollowingByUserId(req.params.userId)
            .then(function(result) {
                res.json(result);
            });
    }

    function findFollowerByUserId(req, res) {
        userModel
            .findFollowerByUserId(req.params.userId)
            .then(function(result) {
                res.json(result);
            });
    }

    function deleteFollowingFromUser(req, res) {
        userModel
            .deleteFollowingFromUser(req.params.userId, req.params.followId)
            .then(function(result) {
                res.json(result);
            });
    }

    function deleteFollowerFromUser(req, res) {
        userModel
            .deleteFollowerFromUser(req.params.userId, req.params.followId)
            .then(function(result) {
                res.json(result);
            });
    }
};