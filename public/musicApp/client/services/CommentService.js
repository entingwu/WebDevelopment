(function()
{
	angular
	.module("PandaMusicApp")
	.factory("CommentService", commentService);

	function commentService($http, $q)
	{ 
		var service = {
			addComment : addComment,
			findAllComments : findAllComments,
			deleteCommentById : deleteCommentById,
			findAllCommentsByAlbumId : findAllCommentsByAlbumId,
			findAllCommentsByArtistId : findAllCommentsByArtistId,
			findAllCommentsBySongId : findAllCommentsBySongId,
			findAllCommentsByUserId : findAllCommentsByUserId
		};

		return service;
		
		function addComment(comment)
		{
			var deferred = $q.defer();
			$http
				.post('/api/project/comment/', comment)
				.success(function(response) {
					console.log("in client services, add comment");
					console.log(response);
					deferred.resolve(response);	
				});						 
			return deferred.promise;
		}
		
		function deleteCommentById(id)
		{
			var deferred = $q.defer();
			$http
				.delete('/api/project/comment/' + id)
				.success(function(response) {
					deferred.resolve(response);	
				});						 
			return deferred.promise;
		}
		
		function findAllComments()
		{
			var deferred = $q.defer();
			$http
				.get('/api/project/comment/')
				.success(function(response) {
					console.log("in client services, find all comments");
					console.log(response);
					deferred.resolve(response);
				});
			return deferred.promise;
		}
		
		function findAllCommentsByAlbumId(albumId)
		{
			var deferred = $q.defer();
			$http
				.get('/api/project/comment/' + albumId +'?type=album')
				.success(function(response) {
					console.log("in client services, find comments");
					console.log(response);
					deferred.resolve(response);
				});
			return deferred.promise;
		}
		
		function findAllCommentsByArtistId(artistId)
		{
			var deferred = $q.defer();
			$http
				.get('/api/project/comment/' + artistId +'?type=artist')
				.success(function(response) {
					console.log("in client services, find comments");
					console.log(response);
					deferred.resolve(response);
				});
			return deferred.promise;
		}
		
		function findAllCommentsBySongId(songId)
		{
			var deferred = $q.defer();
			$http
				.get('/api/project/comment/' + songId +'?type=song')
				.success(function(response) {
					console.log("in client services, find comments");
					console.log(response);
					deferred.resolve(response);
				});
			return deferred.promise;
		}
		
		function findAllCommentsByUserId(userId)
		{
			var deferred = $q.defer();
			$http
				.get('/api/project/user/' + userId +'/comment')
				.success(function(response) {
					console.log("in client services, find current user's comments");
					console.log(response);
					deferred.resolve(response);
				});
			return deferred.promise;
		}
		
//		function findAllFormsForUser(userId)
//		{
//			var deferred = $q.defer();
//			$http
//				.get('/api/assignment/user/' + userId + '/form')
//				.success(function(response) {
//					deferred.resolve(response);	
//				});						 
//			return deferred.promise;
//		}
//		function createFormForUser(userId, form)
//		{
//			var deferred = $q.defer();
//			$http
//				.post('/api/assignment/user/' + userId + '/form', form)
//				.success(function(response) {
//					deferred.resolve(response);
//				});						 
//			return deferred.promise;
//		}
		
//		function findAlbumsByUserId(userId)
//		{
//			var deferred = $q.defer();
//			$http
//				.get('/api/project/user/' + userId + '/album')
//				.success(function(response) {
//					deferred.resolve(response);
//				});
//			return deferred.promise;
//		}
//		
//		function deleteAlbumFromUser(userId, albumId)
//		{
//			var deferred = $q.defer();
//			$http
//				.delete('/api/project/user/' + userId + '/album/' + albumId)
//				.success(function(response) {
//					deferred.resolve(response);
//				});
//			return deferred.promise;
//		}
		
	}
})();