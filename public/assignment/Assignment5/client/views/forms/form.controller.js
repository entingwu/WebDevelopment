(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($location, $rootScope, FormService, UserService) {
        var model = this;
        model.$location = $location;
        model.forms = [];

        /* findAllFormsForUser(userId) */
        function init() {
            model.currentUser = $rootScope.user;
            UserService
                .getCurrentUser()
                .then(function(user) {
                    if(user) {
                        $rootScope.user = user;
                        FormService
                            .findAllFormsForUser(model.currentUser._id)
                            .then(function(response) {
                                model.forms = response;
                            });
                    }else {
                        $location.url("/login");
                    }
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

        /* a.	Uses forms model and FormService to create a new forms
         * b.	Adds the new forms to the array of forms*/
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

        /* a.	Uses the index to mark the currently selected forms
         * b.	Updates the forms with the currently selected forms */
        function selectForm(form) {
            FormService
                .findFormById(form._id)
                .then(function(form) {
                    document.getElementById('formtitle').value = form.title;
                    model.currentForm = form;
                    console.log("selected forms");
                });

        }

        /* a.	Uses forms model and FormService to update the currently selected forms */
        function updateForm(form) {
            if(model.currentForm != null) {//selected
                console.log("start updating:");
                console.log(form);
                FormService
                    .updateFormById(model.currentForm._id, form)//userId, forms
                    .then(init);
            }
        }

        /* a.	Uses the FormService to remove the forms by index */
        function deleteForm(form) {
            var formId = form._id;
            FormService
                .deleteFormById(formId)
                .then(init);
        }
    }
})();