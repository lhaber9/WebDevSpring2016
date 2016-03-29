(function(){
    angular
        .module("ProjectApp")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            createUser:createUser,
            deleteUser:deleteUser,
            updateUser:updateUser,
            getUser:getUser,
            getAllUsers:getAllUsers,
            getUserWithCredentials:getUserWithCredentials
        };

        return api;

        function createUser(user) {
            return $http.post("/api/project/user", user);
        }

        function deleteUser(userId) {
            return $http.delete("/api/project/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/project/user/" + userId, user);
        }

        function getUser(userId) {
            return $http.get("/api/project/user/" + userId);
        }

        function getAllUsers() {
            return $http.get("/api/project/user");
        }

        function getUserWithCredentials(credentials) {
            return $http.get("/api/project/user?username=" + credentials.username + "&password=" + credentials.password);
        }
    }
})();