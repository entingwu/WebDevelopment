module.exports = function(app, db, mongoose) {
    "use strict";
    /* MODEL */
    var userModel = require("./models/user.model.server.js")(db, mongoose);//db instance and mongoose library
    var formModel = require("./models/form.model.server.js")(db, mongoose);

    /* SERVICE*/
    var userService = require("./services/user.service.server.js")(app, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js")(app, formModel);
};
