module.exports = function(app, formModel) {
    app.get('/api/assignment5/user/:userId/forms', getFormByUserId);//1. userId
    app.get('/api/assignment5/forms/:formId', getFormByFormId);//2. formId
    app.get('/api/assignment5/forms', getForms);//3. forms
    app.post('/api/assignment5/user/:userId/forms', createForm);//4. create
    app.put('/api/assignment5/forms/:formId', updateForm);//5. update
    app.delete('/api/assignment5/forms/:formId', deleteForm);//6. delete

    //1. userId: findAllFormsForUser
    function getFormByUserId(req, res) {
        var user_id = req.params.userId;
        formModel
            .findAllFormsForUser(user_id)
            .then(
                function(forms) {
                    console.log("find forms for user in service.server : ");
                    console.log(forms);
                    res.json(forms);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    //2. formId: findFormById
    function getFormByFormId(req, res) {
        var form_id = req.params.formId;
        formModel
            .findFormById(form_id)
            .then(function(form) {
                res.json(form);
            });
    }

    //3. forms: findAllForms
    function getForms(req, res) {
        formModel
            .findAllForms()
            .then(function(forms) {
                res.json(forms);
            });
    }

    //4. createForm : createFormForUser(userId, forms)
    function createForm(req, res) {
        var user_id = req.params.userId;
        var form = req.body;
        console.log("server",form);
        console.log("server",user_id);
        formModel
            .createFormForUser(user_id, form)
            .then(
                function(form) {
                    console.log("create forms in service.server : ", form);
                    res.json(form);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    //5. updateForm : updateFormById(formId, newForm)
    function updateForm(req, res) {
        var form_id = req.params.formId;
        var form = req.body;
        formModel
            .updateFormById(form_id, form)
            .then(
                function(newForm) {
                    console.log("update forms in service.server : ");
                    console.log(newForm);
                    res.json(newForm);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    //6. deleteForm : deleteFormById(formId)
    function deleteForm(req, res) {
        var form_id = req.params.formId;
        formModel
            .deleteFormById(form_id)
            .then(function(forms) {
                res.json(forms);
            });
    }
};