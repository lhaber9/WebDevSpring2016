module.exports = function(app, model, uuid) {

    app.post('/api/project/match', function(req, res) {
        var newMatch = req.body;
        newMatch.isActive = true;
        newMatch.isStarted = false;
        model.createMatch(newMatch).then(
            function(match) {
                res.json(match);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.put('/api/project/match/start/:matchId', function(req, res) {
        var matchId = req.params.matchId;
        model.startMatch(matchId).then(
            function(obj) {
                return model.getMatch(matchId);
            },
            function(err) {
                res.status(400).send(err);
            }
        ).then(
            function(match) {
                res.json(match);
            },
            function(err) {
                console.log(err);
                res.status(400).send(err);
            }
        );
    });

    app.put('/api/project/match/:matchId', function(req, res) {
        var matchId = req.params.matchId;
        var newMatch = req.body;
        model.updateMatch(matchId, newMatch).then(
            function(obj) {
                return model.getMatch(matchId);
            },
            function(err) {
                res.status(400).send(err);
            }
        ).then(
            function(match) {
                res.json(match);
            },
            function(err) {
                console.log(err);
                res.status(400).send(err);
            }
        );
    });

    app.delete('/api/project/match/:matchId', function(req, res) {
        var matchId = req.params.matchId;
        model.deleteMatch(matchId).then(
            function(obj) {
                res.json(obj);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.get('/api/project/match/:matchId', function(req, res) {
        var matchId = req.params.matchId;
        model.getMatch(matchId).then(
            function(match) {
                res.json(match);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.get('/api/project/match', function(req, res) {
        model.getAllMatches().then(
            function(matches) {
                res.json(matches);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.get('/api/project/active/match', function(req, res) {
        model.getAllActiveMatches().then(
            function(activeMatches) {
                res.json(activeMatches);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.get('/api/project/unstarted/match', function(req, res) {
        model.getAllActiveUnstartedMatches().then(
            function(activeMatches) {
                res.json(activeMatches);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.put('/api/project/match/:matchId/deactivate', function(req, res) {
        var matchId = req.params.matchId;
        model.deactivateMatch(matchId).then(
            function(match) {
                res.json(match);
            },
            function(err) {
                console.log(err);
                res.status(400).send(err);
            }
        );
    });

    app.put('/api/project/match/:matchId/addUser', function(req, res) {
        var matchId = req.params.matchId;
        var newUser = req.body;
        model.addUserToMatch(newUser, matchId).then(
            function(match) {
                res.json(match);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.put('/api/project/match/:matchId/removeUser/:userId', function(req, res) {
        var matchId = req.params.matchId;
        var userId = req.params.userId;
        model.removeUserFromMatch(userId, matchId).then(
            function(match) {
                res.json(match);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });
}