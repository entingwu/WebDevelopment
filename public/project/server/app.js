module.exports = function(app, db, mongoose, passport, LocalStrategy) {
    /* MODEL */
    var projectUserModel = require("./models/user.model.server.js")(db, mongoose);

    /* SERVICE*/
    var userService = require("./services/user.service.server.js")(app, projectUserModel, passport, LocalStrategy);
    var musicService = require("./services/search.service.server.js")(app, projectUserModel);

};