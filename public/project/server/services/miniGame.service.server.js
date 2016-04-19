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

    app.put('/api/project/miniGame/deactivate/:miniGameId', function(req, res) {
        var miniGameId = req.params.miniGameId;
        model.deactivateMiniGateType(miniGameId).then(
            function(miniGame) {
                res.json(miniGame);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });
}