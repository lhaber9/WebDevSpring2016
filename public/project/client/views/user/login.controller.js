(function(){
    angular
        .module("ProjectApp")
        .controller("LoginController", LoginController);

    function LoginController($location, $scope, $rootScope, UserService) {
        $scope.login = login;

        $scope.credentials = {}

        function login() {
            UserService.getUserWithCredentials($scope.credentials).then(function(response) {
                console.log(response.data);
                if (response.data) {
                    $rootScope.currentUser = response.data;
                    $location.path("home");
                }
            });
        }
    }
})();