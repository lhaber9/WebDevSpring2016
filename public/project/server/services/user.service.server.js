module.exports = function(app, model, uuid) {

    app.post('/api/project/user', function(req, res) {
        var newUser = req.body;
        newUser.id = uuid.v1();
        res.json(model.createUser(newUser));
    });

    app.put('/api/project/user/:userId', function(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        res.json(model.updateUser(userId, newUser));
    });

    app.delete('/api/project/user/:userId', function(req, res) {
        var userId = req.params.userId;
        res.json(model.deleteUser(userId));
    });

    app.get('/api/project/user/:userId', function(req, res) {
        var userId = req.params.userId;
        res.json(model.getUser(userId));
    });

    app.get('/api/project/user', function(req, res) {
        if (req.query.username) {
            var user;
            if (req.query.password) {
                user = model.findUserByCredentials({"username":req.query.username, "password":req.query.password});
            }
            else {
                user = model.findUserByUsername(req.query.username);
            }
            res.json(user);
        }
        else {
            var allUsers = model.getAllUsers();
            res.json(allUsers);
        }
    });
}