(function() {
    angular
        .module("FormBuilderApp")
        .factory("AdminService", AdminService);

    function AdminService($http, $rootScope) {

        var api = {
            createUser: createUser,
            updateUser: updateUser,
            findAllUsers: findAllUsers,
            getById: getById,
            deleteUser: deleteUser
        };

        return api;

        function createUser(user) {
            return $http.post("/api/assignment/admin/user", user);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/admin/user/" + userId, user);
        }

        function findAllUsers(user) {
            return $http.get('/api/assignment/admin/user');
        }

        function getById(userId) {
            return $http.get("/api/assignment/admin/user/" + userId);
        }

        function deleteUser(userId) {
            return $http.delete("/api/assignment/admin/user/" + userId);
        }
    }

})();
