module.exports = function(mongoose) {
    var FieldSchema = mongoose.Schema({
        _id: String,
        label: String,
        type: {
            type: String,
            default: 'TEXT',
            enum: ['TEXT','EMAIL','TEXTAREA','OPTIONS','DATE','RADIOS','CHECKBOXES']
        },
        placeholder: String,
        options: [{label: String, value: String}],
        optionString: String
    }, {collection: 'assignment5.field'});
    return FieldSchema;
};

