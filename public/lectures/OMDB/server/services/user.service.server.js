/* user.service.server.js(post) <==mirror==> user.service.client.js(listen)
*  interface between the http world and database world */
module.exports = function(app, movieModel, userModel) {

    /* 1. create server end points, listening for the url and response */
    app.post("/api/project/login", findUserByCredentials);
    app.get("/api/project/omdb/loggedin", loggedin);

    app.post("/api/project/omdb/login", login);
    app.post("/api/project/omdb/logout", logout);
    app.post("/api/project/omdb/register", register);
    app.get("/api/project/omdb/profile/:userId", profile);


    function findUserByCredentials(req, res) {
        var credentials = req.body;//retrieve json
        userModel.findUserByCredentials(credentials);

        var user = userModel.findUserByCredentials(credentials);//null

        /* 1. cookie == session id : server ask browser to identify
         *    server save cookie. Find out the query comes from. Bind the cookie to identity
         * 2. request.session is map to unique cookie from the current browser. [expensive]
         *    find the user and store in a big hashmap. */
        req.session.currentUser = user;
        res.json(user);//back to client
    }

    /* when  app.get("/api/project/omdb/loggedin", loggedin) ask anybody login, we use hashmap req.session to answer
    *  null : no body login | user object
    *  req.session : stateful object*/
    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {//destrory the session
        req.session.destroy();
        res.send(200);
    }

    function register(req, res) {
        var user = req.body;

        user = userModel.createUser(user)
            // handle model promise
            .then(
                // login user if promise resolved
                function ( doc ) {
                    req.session.currentUser = doc;
                    res.json(user);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function profile(req, res) {
        var userId = req.params.userId;
        var user = null;

        // use model to find user by id
        userModel.findUserById(userId)
            .then(

                // first retrieve the user by user id
                function (doc) {

                    user = doc;

                    // fetch movies this user likes
                    return movieModel.findMoviesByImdbIDs(doc.likes);
                },

                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                // fetch movies this user likes
                function (movies) {

                    // list of movies this user likes
                    // movies are not stored in database
                    // only added for UI rendering
                    user.likesMovies = movies;
                    res.json(user);
                },

                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function login(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            )
    }


}