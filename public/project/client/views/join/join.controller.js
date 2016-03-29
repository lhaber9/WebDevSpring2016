(function(){
    angular
        .module("ProjectApp")
        .controller("JoinController", JoinController);

    function JoinController($scope, $location, $rootScope, MatchService) {

        MatchService.getAllActiveMatches().then(function(response) {
            console.log(response);
            if (response.data) {
                $scope.availableGames = response.data;
            }
        });

        //    [
        //    {"name":"Game 1", "numPlayers":5, "admin": {"name": "Paul"}},
        //    {"name":"Game 2", "numPlayers":2, "admin": {"name": "John"}},
        //    {"name":"Game 3", "numPlayers":6, "admin": {"name": "Bobby"}},
        //    {"name":"Game 4", "numPlayers":4, "admin": {"name": "Crazy Pants"}},
        //    {"name":"Game 5", "numPlayers":1, "admin": {"name": "Luke"}}
        //]

        $scope.chooseGame = function(game) {
            $rootScope.currentMatch = game;
            $location.path('play')
        }
    }
})();