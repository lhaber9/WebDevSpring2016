(function(){
    angular
        .module("ProjectApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $location) {
        $scope.join = join;
        $scope.create = create;

        function join() {
            $location.path('join')
        }

        function create() {
            $location.path('create')
        }
    }
})();