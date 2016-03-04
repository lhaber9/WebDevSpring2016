(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {

        var users = [
            {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]                },
            {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]                },
            {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]                },
            {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]                }
        ];

        var api = {
            findUserByCredentials: findUserByCredentials,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return api;

        function findUserByCredentials(username, password, callback) {
            for (userIdx in users) {
                var user = users[userIdx];
                if (user["username"] == username && user["password"] == password) {
                    callback(user);
                    return;
                }
            }

            callback(null);
        }

        function findUserIndexById(userId, callback) {
            for (userIdx in users) {
                var user = users[userIdx];
                if (user["_id"] == userId) {
                    callback(userIdx);
                    return;
                }
            }

            callback(null);
        }

        function findAllUsers(callback) {
            callBack(users);
        }

        function createUser(user, callback) {
            user["_id"] = (new Date).getTime();
            users.push(user);
            callback(user);
        }

        function deleteUserById(userId, callback) {
            findUserIndexById(userId, function(userIdx) {
                if (userIdx) {
                    users.splice(userIdx, 1);
                }
                callback(users);
            });
        }

        function updateUser(userId, user, callback) {
            findUserIndexById(userId, function(userIdx) {
                if (userIdx) {
                    users[userIdx] = user
                }
                callback(users[userIdx]);
            });
        }
    }
})();