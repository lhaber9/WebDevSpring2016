(function(){
    angular
        .module("ProjectApp")
        .factory("MatchService", MatchService);

    function MatchService($http) {

        var api = {
            createMatch:createMatch,
            deleteMatch:deleteMatch,
            updateMatch:updateMatch,
            getMatch:getMatch,
            getAllMatches:getAllMatches,
            getAllActiveMatches:getAllActiveMatches,
            deactivateMiniGateType:deactivateMiniGateType,
            addPlayerToMatch:addPlayerToMatch,
            removePlayerFromMatch:removePlayerFromMatch,
            startMatch:startMatch,
            getAllActiveUnstartedMatches:getAllActiveUnstartedMatches,
            getAllForUser:getAllForUser
        };

        return api;

        function createMatch(match) {
            return $http.post("/api/project/match", match);
        }

        function startMatch(matchId) {
            return $http.put("/api/project/match/start/" + matchId);
        }

        function deleteMatch(matchId) {
            return $http.delete("/api/project/match/" + matchId);
        }

        function updateMatch(matchId, match) {
            return $http.put("/api/project/match/" + matchId, match);
        }

        function getMatch(matchId) {
            return $http.get("/api/project/match/" + matchId);
        }

        function getAllMatches() {
            return $http.get("/api/project/match");
        }

        function getAllActiveMatches() {
            return $http.get("/api/project/active/match");
        }

        function getAllActiveUnstartedMatches() {
            return $http.get("/api/project/unstarted/match");
        }

        function getAllForUser(userId) {
            return $http.get("/api/project/matchesForUser/" + userId);
        }

        function deactivateMiniGateType(matchId) {
            return $http.put("/api/project/match/" + matchId + "/deactivate" );
        }

        function addPlayerToMatch(user, matchId) {
            return $http.put("/api/project/match/" + matchId + "/addUser", user);
        }

        function removePlayerFromMatch(userId, matchId) {
            return $http.put("/api/project/match/" + matchId + "/removeUser/" + userId);
        }
    }
})();