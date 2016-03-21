
var q = require("q");

// pass db and mongoose reference to model
module.exports = function(db, mongoose) {//database|connection

    //1. load movie schema from movie model
    var MovieSchema = require("./movie.schema.server.js")(mongoose);//send mongoose to movie.schema.server.js

    //2. Model : use mongoose to create model : create movie from schema
    var Movie  = mongoose.model("Movie", MovieSchema);

    var movies = [];
    var api = {
        findMovieByImdbID: findMovieByImdbID,
        findMoviesByImdbIDs: findMoviesByImdbIDs,
        createMovie: createMovie,
        userLikesMovie: userLikesMovie
    };
    return api;

    function userLikesMovie (userId, movie) {

        var deferred = q.defer();

        // find the movie by imdb ID
        Movie.findOne({imdbID: movie.imdbID},

            function (err, doc) {

                // reject promise if error
                if (err) {
                    deferred.reject(err);
                }

                // if there's a movie
                if (doc) {
                    // add user to likes
                    doc.likes.push (userId);
                    // save changes
                    doc.save(function(err, doc){
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                } else {
                    // if there's no movie
                    // create a new instance
                    movie = new Movie({
                        imdbID: movie.imdbID,
                        title: movie.Title,
                        poster: movie.Poster,
                        likes: []
                    });
                    // add user to likes
                    movie.likes.push (userId);
                    // save new instance
                    movie.save(function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });

        return deferred.promise;
    }

    function findMoviesByImdbIDs (imdbIDs) {
        /*var movies = [];
        for(var id in imdbIDs) {
            var movie = findMovieByImdbID(imdbIDs[id]);
            if(movie) { movie.push(movie); }
        }
        return movies;
        */
        var deferred = q.defer();

        // find all movies whose imdb IDs are in imdbIDs array
        Movie.find({
            imdbID: {$in: imdbIDs}
        }, function (err, movies) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(movies);
            }
        });
        return deferred.promise;
    }

    function createMovie(movie) {//push to the local array movies now
        // create instance of movie : _id: "ID_" + (new Date()).getTime(),
        var movie = new Movie({
            imdbID: movie.imdbID, poster: movie.Poster, title: movie.Title, likes: []
        });
        //movies.push(movie);

        var deferred = q.defer();

        // save movie to database
        movie.save(function (err, doc) {

            if (err) {
                // reject promise if error
                defferred.reject(err)
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        return deferred.promise;
    }

    function findMovieByImdbID(imdbID) {

        var deferred = q.defer();

        Movie.findOne({imdbID: imdbID}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }
}