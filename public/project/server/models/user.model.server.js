var q = require("q");

module.exports = function(db, mongoose) {
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel  = mongoose.model("MusicMoodUserModel", UserSchema);
    var api = {
        /* User */
        createUser: createUser,
        updateUserById: updateUserById,
        deleteUserById: deleteUserById,

        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findOne : findOne,

        /* Track */
        addTrackToUser: addTrackToUser,
        findTracksByUserId: findTracksByUserId,
        deleteTrackFromUser: deleteTrackFromUser,

        /* Artist */
        addArtistToUser: addArtistToUser,
        findArtistsByUserId: findArtistsByUserId,
        deleteArtistFromUser: deleteArtistFromUser,

        /* Album */
        addAlbumToUser: addAlbumToUser,
        findAlbumsByUserId: findAlbumsByUserId,
        deleteAlbumFromUser: deleteAlbumFromUser,

        /* Follower */
        addFollowToUser: addFollowToUser,
        findFollowingByUserId: findFollowingByUserId,
        findFollowerByUserId: findFollowerByUserId,
        deleteFollowingFromUser: deleteFollowingFromUser,
        deleteFollowerFromUser: deleteFollowerFromUser
    };
    return api;

    /* USER */
    function createUser(user) {
        var deferred = q.defer();
        UserModel.create(user, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function updateUserById(userId, user) {
        var deferred = q.defer();
        UserModel.update({_id: userId}, {$set: user},
            function(err, user) {
                if(err) {
                    deferred.reject(err);
                }else {
                    console.log("update model", user);
                    UserModel.findOne({_id : userId}, function(err, result) {
                        deferred.resolve(result);
                    });
                }
            });
        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();
        UserModel.remove({_id: userId}, function(err, result) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne({username: username}, function(err, user){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        UserModel.findOne({
            username: credentials.username,
            password: credentials.password
        }, function(err, user){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
                console.log("found user by credentials");
                console.log(user);
            }
        });

        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        UserModel.find(function(err, users) {
            if(err) {
                console.log("err model :", err);
                deferred.reject(err);
            }else {
                console.log("find users from model :", users);
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function(err, user){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findOne(credentials) {
        var deferred = q.defer();
        UserModel.findOne({username : credentials.username}, function(err, user) {
            if(err) {
                deferred.reject(err);
            }else {
                console.log("find one", user);
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    /* Track */
    function addTrackToUser(userId, song) {
        var deferred = q.defer();
        var newSong = song;
        console.log("add song to user:");
        console.log(newSong);

        UserModel.findById(userId, function(err, user){
            user.favoriteSongs.push(newSong);
            console.log(user.favoriteSongs);
            user.save(function(err, user){
                deferred.resolve(user);
                console.log("updatedUser");
                console.log(user);
            });
        });

        return deferred.promise;
    }

    function findTracksByUserId(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function(err, user){
            if(err) {
                console.log(err);
                deferred.reject(err);
            } else {
                console.log("favorite songs are: ");
                console.log(user.favoriteSongs);
                deferred.resolve(user.favoriteSongs);
            }
        });
        return deferred.promise;
    }

    function deleteTrackFromUser(userId, songId) {
        var deferred = q.defer();
        UserModel.findById(userId, function(err, user){
            var songs = user.favoriteSongs;
            for (var i = 0; i < songs.length; i++) {
                if (songs[i].id == songId) {
                    user.favoriteSongs.splice(i, 1);
                    user.save(function(err, user){
                        deferred.resolve(user);
                    });
                }
            }
        });
        return deferred.promise;
    }

    function addArtistToUser(userId, artist) {
        var deferred = q.defer();
        var newArtist = {
            id: artist.id,
            name: artist.name,
            imageUrl: artist.images[0].url
        };
        console.log("add artist to user:");
        console.log(newArtist);

        UserModel.findById(userId, function(err, user){
            user.favoriteArtists.push(newArtist);
            console.log(user.favoriteArtists);
            user.save(function(err, user){
                deferred.resolve(user);
                console.log("updatedUser");
                console.log(user);
            });
        });

        return deferred.promise;
    }

    function findArtistsByUserId(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function(err, user){
            if(err) {
                console.log(err);
                deferred.reject(err);
            } else {
                deferred.resolve(user.favoriteArtists);
                console.log("favorite artists are: ");
                console.log(user);
                console.log(user.favoriteArtists);
            }
        });
        return deferred.promise;
    }

    function deleteArtistFromUser(userId, artistId) {
        var deferred = q.defer();

        UserModel.findById(userId, function(err, user){
            var artists = user.favoriteArtists;
            for (var i = 0; i < artists.length; i++) {
                if (artists[i].id == artistId) {
                    user.favoriteArtists.splice(i, 1);
                    user.save(function(err, user){
                        deferred.resolve(user);
                    });
                }
            }
        });

        return deferred.promise;
    }

    function addAlbumToUser(userId, album) {
        var deferred = q.defer();
        var newAlbum = {
            id: album.id,
            name: album.name,
            imageUrl: album.images[0].url
        };
        console.log("add album to user:");
        console.log(newAlbum);
        UserModel.findById(userId, function(err, user){
            user.favoriteAlbums.push(newAlbum);
            console.log(user.favoriteAlbums);
            user.save(function(err, user){
                deferred.resolve(user);
                console.log("updatedUser");
                console.log(user);
            });
        });

        return deferred.promise;
    }

    function findAlbumsByUserId(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function(err, user){
            if(err) {
                console.log(err);
                deferred.reject(err);
            } else {
                deferred.resolve(user.favoriteAlbums);
                console.log("favorite songs are: ");
                console.log(user);
                console.log(user.favoriteAlbums);
            }
        });
        return deferred.promise;
    }

    function deleteAlbumFromUser(userId, albumId) {
        var deferred = q.defer();

        UserModel.findById(userId, function(err, user){
            var albums = user.favoriteAlbums;
            for (var i = 0; i < albums.length; i++) {
                if (albums[i].id == albumId) {
                    user.favoriteAlbums.splice(i, 1);
                    user.save(function(err, user){
                        deferred.resolve(user);
                    });
                }
            }
        });

        return deferred.promise;
    }

    /* FOLLOW */
    function addFollowToUser(userId, follow) {
        var deferred = q.defer();
        //1. add follow to user.following
        UserModel.findById(userId, function(err, user) {
            user.following.push(follow);
            user.save(function(err, user) {
                console.log("add following: ", user);
                deferred.resolve(user);
            });
            //2. add user to follow.followers
            UserModel.findById(follow._id, function(err, idol) {
                idol.followers.push(user);
                idol.save(function(err, idol) {
                    console.log("add follower: ", idol);
                    deferred.resolve(idol);
                });
            });
        });
        return deferred.promise;
    }

    function findFollowingByUserId(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function(err, user){
            if(err) {
                deferred.reject(err);
            } else {
                console.log("user's followings : ", user.following);
                deferred.resolve(user.following);
            }
        });
        return deferred.promise;
    }

    function findFollowerByUserId(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function(err, user){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user.followers);
                console.log("user's followers: ", user.followers);
            }
        });
        return deferred.promise;
    }

    function deleteFollowingFromUser(userId, followId) {
        var deferred = q.defer();
        UserModel.findById(userId, function(err, user) {
            if(err) {
                deferred.reject(err);
            }else {
                if(user != null) {
                    var followings = user.following;
                    for(var i = 0; i < followings.length; i++) {
                        if(followings[i]._id == followId) {//find followId in following of user
                            user.following.splice(i, 1);//at pos=i removes 1 item
                            user.save(function(err, user) {
                                deferred.resolve(user);
                            });
                        }
                    }
                }
            }
        });
        return deferred.promise;
    }

    function deleteFollowerFromUser(userId, followId) {
        var deferred = q.defer();
        UserModel.findById(userId, function(err, user) {
            if(err) {
                deferred.reject(err);
            }else {
                if(user != null) {
                    var followers = user.followers;
                    for(var i = 0; i < followers.length; i++) {
                        if(followers[i]._id == followId) {
                            user.followers.splice(i, 1);
                            user.save(function(err, user) {
                                deferred.resolve(user);
                            });
                        }
                    }
                }
            }
        });
        return deferred.promise;
    }
};
