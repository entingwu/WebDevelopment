module.exports = function(app, userModel, passport, LocalStrategy) {

    //var bcrypt = require("bcrypt-nodejs");
    var auth = authorized;
    var admin = isAdmin;
    /* express object app listen to the api login
     * passport takes a look at the request, successful let it go*/
    /* WEB SERVICES */
    app.post('/api/assignment/login', passport.authenticate('local'), login);//1. login
    app.get('/api/assignment/loggedin',         loggedin);//2.
    app.post('/api/assignment/logout',          logout);//3.no middleware
    app.post('/api/assignment/register',        register);//4. register

    /* ADMIN : first check: auth, second check: isAdmin()*/
    app.post('/api/assignment/admin/user',          admin,    createUser);//5
    app.get('/api/assignment/admin/user',           admin,    getAllUsers);//6
    app.get('/api/assignment/admin/user/:userId',   admin,    getUserById);//7
    app.get('/api/assignment/admin/user/:username', admin,    getUserByUsername);
    app.delete('/api/assignment/admin/user/:userId',admin,    deleteUser);//8
    app.put('/api/assignment/admin/user/:userId',   admin,    updateUser);//9

    /* new LocalStrategy(function) */
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);//to client
    passport.deserializeUser(deserializeUser);//back from client

    /* localStrategy : If is username && password, done */
    function localStrategy(username, password, done) {//call done from passport
        userModel
            .findUserByCredentials({username : username, password : password})
            .then(//inform the passport framework whether a user exists with the credentials
                function(user) {
                    if(!user) { return done(null, false); }//invalid
                    return done(null, user);//send user to passport.js
                },
                function(err) {
                    if(err) { return done(err); }
                }
            );
    }

    /* serializeUser : serialize the user object into the session */
    function serializeUser(user, done) {
        done(null, user);//user id in cookie
    }

    /* deserializeUser : retrieve the user object from the session */
    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)//find user
            .then(
                function(user) {
                    done(null, user);
                },
                function() {
                    done(err, null);
                }
            );
    }

    /* auth : first check */
    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();//callback, continue in the chain
        }
    }

    function isAdmin(req, res, next) {
        if (req.isAuthenticated()  && req.user.roles.indexOf("admin") > 0) {
            next();
        } else {
            res.status(403);
        }
    }

    /* 1. login */
    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    /* 2. logged in */
    function loggedin(req, res) {//whethter the user is currently logged in
        console.log(req.user);
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    /* 3. logout */
    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    /* 4. register : send back user*/
    function register(req, res) {
        var newUser = req.body;
        userModel
            .findUserByUsername(newUser.username)//check if user exists
            .then(
                function(user) {
                    if(user) {
                        res.json(null);//exist
                    }else {//not exist, create in database
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

    /* ADMIN : 5. createUser : send back all users */
    function createUser(req, res) {
        var newUser = req.body;
        //string -> array
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        }else {
            newUser.roles = ["student"];
        }

        //first check if a user already exists with the username
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user) {
                    //a. if the user does not already exist
                    if(user == null) {
                        //create a new user
                        return userModel.createUser(newUser)
                            .then(
                                function() {//successfully, fetch all user
                                    return userModel.findAllUsers();
                                },
                                function(err) {//create error
                                    res.status(400).send(err);
                                }
                            );
                    }else {
                        //b. if the user already exists, then just fetch all the users
                        return userModel.findAllUsers();
                    }
                },
                function(err) {//c. find user error
                    res.status(400).send(err);
                }
            )
            .then(
                function(users) {//all users
                    res.json(users);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    /* 6. Admin : getAllUsers */
    function getAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then(
                function(users) {
                    res.json(users);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    /* 7. getUserById */
    function getUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function getUserByUsername(req, res) {
        var username = req.params.username;
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    /* 8. deleteUser */
    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUserById(userId)
            .then(
                function(user) {//return from delete
                    return userModel.findAllUsers();
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(users) {//return from findAllUsers
                    console.log("delete users in server : ", users);
                    res.json(users);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    /* 9. updateUser */
    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        for(var e in newUser.emails) {
            newUser.emails[e] = newUser.emails[e].trim();
        }
        UserModel
            .updateUserById(userId, newUser)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );

    }
};
