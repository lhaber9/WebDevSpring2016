(function(){
    angular
        .module("ProjectApp")
        .controller("MiniGameController", MiniGameController);

    function MiniGameController($scope) {
        $scope.addMiniGame = addMiniGame;
        $scope.updateMiniGame = updateMiniGame;
        $scope.deleteMiniGame = deleteMiniGame;
        $scope.selectMiniGame = selectMiniGame;

        $scope.miniGames = [];
        resetEditingMiniGame();

        function resetEditingMiniGame() {
            $scope.editingMiniGame = {
                "id":"",
                "isActive":false,
                "match": "",
                "miniGameType":"",
                "players":0
            }
        }

        function addMiniGame() {
            $scope.miniGames.push($scope.editingMiniGame);
            resetEditingMiniGame();
        }

        function updateMiniGame() {
            for (miniGameIndex in $scope.miniGames) {
                var miniGame = $scope.miniGames[miniGameIndex];
                if (miniGame.id == $scope.editingMiniGame.id) {
                    $scope.miniGames[miniGameIndex] = $scope.editingMiniGame;
                    resetEditingMiniGame();
                    return;
                }
            }
        }

        function deleteMiniGame(deleteMiniGame) {
            for (miniGameIndex in $scope.miniGames) {
                var miniGame = $scope.miniGames[miniGameIndex];
                if (miniGame.id == deleteMiniGame.id) {
                    $scope.miniGames.splice(miniGameIndex, 1);
                    return;
                }
            }
        }

        function selectMiniGame(miniGame) {
            $scope.editingMiniGame = miniGame;
        }
    }
})();