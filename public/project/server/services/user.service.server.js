module.exports = function(app, model) {
    /* User */
    app.get('/api/project/token', getToken);
    app.post('/api/project/user', createUser);
    app.get('/api/project/user', findUser);
    app.get('/api/project/user/:id', findUserById);
    app.put('/api/project/user/:id', updateUserById);
    app.delete('/api/project/user/:id', deleteUserById);

    /* Song */
    app.post('/api/project/user/:userId/song', addTrackToUser);
    app.get('/api/project/user/:userId/song', findTracksByUserId);
    app.delete('/api/project/user/:userId/song/:songId', deleteTrackFromUser);

    /* Artist */
    app.post('/api/project/user/:userId/artist', addArtistToUser);
    app.get('/api/project/user/:userId/artist', findArtistsByUserId);
    app.delete('/api/project/user/:userId/artist/:artistId', deleteArtistFromUser);

    /* Album */
    app.post('/api/project/user/:userId/album', addAlbumToUser);
    app.get('/api/project/user/:userId/album', findAlbumsByUserId);
    app.delete('/api/project/user/:userId/album/:albumId', deleteAlbumFromUser);

    /* Follower */
    app.post('/api/project/user/:userId/following', addFollowToUser);
    app.get('/api/project/user/:userId/following', findFollowingByUserId);
    app.get('/api/project/user/:userId/follower', findFollowerByUserId);
    app.delete('/api/project/user/:userId/following/:followId', deleteFollowingFromUser);
    app.delete('/api/project/user/:userId/follower/:followId', deleteFollowerFromUser);

    function getToken(req, res) {
        /* PROJECT */
        var request = require('request');
        var CLIENT_ID = '03ffe0cac0a0401aa6673c3cf6d02ced';
        var CLIENT_SECRET = 'a57c43efb9644574a96d6623fb8bfbc2';
        var REDIRECT_URI = 'http://localhost:3000/callback';
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
            },
            form: {
                grant_type: 'client_credentials'
            },
            json: true
        };

        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                // use the access token to access the Spotify Web API
                res.json(body.access_token);
            }
        });
    }

    function createUser(req, res) {
        model
            .createUser(req.body)
            .then(function(user) {
                res.json(user);
            });
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username != null && password != null) {
            var credentials =
            {
                username: username,
                password: password
            };
            console.log("credential is: ");
            console.log(credentials);
            model
                .findUserByCredentials(credentials)
                .then(function(user) {
                    res.json(user);
                    console.log("found user by credentials: ");
                    console.log(user);
                });
        } else if (username != null) {
            model
                .findUserByUsername(username)
                .then(function(user) {
                    res.json(user);
                });
            console.log("found user by username");
        } else {
            model
                .findAllUsers()
                .then(function(users) {
                    res.json(users);
                });
            console.log("found all users");
        }
    }

    function findUserById(req, res) {
        model
            .findUserById(req.params.id)
            .then(function(user) {
                res.json(user);
            });
    }

    function updateUserById(req, res) {
        model
            .updateUserById(req.params.id, req.body)
            .then(function(users) {
                res.json(users);
            });
    }

    function deleteUserById(req, res) {
        model
            .deleteUserById(req.params.id)
            .then(function(users) {
                res.json(users);
            });
    }

    function addTrackToUser(req, res) {
        console.log(req.body);
        model
            .addTrackToUser(req.params.userId, req.body)
            .then(function(result) {
                res.json(result);
            });
    }

    function findTracksByUserId(req, res) {
        model
            .findTracksByUserId(req.params.userId)
            .then(function(result) {
                res.json(result);
            });
    }

    function deleteTrackFromUser(req, res) {
        model
            .deleteTrackFromUser(req.params.userId, req.params.songId)
            .then(function(result) {
                res.json(result);
            });
    }

    function addArtistToUser(req, res) {
        model
            .addArtistToUser(req.params.userId, req.body)
            .then(function(result) {
                res.json(result);
            });
    }

    function findArtistsByUserId(req, res) {
        model
            .findArtistsByUserId(req.params.userId)
            .then(function(result) {
                res.json(result);
            });
    }

    function deleteArtistFromUser(req, res) {
        model
            .deleteArtistFromUser(req.params.userId, req.params.artistId)
            .then(function(result) {
                console.log("in server service, deleted artist from user");
                console.log(result);
                res.json(result);
            });
    }

    function addAlbumToUser(req, res) {
        model
            .addAlbumToUser(req.params.userId, req.body)
            .then(function(result) {
                res.json(result);
            });
    }

    function findAlbumsByUserId(req, res) {
        model
            .findAlbumsByUserId(req.params.userId)
            .then(function(result) {
                res.json(result);
            });
    }

    function deleteAlbumFromUser(req, res) {
        model
            .deleteAlbumFromUser(req.params.userId, req.params.albumId)
            .then(function(result) {
                res.json(result);
            });
    }

    function addFollowToUser(req, res) {
        model
            .addFollowToUser(req.params.userId, req.body)
            .then(function(result) {
                res.json(result);
            });
    }

    function findFollowingByUserId(req, res) {
        model
            .findFollowingByUserId(req.params.userId)
            .then(function(result) {
                res.json(result);
            });
    }

    function findFollowerByUserId(req, res) {
        model
            .findFollowerByUserId(req.params.userId)
            .then(function(result) {
                res.json(result);
            });
    }

    function deleteFollowingFromUser(req, res) {
        model
            .deleteFollowingFromUser(req.params.userId, req.params.followId)
            .then(function(result) {
                res.json(result);
            });
    }

    function deleteFollowerFromUser(req, res) {
        model
            .deleteFollowerFromUser(req.params.userId, req.params.followId)
            .then(function(result) {
                res.json(result);
            });
    }
}