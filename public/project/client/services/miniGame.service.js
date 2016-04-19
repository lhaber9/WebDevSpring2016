(function(){
    angular
        .module("ProjectApp")
        .factory("MiniGameService", MiniGameService);

    function MiniGameService($http) {

        var api = {
            createMiniGame:createMiniGame,
            deleteMiniGame:deleteMiniGame,
            updateMiniGame:updateMiniGame,
            getMiniGame:getMiniGame,
            getAllMiniGames:getAllMiniGames,
            finishMiniGame:finishMiniGame,
            addResult:addResult,
            getAllMiniGamesWonForMatchAndPlayer:getAllMiniGamesWonForMatchAndPlayer
        };

        return api;

        function createMiniGame(miniGame) {
            return $http.post("/api/project/miniGame", miniGame);
        }

        function deleteMiniGame(miniGameId) {
            return $http.delete("/api/project/miniGame/" + miniGameId);
        }

        function updateMiniGame(miniGameId, miniGame) {
            return $http.put("/api/project/miniGame/" + miniGameId, miniGame);
        }

        function getMiniGame(miniGameId) {
            return $http.get("/api/project/miniGame/" + miniGameId);
        }

        function getAllMiniGames() {
            return $http.get("/api/project/miniGame");
        }

        function getAllMiniGamesWonForMatchAndPlayer(matchId, player) {
            return $http.post("/api/project/miniGamesWon/" + matchId, player);
        }

        function finishMiniGame(miniGameId, winnerId) {
            return $http.put("/api/project/finish/miniGame/" + miniGameId + "/" + winnerId);
        }

        function addResult(miniGameId, player, time) {
            return $http.put("/api/project/miniGame/" + miniGameId + "/" + time, player);
        }
    }
})();