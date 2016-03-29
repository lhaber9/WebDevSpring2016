(function(){
    angular
        .module("ProjectApp")
        .controller("CreateController", CreateController);

    function CreateController($scope, $location, $rootScope) {

        $scope.game = {
            "nameOfGame":"",
            "maximumPlayers": 0
        }

        $scope.createGame = createGame;

        function createGame() {
            $rootScope.isAdmin = true;
            $location.path('play')
        }
    }
})();