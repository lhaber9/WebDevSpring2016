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
            login:login,
            isLoggedIn:isLoggedIn
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

        function login(credentials) {
            return $http.post("/api/project/user/login", credentials);
        }

        function isLoggedIn() {
            return $http.get("/api/project/user/loggedIn");
        }
    }
})();