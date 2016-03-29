(function(){
    angular
        .module("ProjectApp")
        .controller("MiniGameTypeController", MiniGameTypeController);

    function MiniGameTypeController($scope) {
        $scope.addMiniGameType = addMiniGameType;
        $scope.updateMiniGameType = updateMiniGameType;
        $scope.deleteMiniGameType = deleteMiniGameType;
        $scope.selectMiniGameType = selectMiniGameType;

        $scope.miniGameTypes = [];
        resetEditingMiniGameType();

        function resetEditingMiniGameType() {
            $scope.editingMiniGameType = {
                "id":"",
                "isActive":false,
                "maxPlayers": 0,
                "description":"",
                "gameLength":0
            }
        }

        function addMiniGameType() {
            $scope.miniGameTypes.push($scope.editingMiniGameType);
            resetEditingMiniGameType();
        }

        function updateMiniGameType() {
            for (miniGameTypeIndex in $scope.miniGameTypes) {
                var miniGameType = $scope.miniGameTypes[miniGameTypeIndex];
                if (miniGameType.id == $scope.editingMiniGameType.id) {
                    $scope.miniGameTypes[miniGameTypeIndex] = $scope.editingMiniGameType;
                    resetEditingMiniGameType();
                    return;
                }
            }
        }

        function deleteMiniGameType(deleteMiniGameType) {
            for (miniGameTypeIndex in $scope.miniGameTypes) {
                var miniGameType = $scope.miniGameTypes[miniGameTypeIndex];
                if (miniGameType.id == deleteMiniGameType.id) {
                    $scope.miniGameTypes.splice(miniGameTypeIndex, 1);
                    return;
                }
            }
        }

        function selectMiniGameType(miniGameType) {
            $scope.editingMiniGameType = miniGameType;
        }
    }
})();