module.exports = function(app, formModel) {
    app.get('/api/assignment/user/:userId/form', getFormByUserId);//1. userId
    app.get('/api/assignment/form/:formId', getFormByFormId);//2. formId
    app.get('/api/assignment/form', getForms);//3. forms
    app.post('/api/assignment/user/:userId/form', createForm);//4. create
    app.put('/api/assignment/form/:formId', updateForm);//5. update
    app.delete('/api/assignment/form/:formId', deleteForm);//6. delete

    //1. userId
    function getFormByUserId(req, res) {
        var user_id = req.params.userId;
        var forms = formModel.findAllFormsForUser(user_id);
        res.json(forms);
    }

    //2. formId
    function getFormByFormId(req, res) {
        var form_id = req.params.formId;
        var form = formModel.findFormById(form_id);
        res.json(form);
    }

    //3. forms
    function getForms(req, res) {
        var forms = formModel.findAllForms();
        res.json(forms);
    }

    //4. createForm
    function createForm(req, res) {
        var user_id = req.params.userId;
        var form = req.body;
        var newForm = formModel.createFormForUser(user_id, form);
        res.json(newForm);
    }

    //5. updateForm
    function updateForm(req, res) {
        var form_id = req.params.formId;
        var form = req.body;
        var formUpdated = formModel.updateFormById(form_id, form);
        res.json(formUpdated);
    }

    //6. deleteForm
    function deleteForm(req, res) {
        var form_id = req.params.formId;
        var forms = formModel.deleteFormById(form_id);
        res.json(forms);
    }
};