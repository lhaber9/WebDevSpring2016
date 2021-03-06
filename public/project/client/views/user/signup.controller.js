(function(){
    angular
        .module("ProjectApp")
        .controller("SignupController", SignupController);

    function SignupController($location, $scope, $rootScope, UserService) {
        $scope.signup = signup;

        $scope.user = {
            "username":"",
            "password":"",
            "name":""
        }

        function signup() {
            UserService.createUser($scope.user).then(function(response) {
                if (response.data) {
                    console.log(response.data);
                    $rootScope.currentUser = response.data;
                    $location.path("home");
                }
            });
        }
    }
})();