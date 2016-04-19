(function(){
    angular
        .module("ProjectApp")
        .controller("CreateController", CreateController);

    function CreateController($scope, $location, $rootScope, MatchService, UserService) {

        $scope.game = {
            "name":"",
            "maxPlayers": 0,
            "matchAdmin": $rootScope.currentUser,
            "isStarted": false
        }

        $scope.createGame = createGame;

        function createGame() {
            MatchService.createMatch($scope.game).then(function(response) {
                if (response.data) {
                    $rootScope.currentMatch = response.data;
                    $rootScope.currentUser.currentMatchId = $rootScope.currentMatch._id;
                    MatchService.addPlayerToMatch($rootScope.currentUser, response.data._id).then(function(response) {
                        if (response.data) {
                            $rootScope.currentMatch = response.data;
                        }
                        $location.path('play');
                    });
                    UserService.updateUser($rootScope.currentUser._id, $rootScope.currentUser);
                }
            });
        }
    }
})();