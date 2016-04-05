var Guid = require('guid');
var q = require("q");

module.exports = function(db, mongoose) {
	var CommentSchema = require("./comment.schema.js")(mongoose);
  var CommentModel  = mongoose.model("ProjectCommentModel", CommentSchema);
	var api = {
		addComment : addComment,
		deleteCommentById : deleteCommentById,
		findAllComments : findAllComments,
		findCommentById : findCommentById,
		findCommentsByUserId : findCommentsByUserId
	};
	return api;
	
  //CRUD
	function addComment(comment)
	{
		var deferred = q.defer();

		CommentModel.create(comment, function(err, comment) {
			if(err) {
				console.log(err);
				deferred.reject(err);
			} else {
				console.log("in comment model, add comment");
				console.log(comment);
				deferred.resolve(comment);
			}
		});

		return deferred.promise;
	}
	
	function findAllComments()
	{
		var deferred = q.defer();

		CommentModel.find(function(err, comments){
			if(err) {
				deferred.reject(err);
			} else {
				deferred.resolve(comments);
			}
		});

		return deferred.promise;
	}
	
	function findCommentById(id, type)
	{
		var deferred = q.defer();

		CommentModel.find(
			{
				type: type,
				id: id
			}, 
			function(err, comments){
			if(err) {
				deferred.reject(err);
			} else {
				console.log("in server comment model, find comment");
				console.log(comments);
				deferred.resolve(comments);
			}
		});
		return deferred.promise;
	}
	
	function deleteCommentById(id)
	{
		var deferred = q.defer();

		CommentModel.remove({_id: id}, function(err, status) {
			if(err) {
				deferred.reject(err);
			} else {
				deferred.resolve(status);
			}
		});

		return deferred.promise;
	}
	
	function findCommentsByUserId(userId)
	{
		var deferred = q.defer();

		CommentModel.find(
			{
				userId: userId
			}, 
			function(err, comments){
			if(err) {
				deferred.reject(err);
			} else {
				console.log("in server comment model, find current user's comment");
				console.log(comments);
				deferred.resolve(comments);
			}
		});
		return deferred.promise;
	}
};