(function(){
    angular
        .module("ProjectApp")
        .controller("LoginController", LoginController);

    function LoginController($location, $scope, $rootScope, UserService) {
        $scope.login = login;

        $scope.credentials = {};

        function login() {
            UserService.login($scope.credentials).then(function(response) {
                if (response.data) {
                    console.log(response.data);
                    $rootScope.currentUser = response.data;
                    $location.path("home");
                }
            });
        }
    }
})();