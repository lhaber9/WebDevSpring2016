var q = require("q");

module.exports = function(mongoose) {
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model("UserModel", UserSchema);

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
        return UserModel.create(user);
    }

    function getAllUsers() {
        return UserModel.find();
    }

    function getUser(userId) {
        return UserModel.findById(userId);
    }

    function updateUser(userId, newUser) {
        delete newUser._id;
        return UserModel.update({_id:userId},{$set:newUser});
    }

    function deleteUser(userId) {
        return UserModel.remove({_id:userId});
    }

    function findUserByCredentials(credentials) {
        return UserModel.find({username:credentials.username, password:credentials.password});
    }

    function findUserByUsername(username) {
        return UserModel.find({username:credentials.username});
    }
}