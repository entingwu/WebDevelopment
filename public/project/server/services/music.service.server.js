module.exports = function(app, userModel) {
    /* TOKEN */
    app.get('/api/project/token', getToken);

    /* Track */
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


    /* TOKEN */
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


    function addTrackToUser(req, res) {
        console.log(req.body);
        userModel
            .addTrackToUser(req.params.userId, req.body)
            .then(function(result) {
                res.json(result);
            });
    }

    function findTracksByUserId(req, res) {
        userModel
            .findTracksByUserId(req.params.userId)
            .then(function(result) {
                res.json(result);
            });
    }

    function deleteTrackFromUser(req, res) {
        userModel
            .deleteTrackFromUser(req.params.userId, req.params.songId)
            .then(function(result) {
                res.json(result);
            });
    }

    function addArtistToUser(req, res) {
        userModel
            .addArtistToUser(req.params.userId, req.body)
            .then(function(result) {
                res.json(result);
            });
    }

    function findArtistsByUserId(req, res) {
        userModel
            .findArtistsByUserId(req.params.userId)
            .then(function(result) {
                res.json(result);
            });
    }

    function deleteArtistFromUser(req, res) {
        userModel
            .deleteArtistFromUser(req.params.userId, req.params.artistId)
            .then(function(result) {
                console.log("in server service, deleted artist from user");
                console.log(result);
                res.json(result);
            });
    }

    function addAlbumToUser(req, res) {
        userModel
            .addAlbumToUser(req.params.userId, req.body)
            .then(function(result) {
                res.json(result);
            });
    }

    function findAlbumsByUserId(req, res) {
        userModel
            .findAlbumsByUserId(req.params.userId)
            .then(function(result) {
                res.json(result);
            });
    }

    function deleteAlbumFromUser(req, res) {
        userModel
            .deleteAlbumFromUser(req.params.userId, req.params.albumId)
            .then(function(result) {
                res.json(result);
            });
    }

};
