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
            deactivateMiniGateType:deactivateMiniGateType
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

        function deactivateMiniGateType(miniGameId) {
            return $http.put("/api/project/miniGame/deactivate/" + miniGameId);
        }
    }
})();