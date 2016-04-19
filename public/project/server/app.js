module.exports = function(app, uuid, mongoose, passport) {
    var userModel = require("./models/user.model.js")(mongoose);
    var userService = require("./services/user.service.server.js")(app, userModel, uuid, passport);

    var matchModel = require("./models/match.model.js")(mongoose);
    var matchService = require("./services/match.service.server.js")(app, matchModel, uuid);

    var miniGameModel = require("./models/miniGame.model.js")(mongoose);
    var miniGameService = require("./services/miniGame.service.server.js")(app, miniGameModel, uuid);

    var miniGameTypeModel = require("./models/miniGameType.model.js")(mongoose);
    var miniGameTypeService = require("./services/miniGameType.service.server.js")(app, miniGameTypeModel, uuid);

    //passport.use(new LocalStrategy(
    //    function(username, password, completion)
    //    {
    //        userModel.findOne({username: username, password: password}, function(err, user)
    //        {
    //            if (err) { return completion(err); }
    //            if (!user) { return completion(null, false); }
    //            return completion(null, user);
    //        })
    //    }));
    //
    //
    //passport.serializeUser(function(user, completion)
    //{
    //    completion(null, user);
    //});
    //
    //passport.deserializeUser(function(user, completion)
    //{
    //    userModel.findById(user._id, function(err, user) {
    //        completion(err, user);
    //    });
    //});
}