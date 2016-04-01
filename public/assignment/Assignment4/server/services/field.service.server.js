module.exports = function(app, formModel) {
    app.get('/api/assignment/form/:formId/field', getFieldByFormId);
    app.get('/api/assignment/form/:formId/field/:fieldId', getFieldByFieldId);
    app.post('/api/assignment/form/:formId/field', createField);
    app.put('/api/assignment/form/:formId/field/:fieldId', updateField);
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteField);

    //1. formId : returns an array of fields belonging to a form object
    function getFieldByFormId(req, res) {
        var formId = req.params.formId;
        var fields = formModel.findAllFieldsForForm(formId);
        res.json(fields);
    }

    //2. formId, fieldId
    function getFieldByFieldId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = formModel.findFieldById(formId, fieldId);
        res.json(field);
    }

    //3. createForm
    function createField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        var newField = formModel.createFieldForForm(formId, field);
        res.json(newField);
    }

    //4. updateForm
    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.parmars.fieldId;
        var newField = req.body;
        var updatedField = formModel.updateFieldById(formId, fieldId, newField);
        res.json(updatedField);
    }

    //5. deleteField
    function deleteField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = formModel.deleteFieldById(formId, fieldId);
        res.json(fields);
    }

};