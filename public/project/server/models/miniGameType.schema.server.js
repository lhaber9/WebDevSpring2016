module.exports = function(mongoose) {
    var MiniGameTypeSchema = mongoose.Schema({
        isActive: Boolean,
        name: String,
        maxPlayers: Number,
        description: String,
        gameLength: Number
    }, {collection: "miniGameType"});

    return MiniGameTypeSchema;
}