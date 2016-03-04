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
            UserService.findUserByCredentials($scope.loginUser.username, $scope.loginUser.password, function(user) {
                if (user) {
                    console.log("HERE");
                    $rootScope.currentUser = user;
                    $location.path("profile");
                }
            });
        }
    }
})();