module.exports = function(app, model) {
	app.post('/api/project/user', createUser);
	app.get('/api/project/user', findUser);
	app.get('/api/project/user/:id', findUserById);
	app.put('/api/project/user/:id', updateUserById);
	app.delete('/api/project/user/:id', deleteUserById);
	app.post('/api/project/user/:userId/song', addSongToUser);
	app.get('/api/project/user/:userId/song', findSongsByUserId);
	app.delete('/api/project/user/:userId/song/:songId', deleteSongFromUser);
	app.post('/api/project/user/:userId/artist', addArtistToUser);
	app.get('/api/project/user/:userId/artist', findArtistsByUserId);
	app.delete('/api/project/user/:userId/artist/:artistId', deleteArtistFromUser);
	app.post('/api/project/user/:userId/album', addAlbumToUser);
	app.get('/api/project/user/:userId/album', findAlbumsByUserId);
	app.delete('/api/project/user/:userId/album/:albumId', deleteAlbumFromUser);
	app.post('/api/project/user/:userId/following', addFollowToUser);
	app.get('/api/project/user/:userId/following', findFollowingByUserId);
	app.get('/api/project/user/:userId/follower', findFollowerByUserId);
	app.delete('/api/project/user/:userId/following/:followId', deleteFollowingFromUser);
	app.delete('/api/project/user/:userId/follower/:followId', deleteFollowerFromUser);
	
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
	
	function addSongToUser(req, res) {
		model
			.addSongToUser(req.params.userId, req.body)
			.then(function(result) {
				res.json(result);
			});
	}
	
	function findSongsByUserId(req, res) {
		model
			.findSongsByUserId(req.params.userId)
			.then(function(result) {
				res.json(result);
			});
	}
	
	function deleteSongFromUser(req, res) {
		model
			.deleteSongFromUser(req.params.userId, req.params.songId)
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