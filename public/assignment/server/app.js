module.exports = function(app, uuid, mongoose) {
    var userModel = require("./models/user.model.js")(mongoose);
    var userService = require("./services/user.service.server.js")(app, userModel);

    var formModel = require("./models/form.model.js")(mongoose);
    var formService = require("./services/form.service.server.js")(app, formModel, uuid);

    var fieldModel = require("./models/field.model.js")(
        mongoose);
    var fieldService = require("./services/field.service.server.js")(app, fieldModel, uuid);
}