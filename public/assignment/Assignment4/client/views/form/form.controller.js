(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, $rootScope, FormService) {
        var model = this;
        model.$location = $location;
        var currentUser = $rootScope.user;
        model.forms = [];

        model.getForms = getForms;
        if (currentUser != null) {
            getForms(currentUser._id);
        }

        model.addForm = addForm;
        model.selectForm = selectForm;
        model.updateForm = updateForm;
        model.deleteForm = deleteForm;

        model.saveFormId = function (form)
        {
            $rootScope.formId = form._id;
        };

        /* a.	Uses form model and FormService to create a new form
         * b.	Adds the new form to the array of forms*/
        function addForm(form) {
            if($rootScope.user != null && form != null) {
                FormService
                    .createFormForUser(currentUser._id, form)
                    .then(function(newForm) {
                        //model.forms.push(newForm);
                        getForms(currentUser._id);
                        console.log("form controller : ");
                        console.log(model.forms);
                    });
            }
        }

        /* a.	Uses the index to mark the currently selected form
         * b.	Updates the form with the currently selected form */
        function selectForm(form) {
            FormService
                .findFormById(form._id)
                .then(function(form) {
                    model.currentForm =form;
                    console.log("selected form");
                    console.log(model.currentForm);
                });
        }

        /* a.	Uses form model and FormService to update the currently selected form */
        function updateForm(form) {
            if(model.currentForm != null) {//selected
                console.log("start updating:");
                console.log(model.currentForm);
                FormService
                    .updateFormById(model.currentForm._id, model.currentForm)//userId, form
                    .then(function(updatedForm) {
                        FormService
                            .findAllFormsForUser(currentUser._id)
                            .then(function(forms) {
                                model.forms = forms;
                            });

                        console.log("updated form");
                    });
                model.currentForm = null;
            }
            getForms(currentUser._id);
        }

        /* a.	Uses the FormService to remove the form by index */
        function deleteForm(form) {
            var formId = form._id;
            FormService
                .deleteFormById(formId)
                .then(function(forms) {
                    getForms(currentUser._id);
                    console.log("deleted form");
                });
        }

        function getForms(userId){
            FormService
                .findAllFormsForUser(userId)
                .then(function(updateForms) {
                    model.forms = updateForms;
                    console.log("get forms :" + updateForms);
                });
        }
    }
})();