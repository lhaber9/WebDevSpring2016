module.exports = function(app, model, uuid) {

    app.post('/api/project/miniGameType', function(req, res) {
        var miniGameTypeId = req.params.miniGameTypeId;
        var newMiniGameType = req.body;
        newMiniGameType.id = uuid.v1();
        newMatch.isActive = true;
        res.json(model.createMiniGameType(newMiniGameType));
    });

    app.put('/api/project/miniGameType/:miniGameTypeId', function(req, res) {
        var miniGameTypeId = req.params.miniGameTypeId;
        var newMiniGameType = req.body;
        res.json(model.updateMiniGameType(miniGameTypeId, newMiniGameType));
    });

    app.delete('/api/project/miniGameType/:miniGameTypeId', function(req, res) {
        var miniGameTypeId = req.params.miniGameTypeId;
        res.json(model.deleteMiniGameType(miniGameTypeId));
    });

    app.get('/api/project/miniGameType/:miniGameTypeId', function(req, res) {
        var miniGameTypeId = req.params.miniGameTypeId;
        res.json(model.getMiniGameType(miniGameTypeId));
    });

    app.get('/api/project/miniGameType', function(req, res) {
        res.json(model.getAllMiniGameTypes());
    });

    app.put('/api/project/miniGameType/deactivate/:miniGameTypeId', function(req, res) {
        var miniGameTypeId = req.params.miniGameTypeId;
        res.json(model.deactivateMiniGateType(miniGameTypeId));
    });
}