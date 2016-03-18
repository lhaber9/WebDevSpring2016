(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, $rootScope, UserService) {
        $scope.user = $rootScope.currentUser;

        console.log($scope.user);

        $scope.update = function() {
            UserService.updateUser($scope.user["_id"], $scope.user).then(function(response) {
                if (response.data) {
                    $rootScope.currentUser = $scope.user;
                    $location.path("#/profile");
                }
            });
        }
    }
})();