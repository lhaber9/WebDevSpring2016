module.exports = function(app, model, uuid, passport) {

    app.post('/api/project/user/login', passport.authenticate('local'), function(req, res) {
        var user = req.user;
        res.json(user);
    });

    app.get('/api/project/user/loggedIn', function(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    app.post('/api/project/user', function(req, res) {
        var newUser = req.body;
        model.createUser(newUser).then(
            function(user) {
                res.json(user);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.put('/api/project/:userId/user', function(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        model.updateUser(userId, newUser).then(
            function(obj) {
                return model.getUser(userId);
            },
            function(err) {
                res.status(400).send(err);
            }
        ).then(
            function(user) {
                res.json(user);
            },
            function(err) {
                console.log(err);
                res.status(400).send(err);
            }
        );
    });

    app.delete('/api/project/user/:userId', function(req, res) {
        var userId = req.params.userId;
        model.deleteUser(userId).then(
            function(user) {
                res.json(user);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.get('/api/project/user/:userId', function(req, res) {
        var userId = req.params.userId;
        model.getUser(userId).then(
            function(user) {
                res.json(user);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    //app.get('/api/project/user', function(req, res) {
    //    if (req.query.username) {
    //        var user;
    //        if (req.query.password) {
    //            user = model.findUserByCredentials({"username":req.query.username, "password":req.query.password});
    //        }
    //        else {
    //            user = model.findUserByUsername(req.query.username);
    //        }
    //        res.json(user);
    //    }
    //    else {
    //        var allUsers = model.getAllUsers();
    //        res.json(allUsers);
    //    }
    //});
}