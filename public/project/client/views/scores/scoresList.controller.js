(function(){
    angular
        .module("ProjectApp")
        .controller("ScoresListController", ScoresListController);

    function ScoresListController($scope, $rootScope, $location, MatchService, MiniGameService, UserService) {

        $scope.selectMatch = selectMatch;

        MatchService.getAllForUser($rootScope.currentUser._id).then(function(response){
            if (response.data) {
                $scope.matches = response.data;
            }
        });

        function selectMatch(match) {
            buildScores(match);
        }

        function buildScores(match) {
            var playerIds = match.players;

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
        }
    }

})();