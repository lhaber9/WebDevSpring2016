(function(){
    angular
        .module("ProjectApp")
        .controller("PlayController", PlayController);

    function PlayController($scope, $rootScope, $interval, MatchService, PubNubService) {
        $scope.startMatch = startMatch;

        $scope.isAdmin = $rootScope.currentMatch.matchAdmin._id == $rootScope.currentUser._id;
        $scope.$rootScope = $rootScope;

        console.log($rootScope.currentMatch.matchAdmin._id);
        console.log($rootScope.currentUser._id);

        $scope.countdownSeconds = null;
        $scope.countdownTimer = null;

        $scope.miniGameStartTime = null;

        PubNubService.subscribe($rootScope.currentMatch._id, function(payload) {
            if (payload.message == "gameStarted") {
                $scope.countdownSeconds = 5;
                $scope.countdownTimer = $interval(function() {
                    if ($scope.countdownSeconds == 0) {
                        $interval.cancel($scope.countdownTimer);
                        $scope.countdownTimer = null;
                        $scope.countdownSeconds = null;
                        $scope.miniGameStartTime = new Date().getTime();
                    }
                    $scope.countdownSeconds -= 1;
                }, 1000);

                MatchService.getMatch($rootScope.currentMatch._id).then(function(response){
                    if (response.data) {
                        $rootScope.currentMatch = response.data;
                    }
                });
            }
        });

        function startMatch(){
            MatchService.startMatch($rootScope.currentMatch._id).then(function(response){
                if (response.data) {
                    $rootScope.currentMatch = response.data;
                    PubNubService.publish("gameStarted", $rootScope.currentMatch._id);
                }
            });
        }
    }
})();