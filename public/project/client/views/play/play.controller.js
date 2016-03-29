(function(){
    angular
        .module("ProjectApp")
        .controller("PlayController", PlayController);

    function PlayController($scope, $rootScope, MatchService, PubNubService) {
        $scope.startMatch = startMatch;

        $scope.isAdmin = $rootScope.currentMatch.admin.id == $rootScope.currentUser.id;
        $scope.$rootScope = $rootScope;

        PubNubService.subscribe($rootScope.currentMatch.id, function(payload) {
            if (payload.message == "gameStarted") {
                MatchService.getMatch($rootScope.currentMatch.id).then(function(response){
                    if (response.data) {
                        $rootScope.currentMatch = response.data;
                    }
                });
            }
        });

        function startMatch(){
            MatchService.startMatch($rootScope.currentMatch.id).then(function(response){
                if (response.data) {
                    $rootScope.currentMatch = response.data;
                    PubNubService.publish("gameStarted", $rootScope.currentMatch.id);
                }
            });
        }
    }
})();