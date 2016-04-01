module.exports = function(app, userModel) {
    /* Create server end points, listening for the url and response */
    app.post('/api/assignment/user', register);//1. create
    app.get('/api/assignment/user', login);//2. find
    app.get('/api/assignment/user/:id', find);//3. find id
    app.put('/api/assignment/user/:id', profile);//4. update
    app.delete('/api/assignment/user/:id', logout);//5.delete

    //1. createUser
    function register(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(//handle model promise
                // login user if promise resolved
                function(user) {
                    //req.session.currentUser = user;
                    res.json(user);
                },
                // send error if promise rejected
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    //2. findUser
    function login(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username != null && password != null) {
            var credentials = {
                username : username, password : password
            };
            userModel
                .findUserByCredentials(credentials)
                .then(
                    function(user) {
                        res.json(user);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                );
        }else if(username != null) {
            userModel
                .findUserByUsername(username)
                .then(function(user) {
                        res.json(user);
                });
        }else {
            userModel
                .findAllUsers()
                .then(function(users) {
                    res.json(users);
                });
        }
    }

    //3. findId
    function find(req, res) {
        var userId = req.params.id;
        userModel
            .findUserById(userId)
            .then(function(user) {
                res.json(user);
            });
    }

    //4. update profile
    function profile(req, res) {
        var userId = req.params.id;
        var user = req.body;
        userModel
            .updateUserById(userId, user)
            .then(
                function(user) {
                    // deferred.resolve(user); send back to client
                    res.json(user);
                },
                function(err) {
                    // returns from deferred.reject(err);
                    res.status(400).send(err);
                }
            );
    }

    //5. delete
    function logout(req, res) {
        var userId = req.params.id;
        userModel
            .deleteUserById(userId)
            .then(function(users) {
                res.json(users);
            });
    }
};
