module.exports = function(app, db, mongoose) {
    var userModel = require("./models/user.model.js")(db, mongoose);
    require("./services/user.service.server.js")(app, userModel);
};