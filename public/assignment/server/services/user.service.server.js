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
        var user = req.user;
        res.json(user);
    });

    app.get('/api/assignment/loggedIn', function(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
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

    app.post('/api/assignment/admin/user', function (req, res) {
        var user = req.body;
        model.findOne({username: user.username}, function(err, count) {
            if (err != null) {
                res.status(400).send(err);
            }
            else {
                model.create(user, function(err, result) {
                    res.json(result);
                });
            }
        });
    });

    app.get('/api/assignment/admin/user', function (req, res) {
        isUserAdmin(req.user.username, req.user.password, function(user) {
            if (user == '0') {
                res.status(403).send("error");
            }
            else {
                model.find(function(err, users) {
                    if (err != null) {
                        res.status(400).send(err);
                    }
                    else {
                        res.json(users);
                    }
                });
            }
        });
    });

    app.get('/api/assignment/admin/user/:userId', function (req, res) {
        isUserAdmin(req.user.username, req.user.password, function(user) {
            if (user == '0') {
                res.status(403).send("error");
            }
            else {
                var userId = req.params.userId;
                model.findOne({_id: userId},function(err, user) {
                    if (err != null) {
                        res.status(400).send(err);
                    }
                    else {
                        res.json(user);
                    }
                });
            }
        });
    });

    app.delete('/api/assignment/admin/user/:userId', function (req, res) {
        var userId = req.params.userId;

        isUserAdmin(req.user.username, req.user.password, function(user) {
            if (user == '0') {
                res.status(403).send("error");
            }
            else {

                model.remove({_id : userId}, function(err, count) {
                    if (err != null) {
                        res.status(400).send(err);
                    }
                    else {
                        res.send(count);
                    }
                });
            }
        });
    });

    app.put('/api/assignment/admin/user/:userId', function (req, res) {
        isUserAdmin(req.user.username, req.user.password, function(user) {
            if (user == '0') {
                res.status(403).send("error");
            }
            else {
                var userId = req.params.userId;
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
            }
        });
    });

    app.get('/api/assignment/setAdmin/user/:username', function (req, res) {

        var username = req.params.username;

        model.findOne({username: username}, function(err, user) {
            user.roles = ["admin"];
            user.save(function(err, count) {
                if (err != null) {
                    res.status(400).send(err);
                }
                else {
                    res.send(count);
                }
            });
        });

    });

    function isUserAdmin(username, password, callback) {
        model.findOne({username: username, password: password}, function(err, foundUser) {
            if (err != null) {
                callback('0');
            }
            else {
                if (foundUser.roles.indexOf('admin') > -1) {
                    callback(foundUser);
                }
                else {
                    callback('0');
                }
            }
        });
    }

}