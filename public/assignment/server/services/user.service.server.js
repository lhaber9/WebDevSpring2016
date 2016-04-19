module.exports = function(app, model, passport) {

    app.post('/api/assignment/register', function(req, res) {
        var user = req.body
        model.findOne({username: user.username}, function(err, existingUser) {
            if(existingUser != null) {
                res.json(null);
                return;
            }
            else {
                model.create(user, function(err, result) {
                    res.json(result);
                });
            }
        });
    });

    app.post('/api/assignment/login', passport.authenticate('local'), function(req, res) {
        model.findOne({"username":req.query.username, "password":req.query.password}, function(err, existingUser) {
            if(err != null) {
                res.status(400).send(err);
                return;
            }
            else {
                res.json(existingUser);
            }
        });
    });

    app.get('/api/assignment/loggedin', function(req, res)
    {
        res.send(req.isAuthenticated() ? req.body : '0');
    });

    app.post('/api/assignment/logout', function(req, res)
    {
        req.logOut();
        res.send(200);
    });

    app.get('/api/assignment/user/:id', function(req, res) {
        var userId = req.params.id;
        model.findById(userId, function(err, user) {
            if (err == null) {
                res.json(user);
            }
            else {
                res.json(err);
            }
        });
    });

    app.put('/api/assignment/user/:id', function(req, res) {
        var userId = req.params.id;
        var user = req.body;

        model.findById(userId, function(err, foundUser) {
            foundUser.update(user, function(err, count) {
                if (err != null) {
                    res.status(400).send(err);
                }
                else {
                    res.send(count);
                }
            });
        });
    });

    app.delete('/api/assignment/user/:id', function(req, res) {
        var userId = req.params.id;

        model.remove({_id : userId}, function(err, count) {
            if (err != null) {
                res.status(400).send(err);
            }
            else {
                res.send(count);
            }
        });
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