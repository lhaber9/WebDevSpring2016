(function(){
    angular
        .module("ProjectApp")
        .controller("CreateController", CreateController);

    function CreateController($scope, $location, $rootScope, MatchService) {

        $scope.game = {
            "nameOfGame":"",
            "maximumPlayers": 0,
            "admin": $rootScope.currentUser,
        }

        $scope.createGame = createGame;

        function createGame() {
            MatchService.createMatch($scope.game).then(function(response) {
                if (response.data) {
                    $rootScope.currentMatch = response.data;
                    MatchService.addPlayerToMatch($rootScope.currentUser, response.data.id);
                }
            });
            $location.path('play')
        }
    }
})();