module.exports = function(mongoose) {
    var FormSchema = mongoose.Schema({
        userId: String,
        title: String,
        fields:[{type:mongoose.Schema.Types.Object, ref:'field'}],
        created: {type:Date, default:new Date()},
        updated: {type:Date, default:new Date()}
    }, {collection: "form"});

    return FormSchema;
}