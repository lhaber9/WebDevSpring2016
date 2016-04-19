module.exports = function(mongoose) {
    var MiniGameSchema = mongoose.Schema({
        isActive: Boolean,
        name: String,
        match: {type:mongoose.Schema.Types.Object, ref:'match'},
        miniGameType: {type:mongoose.Schema.Types.Object, ref:'miniGameType'},
        winner: {type:mongoose.Schema.Types.Object, ref:'player'}
    }, {collection: "miniGame"});

    return MiniGameSchema;
}