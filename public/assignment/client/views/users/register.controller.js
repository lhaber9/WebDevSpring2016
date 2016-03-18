(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService) {
        $scope.user = {
            "username": "",
            "password": "",
            "email": ""
        };

        $scope.register = function() {
            UserService.createUser($scope.user).then(function(response) {
                $rootScope.currentUser = response.data;
                $location.path("#/profile");
            });
        }
    }
})();