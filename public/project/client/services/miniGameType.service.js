(function(){
    angular
        .module("ProjectApp")
        .factory("MiniGameTypeService", MiniGameTypeService);

    function MiniGameTypeService($http) {

        var api = {
            createMiniGameType:createMiniGameType,
            deleteMiniGameType:deleteMiniGameType,
            updateMiniGameType:updateMiniGameType,
            getMiniGameType:getMiniGameType,
            getAllMiniGameTypes:getAllMiniGameTypes,
            deactivateMiniGateType:deactivateMiniGateType
        };

        return api;

        function createMiniGameType(miniGameType) {
            return $http.post("/api/project/miniGameType", miniGameType);
        }

        function deleteMiniGameType(miniGameTypeId) {
            return $http.delete("/api/project/miniGameType/" + miniGameTypeId);
        }

        function updateMiniGameType(miniGameTypeId, miniGameType) {
            return $http.put("/api/project/miniGameType/" + miniGameTypeId, miniGameType);
        }

        function getMiniGameType(miniGameTypeId) {
            return $http.get("/api/project/miniGameType/" + miniGameTypeId);
        }

        function getAllMiniGameTypes() {
            return $http.get("/api/project/miniGameType");
        }

        function deactivateMiniGateType(miniGameTypeId) {
            return $http.put("/api/project/miniGameType/deactivate/" + miniGameTypeId);
        }
    }
})();