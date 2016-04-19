module.exports = function(app, uuid, mongoose, passport, LocalStrategy) {
    var userModel = require("./models/user.model.js")(mongoose);
    var userService = require("./services/user.service.server.js")(app, userModel, passport);

    var formModel = require("./models/form.model.js")(mongoose);
    var formService = require("./services/form.service.server.js")(app, formModel, uuid);

    var fieldModel = require("./models/field.model.js")(mongoose);
    var fieldService = require("./services/field.service.server.js")(app, fieldModel, uuid);

    passport.use(new LocalStrategy(
        function(username, password, completion)
        {
            userModel.findOne({username: username, password: password}, function(err, user)
            {
                if (err) { return completion(err); }
                if (!user) { return completion(null, false); }
                return completion(null, user);
            })
        }));


    passport.serializeUser(function(user, completion)
    {
        completion(null, user);
    });

    passport.deserializeUser(function(user, completion)
    {
        userModel.findById(user._id, function(err, user) {
            completion(err, user);
        });
    });
}