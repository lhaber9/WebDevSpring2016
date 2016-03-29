module.exports = function(app, model, uuid) {

    app.post('/api/project/match', function(req, res) {
        var newMatch = req.body;
        newMatch.id = uuid.v1();
        newMatch.isActive = true;
        newMatch.players = [];
        res.json(model.createMatch(newMatch));
    });

    app.put('/api/project/match/start/:matchId', function(req, res) {
        var matchId = req.params.matchId;
        res.json(model.startMatch(matchId));
    });

    app.put('/api/project/match/:matchId', function(req, res) {
        var matchId = req.params.matchId;
        var newMatch = req.body;
        res.json(model.updateMatch(matchId, newMatch));
    });

    app.delete('/api/project/match/:matchId', function(req, res) {
        var matchId = req.params.matchId;
        res.json(model.deleteMatch(matchId));
    });

    app.get('/api/project/match/:matchId', function(req, res) {
        var matchId = req.params.matchId;
        res.json(model.getMatch(matchId));
    });

    app.get('/api/project/match', function(req, res) {
        res.json(model.getAllMatches());
    });

    app.get('/api/project/match/active', function(req, res) {
        console.log("HERE");
        var activeMatches = model.getAllActiveMatches();
        res.json(activeMatches);
    });

    app.put('/api/project/match/:matchId/deactivate', function(req, res) {
        var matchId = req.params.matchId;
        res.json(model.deactivateMiniGateType(matchId));
    });

    app.put('/api/project/match/:matchId/addUser', function(req, res) {
        var matchId = req.params.matchId;
        var newUser = req.body;
        res.json(model.addUserToMatch(newUser, matchId));
    });

    app.put('/api/project/match/:matchId/removeUser/:userId', function(req, res) {
        var matchId = req.params.matchId;
        var userId = req.params.userId;
        res.json(model.removeUserFromMatch(userId, matchId));
    });
}