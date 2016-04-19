module.exports = function(mongoose) {
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        name: String,
        isAdmin: Boolean,
        currentMatchId: String
    }, {collection: "user"});

    return UserSchema;
}