module.exports = function(app, formModel) {
    app.get('/api/assignment/forms/:formId/field', getFieldByFormId);
    app.get('/api/assignment/forms/:formId/field/:fieldId', getFieldByFieldId);
    app.post('/api/assignment/forms/:formId/field', createField);
    app.put('/api/assignment/forms/:formId/field/:fieldId', updateField);
    app.delete('/api/assignment/forms/:formId/field/:fieldId', deleteField);

    //1. formId : returns an array of fields belonging to a forms object
    // findAllFieldsForForm(formId)
    function getFieldByFormId(req, res) {
        var formId = req.params.formId;
        formModel
            .findAllFieldsForForm(formId)
            .then(function(fields) {
                res.json(fields);
            });
    }

    //2. formId, fieldId : findFieldById(formId, fieldId)
    function getFieldByFieldId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel
            .findFieldById(formId, fieldId)
            .then(function(field) {
                res.json(field);
            });
    }

    //3. createForm : createFieldForForm(formId, field)
    function createField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        formModel
            .createFieldForForm(formId, field)
            .then(function(newField) {
                res.json(newField);
            });
    }

    //4. updateForm : updateFieldById(formId, fieldId, newField)
    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newField = req.body;
        formModel
            .updateFieldById(formId, fieldId, newField)
            .then(
                function(newField) {
                    res.json(newField);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    //5. deleteField : deleteFieldById(formId, fieldId)
    function deleteField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel
            .deleteFieldById(formId, fieldId)
            .then(function(fields) {
                res.json(fields);
            });
    }

};