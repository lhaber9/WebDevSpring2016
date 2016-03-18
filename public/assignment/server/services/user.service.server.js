module.exports = function(app, model) {

    app.post('/api/assignment/user', function(req, res) {
        var newUser = req.body;
        var users = model.create(newUser);
        res.json(users);
    });

    app.get('/api/assignment/user/:id', function(req, res) {
        var userId = req.params.id;
        var user = model.findById(userId);
        res.json(user);
    });

    app.put('/api/assignment/user/:id', function(req, res) {
        var userId = req.params.id;
        var newUser = req.body;
        var users = model.updateById(userId, newUser);
        res.json(users);
    });

    app.delete('/api/assignment/user/:id', function(req, res) {
        var userId = req.params.id;
        var users = model.deleteById(userId);
        res.json(users);
    });

    app.get('/api/assignment/user', function(req, res) {
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
            var allUsers =  model.findAll();
            res.json(allUsers);
        }
    });

}