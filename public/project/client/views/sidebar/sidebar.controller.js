(function(){
    angular
        .module("ProjectApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $rootScope, $location) {
        $scope.showHome = showHome;
        $scope.showProfile = showProfile;
        $scope.showScoresList = showScoresList;
        $scope.clickLeave = clickLeave;
        $scope.clickEnd = clickEnd;

        function showHome() {
            return  $location.url() == '/home' ||
                    $location.url() == '/profile' ||
                    $location.url() == '/scoresList'
        }

        function showProfile() {
            return  $location.url() == '/home' ||
                    $location.url() == '/profile' ||
                    $location.url() == '/scoresList'
        }

        function showScoresList() {
            return  $location.url() == '/home' ||
                    $location.url() == '/profile' ||
                    $location.url() == '/scoresList'
        }

        function clickLeave() {
            $rootScope.$broadcast('tapLeaveMatch');
        }

        function clickEnd() {
            $rootScope.$broadcast('tapEndMatch');
        }
    }

})();