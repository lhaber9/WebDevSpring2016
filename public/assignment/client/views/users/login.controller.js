(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {
        $scope.loginUser = {
            "username": "",
            "password": ""
        };

        $scope.login = function() {
            UserService.login({username: $scope.loginUser.username, password: $scope.loginUser.password}).then(function(response) {
                if (response.data) {
                    $rootScope.currentUser = response.data;
                    $location.path("profile");
                }
            });
        }
    }
})();