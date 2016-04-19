(function(){
    angular
        .module("ProjectApp")
        .controller("JoinController", JoinController);

    function JoinController($scope, $location, $rootScope, MatchService, UserService) {

        MatchService.getAllActiveUnstartedMatches().then(function(response) {
            console.log(response);
            if (response.data) {
                $scope.availableGames = response.data;
            }
        });

        $scope.chooseGame = function(game) {
            $rootScope.currentMatch = game;
            $rootScope.currentUser.currentMatchId = game._id;
            MatchService.addPlayerToMatch($rootScope.currentUser, game._id).then(function(response) {
                if (response.data) {
                    $rootScope.currentMatch = response.data;
                }
                UserService.updateUser($rootScope.currentUser._id, $rootScope.currentUser).then(function(response){
                    $location.path('play');
                });
            });
        }
    }
})();