module.exports = function(app, model, uuid) {

    app.post('/api/project/miniGame', function(req, res) {
        var miniGameId = req.params.miniGameId;
        var newMiniGame = req.body;
        newMiniGame.id = uuid.v1();
        newMatch.isActive = true;
        res.json(model.createMiniGame(newMiniGame));
    });

    app.put('/api/project/miniGame/:miniGameId', function(req, res) {
        var miniGameId = req.params.miniGameId;
        var newMiniGame = req.body;
        res.json(model.updateMiniGame(miniGameId, newMiniGame));
    });

    app.delete('/api/project/miniGame/:miniGameId', function(req, res) {
        var miniGameId = req.params.miniGameId;
        res.json(model.deleteMiniGame(miniGameId));
    });

    app.get('/api/project/miniGame/:miniGameId', function(req, res) {
        var miniGameId = req.params.miniGameId;
        res.json(model.getMiniGame(miniGameId));
    });

    app.get('/api/project/miniGame', function(req, res) {
        res.json(model.getAllMiniGames());
    });

    app.put('/api/project/miniGame/deactivate/:miniGameId', function(req, res) {
        var miniGameId = req.params.miniGameId;
        res.json(model.deactivateMiniGateType(miniGameId));
    });
}