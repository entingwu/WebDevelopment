module.exports = function(app, userModel) {
    /* Create server end points, listening for the url and response */
    app.post('/api/assignment/user', register);//1. create
    app.get('/api/assignment/user', login);//2. find
    app.get('/api/assignment/user/:id', find);//3. find id
    app.put('/api/assignment/user/:id', profile);//4. update
    app.delete('/api/assignment/user/:id', logout);//5.delete

    //1. createUser
    function register(req, res) {
        var user = req.body();
        var newUser = userModel.createUser(user);
        res.json(newUser);
    }

    //2. findUser
    function login(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username != null && password != null) {
            var credentials = {
                username : username,
                password : password
            };
            var user = userModel.findUserByCredentials(credentials);
            res.jsonp(user);
        }else if(username != null) {
            var user = userModel.findUserByUsername(username);
            res.jsonp(user);
        }else {
            var users = userModel.findAllUsers();
            res.jsonp(users);
        }
    }

    //3. findId
    function find(req, res) {
        var userId = req.params._id;
        var user = userModel.findUserById(userId);
        res.json(user);
    }

    //4. update
    function profile(req, res) {
        var userId = req.params._id;
        var user = req.body;
        var users = userModel.updateUserById(userId, user);
        res.json(users);
    }

    //5. delete
    function logout(req, res) {
        var userId = req.params._id;
        var users = userModel.deleteUserById(userId);
        res.json(users);

    }

};
