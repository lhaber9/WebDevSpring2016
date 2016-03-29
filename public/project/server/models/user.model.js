var userData = require('./user.mock.json');
module.exports = function() {

    var api = {
        createUser: createUser,
        deleteUser: deleteUser,
        updateUser: updateUser,
        getUser: getUser,
        getAllUsers: getAllUsers,
        findUserByCredentials:findUserByCredentials,
        findUserByUsername: findUserByUsername
    };

    return api;

    function createUser(user) {
        userData.push(user);
        return user;
    }

    function getAllUsers() {
        return userData;
    }

    function getUser(userId) {
        var index = findUserIndexById(userId);
        if (index) {
            return userData[index];
        }

        return null;
    }

    function updateUser(userId, newUser) {
        var index = findUserIndexById(userId);
        if (index) {
            userData[index] = newUser;
            return newUser;
        }
        return null;
    }

    function deleteUser(userId) {
        var index = findUserIndexById(userId);
        if (index) {
            userData.splice(index, 1);
        }
        return userData;
    }

    function findUserByCredentials(credentials) {
        for (userIdx in userData) {
            var user = userData[userIdx];
            if (user["password"] == credentials.password && user["username"] == credentials.username) {
                return user;
            }
        }

        return null;
    }

    function findUserByUsername(username) {
        for (userIdx in userData) {
            var user = userData[userIdx];
            if (user["username"] == username) {
                return user;
            }
        }

        return null;
    }

    function findUserIndexById(userId) {
        for (userIdx in userData) {
            var user = userData[userIdx];
            if (user["id"] == userId) {
                return userIdx;
            }
        }

        return null;
    }
}