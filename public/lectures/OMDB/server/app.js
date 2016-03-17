/* 1. pass db and mongoose reference to server side application module
*  2. server.js in public folder ==> load app.js in server folder
*  ==> load user.model.server.js | user.service.server.js */
module.exports = function(app, db, mongoose) {

    /*var model = require("./models/user.model.server.js")();
      var service = require("./services/user.service.server.js")(app, model);*/

    // pass db and mongoose reference to model
    var userModel    = require("./models/user.model.server.js")(db, mongoose);
    var movieModel   = require("./models/movie.model.server.js")(db, mongoose);

    var userService  = require("./services/user.service.server.js") (app, movieModel, userModel);
    /* manipulate the userModel, telling user what movie they like*/
    var movieService = require("./services/movie.service.server.js")(app, movieModel, userModel);
}