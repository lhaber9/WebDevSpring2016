module.exports = function(mongoose) {
    var MiniGameSchema = mongoose.Schema({
        isActive: Boolean,
        matchId: String,
        miniGameType: {type:mongoose.Schema.Types.Object, ref:'miniGameType'},
        winnerId: String,
        results: [{
            player:{type:mongoose.Schema.Types.Object, ref:'user'},
            time:Number
        }]
    }, {collection: "miniGame"});

    return MiniGameSchema;
}