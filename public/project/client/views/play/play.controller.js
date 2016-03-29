(function(){
    angular
        .module("ProjectApp")
        .controller("PlayController", PlayController);

    function PlayController($scope, $rootScope, MatchService) {
        $scope.startMatch = startMatch;

        $scope.isAdmin = $rootScope.currentMatch.admin.id == $rootScope.currentUser.id;
        $scope.$rootScope = $rootScope;

        function startMatch(){
            MatchService.startMatch($rootScope.currentMatch.id).then(function(response){
                if (response.data) {
                    $rootScope.currentMatch = response.data;
                }
            });
        }

    }
})();