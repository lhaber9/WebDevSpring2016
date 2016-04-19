(function(){
    angular
        .module("ProjectApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $scope, $rootScope, UserService) {
        $scope.update = update;
        $scope.user = $rootScope.currentUser;

        console.log($scope.user);

        function update() {
            UserService.updateUser($rootScope.currentUser._id, $scope.user).then(function(response){
                if (response.data) {
                    $rootScope.currentUser = response.data;
                    $location.path("home");
                }
            });
        }
    }
})();