(function(){
    angular
        .module("ProjectApp")
        .controller("MainController", MainController);

    function MainController($location, $scope, $rootScope) {
        $scope.$location = $location;
        $rootScope.isAdmin = false;
    }
})();