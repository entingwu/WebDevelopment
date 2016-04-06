module.exports = function(app, model) {
	app.get('/api/project/comment', findComment);
	app.post('/api/project/comment', addComment);
	app.get('/api/project/comment/:id', findCommentById);
	app.delete('/api/project/comment/:id', deleteCommentById);
	app.get('/api/project/comment/', findAllComments);
	app.get('/api/project/user/:userId/comment', findCommentsByUserId);
	
	function addComment(req, res) {
		model
		.addComment(req.body)
		.then(function(result) {
			console.log("in server services, add comment");
			console.log(result);
			res.json(result);
		});
	}
	
	function deleteCommentById(req, res) {
		model
			.deleteCommentById(req.params.id)
			.then(function(users) {
				res.json(users);
			});
	}
	
	function findComment(req, res) {
		model
			.findAllComments()
			.then(function(comments) {
				res.json(comments);
			});
		console.log("found all comments");
	}
	
	function findCommentById(req, res) {
		model
			.findCommentById(req.params.id, req.query.type)
			.then(function(result) {
				console.log("in server services, find comment");
				console.log(result);
				res.json(result);
			});
	}
	
	function findCommentsByUserId(req, res) {
		model
			.findCommentsByUserId(req.params.userId)
			.then(function(result){
				res.json(result);
			});
	}
	
	function findAllComments(req, res) {
		model
			.findAllComments()
			.then(function(result){
				res.json(result);
			});
	}
}