module.exports = function(app, uuid) {
    var userModel = require("./models/user.model.js")();
    var userService = require("./services/user.service.server.js")(app, userModel);

    var formModel = require("./models/form.model.js")();
    var formService = require("./services/form.service.server.js")(app, formModel, uuid);

    var fieldModel = require("./models/field.model.js")();
    var fieldService = require("./services/field.service.server.js")(app, fieldModel, uuid);
}