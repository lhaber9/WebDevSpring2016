module.exports = function(mongoose) {
    var MatchSchema = mongoose.Schema({
        isActive: Boolean,
        isStarted: Boolean,
        name: String,
        maxPlayers: Number,
        currentMiniGame: {type:mongoose.Schema.Types.Object, ref:'miniGame'},
        matchAdmin:{type:mongoose.Schema.Types.Object, ref:'user'},
        players:[String],
        winner: {type:mongoose.Schema.Types.Object, ref:'user'}
    }, {collection: "match"});

    return MatchSchema;
}