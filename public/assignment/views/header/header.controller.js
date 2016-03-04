(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderContoller);

    function HeaderContoller($scope, $rootScope, $location) {
        console.log($rootScope.currentUser);

        $scope.logout = function() {
            $rootScope.currentUser = null;
            $location("#/home");
        }
    }
})();