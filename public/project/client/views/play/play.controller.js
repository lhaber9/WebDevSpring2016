(function(){
    angular
        .module("ProjectApp")
        .controller("PlayController", PlayController);

    function PlayController($scope, $rootScope) {
        $scope.isAdmin = $rootScope.isAdmin;
    }
})();