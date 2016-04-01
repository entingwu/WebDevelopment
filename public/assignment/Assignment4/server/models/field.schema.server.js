module.exports = function(mongoose) {
    var FieldSchema = mongoose.Schema({
        _id: String,
        label: String,
        type: {
            type: String,
            default: 'TEXT',
            enum: ['TEXT','EMAIL','PASSWORD','OPTIONS','DATE','RADIOS','CHECKBOXES']
        },
        placeholder: String,
        options: {//object
            label: String,
            value: String
        }
    }, {collection: 'field'});
    return FieldSchema;
};