(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, AdminService) {
        $scope.updateUsers = updateUsers;
        $scope.selectUser = selectUser;
        $scope.saveUser = saveUser;
        $scope.deleteUser = deleteUser;
        $scope.createUser = createUser;

        $scope.users = [];
        $scope.editingUser = {};

        $scope.updateUsers();

        function updateUsers() {
            AdminService.findAllUsers().then(function(response){
                var users = response.data;
                for(userIdx in users) {
                    var user = users[userIdx];
                    user.rolesString = user.roles.join(",");
                }
                $scope.users = users;
            });
        }

        function selectUser(user) {
            $scope.editingUser = user;
        }

        function deleteUser(user) {
            AdminService.deleteUser(user._id).then(function(response) {
                $scope.updateUsers();
            });
        }

        function createUser() {
            validateEditingUser();

            AdminService.createUser($scope.editingUser).then(function(response) {
                $scope.editingUser = {};
                $scope.updateUsers();
            });
        }

        function saveUser() {
            validateEditingUser();

            AdminService.updateUser($scope.editingUser._id, $scope.editingUser).then(function(response) {
                console.log(response);
                $scope.editingUser = {};
                $scope.updateUsers();
            });
        }

        function validateEditingUser() {
            if ($scope.editingUser.username == null || $scope.editingUser.password == null) {
                return
            }

            if ($scope.editingUser.rolesString == null || $scope.editingUser.rolesString == "") {
                $scope.editingUser.roles = [];
            }
            else if ($scope.editingUser.rolesString.indexOf(",") != -1) {
                $scope.editingUser.roles = $scope.editingUser.rolesString.split(",");
            }
            else {
                $scope.editingUser.roles = $scope.editingUser.rolesString.trim();
            }
        }
    }
})();