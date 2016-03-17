module.exports = function(app, movieModel, userModel) {
    app.post("/api/project/user/:userId/movie/:imdbID", userLikesMovie);
    app.get("/api/project/movie/:imdbID/user", findUserLikes);

    function findUserLikes (req, res) {
        var imdbID = req.params.imdbID;

        var movie = null;
        movieModel
            .findMovieByImdbID(imdbID)//use the model to look up imdbID
            .then (
                function (doc) {
                    movie = doc;
                    if (doc) {
                        return userModel.findUsersByIds(movie.likes);
                    } else {
                        res.json ({});
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then (
                function (users) {
                    movie.userLikes = users;
                    res.json(movie);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
    /* find id from user.model.server findUserById, then push userId to movie */
    function userLikesMovie(req, res) {
        var movieOmdb  = req.body;//movie
        var userId = req.params.userId;
        var imdbID = req.params.imdbID;
        var movie;

        movieModel
            .userLikesMovie(userId, movieOmdb)
            // add user to movie likes
            .then(
                function (movie) {
                    return userModel.userLikesMovie(userId, movie);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // add movie to user likes
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

        /*if(movie) {
            if(!movie) {
                movie = movieModel.createMovie(movieOmdb);//CREATE MOVIE
            }
            if(!movie.likes) {
                movie.likes = [];
            }
            movie.likes.push(userId);
            var user = userModel.findUserById(userId);
            if(!user.likes) {
                user.likes = [];
            }
            user.likes.push(imdbID);
        }*/
    }
}