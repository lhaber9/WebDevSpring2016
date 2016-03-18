var userData = require('./user.mock.json');
module.exports = function() {

    var api = {
        findAll: findAll,
        findById: findById,
        create: create,
        deleteById: deleteById,
        updateById: updateById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername
    };

    return api;

    function create(user) {
        userData.push(user);
        return userData;
    }

    function findAll() {
        return userData;
    }

    function findById(userId) {
        var index = findUserIndexById(userId);
        if (index) {
            return userData[index];
        }

        return null;
    }

    function updateById(userId, newUser) {
        var index = findUserIndexById(userId);
        if (index) {
            userData[index] = newUser;
        }
        return userData;
    }

    function deleteById(userId) {
        var index = findUserIndexById(userId);
        if (index) {
            userData.splice(index, 1);
        }
        return userData;
    }

    function findUserByCredentials(credentials) {
        for (userIdx in userData) {
            var user = userData[userIdx];
            if (user["username"] == credentials.username && user["password"] == credentials.password) {
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
            if (user["_id"] == userId) {
                return userIdx;
            }
        }

        return null;
    }
}