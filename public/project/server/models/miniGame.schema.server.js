module.exports = function(mongoose) {
    var MiniGameSchema = mongoose.Schema({
        isActive: Boolean,
        match: {type:mongoose.Schema.Types.Object, ref:'match'},
        miniGameType: {type:mongoose.Schema.Types.Object, ref:'miniGameType'},
        winner: {type:mongoose.Schema.Types.Object, ref:'user'},
        results: [{
            player:{type:mongoose.Schema.Types.Object, ref:'user'},
            time:Number
        }]
    }, {collection: "miniGame"});

    return MiniGameSchema;
}