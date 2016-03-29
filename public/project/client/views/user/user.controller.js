(function(){
    angular
        .module("ProjectApp")
        .controller("UserController", UserController);

    function UserController($scope) {
        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;

        $scope.users = [];
        resetEditingUser();

        function resetEditingUser() {
            $scope.editingUser = {
                "id":"",
                "username":"",
                "password": ""
            }
        }

        function addUser() {
            $scope.users.push($scope.editingUser);
            resetEditingUser();
        }

        function updateUser() {
            for (userIndex in $scope.users) {
                var user = $scope.users[userIndex];
                if (user.id == $scope.editingUser.id) {
                    $scope.users[userIndex] = $scope.editingUser;
                    resetEditingUser();
                    return;
                }
            }
        }

        function deleteUser(deleteUser) {
            for (userIndex in $scope.users) {
                var user = $scope.users[userIndex];
                if (user.id == deleteUser.id) {
                    $scope.users.splice(userIndex, 1);
                    return;
                }
            }
        }

        function selectUser(user) {
            $scope.editingUser = user;
        }
    }
})();