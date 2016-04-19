module.exports = function(app, model, uuid) {

    app.post('/api/project/miniGame', function(req, res) {
        var newMiniGame = req.body;
        newMiniGame.isActive = true;
        model.createMiniGame(newMiniGame).then(
            function(miniGame) {
                res.json(miniGame);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.put('/api/project/miniGame/:miniGameId', function(req, res) {
        var miniGameId = req.params.miniGameId;
        var newMiniGame = req.body;
        model.updateMiniGame(miniGameId, newMiniGame).then(
            function(miniGame) {
                res.json(miniGame);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.put('/api/project/miniGame/:miniGameId/:time', function(req, res) {
        var miniGameId = req.params.miniGameId;
        var player = req.body;
        var time = req.params.time;
        model.addResult(miniGameId, player, time).then(
            function(miniGame) {
                return model.getMiniGame(miniGameId);
            },
            function(err) {
                res.status(400).send(err);
            }
        ).then(
            function(miniGame) {
                res.json(miniGame);
            },
            function(err) {
                console.log(err);
                res.status(400).send(err);
            }
        );
    });

    app.delete('/api/project/miniGame/:miniGameId', function(req, res) {
        var miniGameId = req.params.miniGameId;
        model.deleteMiniGame(miniGameId).then(
            function(obj) {
                res.json(obj);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.get('/api/project/miniGame/:miniGameId', function(req, res) {
        var miniGameId = req.params.miniGameId;
        model.getMiniGame(miniGameId).then(
            function(miniGame) {
                res.json(miniGame);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.get('/api/project/miniGame', function(req, res) {
        model.getAllMiniGames().then(
            function(miniGames) {
                res.json(miniGames);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.post('/api/project/miniGamesWon/:matchId', function(req, res) {
        var matchId = req.params.matchId;
        var player = req.body;
        model.getAllMiniGamesWonForMatchAndPlayer(matchId, player._id).then(
            function(miniGames) {
                res.json({miniGames: miniGames, player: player});
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.put('/api/project/finish/miniGame/:miniGameId/:winningPlayerId', function(req, res) {
        var miniGameId = req.params.miniGameId;
        var winningPlayerId = req.params.winningPlayerId;
        model.finishMiniGame(miniGameId, winningPlayerId).then(
            function(miniGame) {
                res.json(miniGame);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });
}