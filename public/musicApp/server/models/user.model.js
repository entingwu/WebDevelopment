var Guid = require('guid');
var q = require("q");

module.exports = function(db, mongoose) {
	var UserSchema = require("./user.schema.js")(mongoose);
  var UserModel  = mongoose.model("ProjectUserModel", UserSchema);
	var api = {
		createUser: createUser,
		findAllUsers: findAllUsers,
		findUserById: findUserById,
		updateUserById: updateUserById,
		deleteUserById: deleteUserById,
		findUserByUsername: findUserByUsername,
		findUserByCredentials: findUserByCredentials,
		addSongToUser: addSongToUser,
		findSongsByUserId: findSongsByUserId,
		deleteSongFromUser: deleteSongFromUser,
		addArtistToUser: addArtistToUser,
		findArtistsByUserId: findArtistsByUserId,
		deleteArtistFromUser: deleteArtistFromUser,
		addAlbumToUser: addAlbumToUser,
		findAlbumsByUserId: findAlbumsByUserId,
		deleteAlbumFromUser: deleteAlbumFromUser,
		addFollowToUser: addFollowToUser,
		findFollowingByUserId: findFollowingByUserId,
		findFollowerByUserId: findFollowerByUserId,
		deleteFollowingFromUser: deleteFollowingFromUser,
		deleteFollowerFromUser: deleteFollowerFromUser
	};
	return api;
	
  //CRUD
	function createUser(user) 
	{
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
		
	function findAllUsers()
	{
		var deferred = q.defer();

		UserModel.find(function(err, users){
			if(err) {
				deferred.reject(err);
			} else {
				deferred.resolve(users);
			}
		});

		return deferred.promise;
	}

	function findUserById(id)
	{
		var deferred = q.defer();

		UserModel.findById(id, function(err, user){
			if(err) {
				deferred.reject(err);
			} else {
				deferred.resolve(user);
			}
		});

		return deferred.promise;
	}

	function updateUserById(id, user)
	{
		var deferred = q.defer();
		
		UserModel.update(
			{_id: id}, 
			{$set: 
				{
					firstName : user.firstName,
					lastName : user.lastName,
					username : user.username,
					password : user.password,
					email : user.email
				}, 
			},
			function(err, result) {
				UserModel.findOne({_id : id}, function(err, result) {
				deferred.resolve(result);
				});
		});

		return deferred.promise;
	}   

	function deleteUserById(id)
	{
		var deferred = q.defer();

		UserModel.remove({_id: id}, function(err, status) {
			if(err) {
				deferred.reject(err);
			} else {
				deferred.resolve(status);
			}
		});

		return deferred.promise;
	}

	function findUserByUsername(username)
	{
		var deferred = q.defer();

		UserModel.findOne({username: username}, function(err, user){
				if(err) {
					deferred.reject(err);
				} else {
					deferred.resolve(user);
					console.log(user);
				}
		});

		return deferred.promise;
	}

	function findUserByCredentials(credentials)
	{	
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
		
	function addSongToUser(userId, song)
	{
		var deferred = q.defer();
		var newSong = {
			id: song.id,
			name: song.name,
			albumName: song.album.name,
			albumId: song.album.id,
			artistName: song.artists[0].name,
			artistId: song.artists[0].id,
			duration_ms: song.duration_ms,
			uri: song.uri,
			popularity: song.popularity
		};
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
	
	function findSongsByUserId(userId)
	{
		var deferred = q.defer();

		UserModel.findById(userId, function(err, user){
			if(err) {
				console.log(err);
				deferred.reject(err);
			} else {
				deferred.resolve(user.favoriteSongs);
				console.log("favorite songs are: ");
				console.log(user);
				console.log(user.favoriteSongs);
			}
		});
		return deferred.promise;
	}
	
	function deleteSongFromUser(userId, songId)
	{
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
	
	function addArtistToUser(userId, artist)
	{
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
	
	function findArtistsByUserId(userId)
	{
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
	
	function deleteArtistFromUser(userId, artistId)
	{
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
	
	function addAlbumToUser(userId, album)
	{
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
	
	function findAlbumsByUserId(userId)
	{
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
	
	function deleteAlbumFromUser(userId, albumId)
	{
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
	
	function addFollowToUser(userId, follow)
	{
		var deferred = q.defer();
		console.log("add follow to user:");
		console.log(follow._id);
		var newFollowing = {
			id: follow._id,
			username: follow.username,
		};
		UserModel.findById(userId, function(err, user){
			user.following.push(newFollowing);
			console.log(user.following);
			user.save(function(err, user){
				deferred.resolve(user);
				console.log("updatedUser, add new following");
				console.log(user);
				
				var newFollower = {
					id: userId,
					username: user.username
				}
				UserModel.findById(follow._id, function(err, user){
					user.followers.push(newFollower);
					console.log(user.followers);
					user.save(function(err, user){
						deferred.resolve(user);
						console.log("updatedUser, add new follower");
						console.log(user);
					});
				});
			});
		});
		return deferred.promise;
	}
	
	function findFollowingByUserId(userId)
	{
		var deferred = q.defer();

		UserModel.findById(userId, function(err, user){
			if(err) {
				console.log(err);
				deferred.reject(err);
			} else {
				deferred.resolve(user.following);
				console.log("user's following are: ");
				console.log(user);
				console.log(user.following);
			}
		});
		return deferred.promise;
	}
	
	function findFollowerByUserId(userId)
	{
		var deferred = q.defer();

		UserModel.findById(userId, function(err, user){
			if(err) {
				console.log(err);
				deferred.reject(err);
			} else {
				deferred.resolve(user.followers);
				console.log("user's followers are: ");
				console.log(user);
				console.log(user.followers);
			}
		});
		return deferred.promise;
	}
	
	function deleteFollowingFromUser(userId, followId)
	{
		var deferred = q.defer();

		UserModel.findById(userId, function(err, user){
			if (user != null) {
				var follows = user.following;
				for (var i = 0; i < follows.length; i++) {
					if (follows[i].id == followId) {
						user.following.splice(i, 1);
						user.save(function(err, user){
							deferred.resolve(user);
						});
					}
				}	
			}
		});
		
		return deferred.promise;
	}
	
	function deleteFollowerFromUser(userId, followId)
	{
		var deferred = q.defer();

		UserModel.findById(userId, function(err, user){
			if (user != null){
				var follows = user.followers;
				for (var i = 0; i < follows.length; i++) {
					if (follows[i].id == followId) {
						user.followers.splice(i, 1);
						user.save(function(err, user){
							deferred.resolve(user);
						});
					}
				}	
			}
		});
		
		return deferred.promise;
	}
};