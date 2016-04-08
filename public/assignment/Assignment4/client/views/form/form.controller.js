(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($location, $rootScope, FormService) {
        var model = this;
        model.$location = $location;
        model.forms = [];

        /* findAllFormsForUser(userId) */
        function init() {
            model.currentUser = $rootScope.user;
            FormService
                .findAllFormsForUser(model.currentUser._id)
                .then(function(response) {
                    model.forms = response;
                });
        }
        init();

        model.addForm = addForm;
        model.selectForm = selectForm;
        model.updateForm = updateForm;
        model.deleteForm = deleteForm;

        model.saveFormId = function (form) {
            $rootScope.formId = form._id;
        };

        /* a.	Uses form model and FormService to create a new form
         * b.	Adds the new form to the array of forms*/
        function addForm(form) {
            if($rootScope.user != null && form != null) {
                form.userId = model.currentUser._id;
                form.fields = [];
                console.log(form);
                FormService
                    .createFormForUser(form.userId, form)
                    .then(init);
            }
        }

        /* a.	Uses the index to mark the currently selected form
         * b.	Updates the form with the currently selected form */
        function selectForm(form) {
            FormService
                .findFormById(form._id)
                .then(function(form) {
                    document.getElementById('formtitle').value = form.title;
                    model.currentForm = form;
                    console.log("selected form");
                });

        }

        /* a.	Uses form model and FormService to update the currently selected form */
        function updateForm(form) {
            if(model.currentForm != null) {//selected
                console.log("start updating:");
                console.log(form);
                FormService
                    .updateFormById(model.currentForm._id, form)//userId, form
                    .then(init);
            }
        }

        /* a.	Uses the FormService to remove the form by index */
        function deleteForm(form) {
            var formId = form._id;
            FormService
                .deleteFormById(formId)
                .then(init);
        }
    }
})();