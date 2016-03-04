(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, $rootScope, UserService) {
        $scope.user = $rootScope.currentUser;

        console.log($scope.user);

        $scope.update = function() {
            UserService.updateUser($scope.user["_id"], $scope.user, function(user) {
                $rootScope.currentUser = user;
                $location.path("#/profile");
            });
        }
    }
})();