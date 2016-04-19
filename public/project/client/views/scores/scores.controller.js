(function(){
    angular
        .module("ProjectApp")
        .controller("ScoresController", ScoresController);

    function ScoresController($scope, $rootScope, $location, MiniGameService, UserService) {
        $scope.backToHome = backToHome;
        $scope.$rootScope = $rootScope;

        var playerIds = [];
        if ($rootScope.currentMatch.players) {
            playerIds = $rootScope.currentMatch.players;
        }

        $scope.scores = [];

        for (playerIdx in playerIds) {
            var playerId = playerIds[playerIdx];
            UserService.getUser(playerId).then(function(response) {
                if (response.data) {
                    MiniGameService.getAllMiniGamesWonForMatchAndPlayer($rootScope.currentMatch._id, response.data).then(function (response) {
                        if (response.data) {
                            $scope.scores.push({player: response.data.player, gamesWon: response.data.miniGames.length});
                        }
                    });
                }
            });
        }

        function backToHome() {
            $location.path('/home');
        }
    }
})();