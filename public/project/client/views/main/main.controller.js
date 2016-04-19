(function(){
    angular
        .module("ProjectApp")
        .controller("MainController", MainController);

    function MainController($location, $scope, $rootScope, UserService, MatchService) {
        $scope.$location = $location;
        $scope.toggleMenu = toggleMenu;

        function toggleMenu() {
            $("#wrapper").toggleClass("toggled");
        }
        //UserService.isLoggedIn().then(function(response) {
        //    if (response.data == '0') {
        //        $location.path('#/');
        //    }
        //    else {
        //        $rootScope.currentUser = response.data;
        //        if ($rootScope.currentUser.currentMatchId != null) {
        //            MatchService.getMatch($rootScope.currentUser.currentMatchId).then(function(response) {
        //                if (response.data) {
        //                    console.log(response.data);
        //                    $rootScope.currentMatch = response.data;
        //                }
        //            });
        //        }
        //    }
        //});
    }
})();