module.exports = function(app, uuid) {
    var userModel = require("./models/user.model.js")();
    var userService = require("./services/user.service.server.js")(app, userModel, uuid);

    var matchModel = require("./models/match.model.js")();
    var matchService = require("./services/match.service.server.js")(app, matchModel, uuid);

    var miniGameModel = require("./models/miniGame.model.js")();
    var miniGameService = require("./services/miniGame.service.server.js")(app, miniGameModel, uuid);

    var miniGameTypeModel = require("./models/miniGameType.model.js")();
    var miniGameTypeService = require("./services/miniGameType.service.server.js")(app, miniGameTypeModel, uuid);
}