module.exports = function(app, model) {

    app.post('/api/assignment/user', function(req, res) {
        var newUser = req.body;
        model.create(newUser).then(
            function(user) {
                res.json(user);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.get('/api/assignment/user/:id', function(req, res) {
        var userId = req.params.id;
        model.findById(userId).then(
            function(user) {
                res.json(user);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.put('/api/assignment/user/:id', function(req, res) {
        var userId = req.params.id;
        var newUser = req.body;
        model.updateById(userId, newUser).then(
            function(user) {
                res.json(user);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.delete('/api/assignment/user/:id', function(req, res) {
        var userId = req.params.id;
        model.deleteById(userId).then(
            function(status) {
                res.json(status);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.get('/api/assignment/user', function(req, res) {
        if (req.query.username) {
            if (req.query.password) {
                model.findUserByCredentials({"username":req.query.username, "password":req.query.password}).then(
                    function(user) {
                        console.log("HERE");
                        res.json(user);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                );
            }
            else {
                model.findUserByUsername(req.query.username).then(
                    function(user) {
                        res.json(user);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                );
            }
        }
        else {
            model.findAll().then(
                function(users) {
                    res.json(users);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
        }
    });

}