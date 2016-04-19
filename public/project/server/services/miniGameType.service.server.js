module.exports = function(app, model, uuid) {

    app.post('/api/project/miniGameType', function(req, res) {
        var newMiniGameType = req.body;
        newMiniGameType.isActive = true;
        model.createMiniGameType(newMiniGameType).then(
            function(miniGameType) {
                res.json(miniGameType);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.put('/api/project/miniGameType/:miniGameTypeId', function(req, res) {
        var miniGameTypeId = req.params.miniGameTypeId;
        var newMiniGameType = req.body;
        updateMiniGameType(miniGameTypeId, newMiniGameType).then(
            function(miniGameType) {
                res.json(miniGameType);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.delete('/api/project/miniGameType/:miniGameTypeId', function(req, res) {
        var miniGameTypeId = req.params.miniGameTypeId;
        model.deleteMiniGameType(miniGameTypeId).then(
            function(obj) {
                res.json(obj);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.get('/api/project/miniGameType/:miniGameTypeId', function(req, res) {
        var miniGameTypeId = req.params.miniGameTypeId;
        model.getMiniGameType(miniGameTypeId).then(
            function(miniGameType) {
                res.json(miniGameType);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.get('/api/project/miniGameType', function(req, res) {
        model.getAllMiniGameTypes().then(
            function(miniGameTypes) {
                res.json(miniGameTypes);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.put('/api/project/miniGameType/deactivate/:miniGameTypeId', function(req, res) {
        var miniGameTypeId = req.params.miniGameTypeId;
        model.deactivateMiniGateType(miniGameTypeId).then(
            function(miniGameType) {
                res.json(miniGameType);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });
}