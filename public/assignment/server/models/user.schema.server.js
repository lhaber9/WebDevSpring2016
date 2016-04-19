module.exports = function(mongoose) {
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String]
    }, {collection: "user"});

    var UserModel = mongoose.model("assignment.user", UserSchema);

    return UserSchema;
}