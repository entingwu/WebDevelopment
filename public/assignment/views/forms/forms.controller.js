(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, $rootScope, FormService) {
        $scope.$location = $location;
        /**Using the FormService, get the current array of forms for the currently logged in user
         * and make them available for the view to render
         */
        var currentUser = $rootScope.user;
        $scope.forms = [];
        $scope.getForms = getForms;
        if ($rootScope.user != null) {
            getForms();
        }

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        /* Event Handlers Implementations */
        /* a.	Uses form model and FormService to create a new form
         * b.	Adds the new form to the array of forms*/
        function addForm() {
            //function createFormForUser(userId, form, callback)
            FormService.createFormForUser(currentUser._id, $scope.form, function(newform) {
                $scope.forms.push(newform);
                console.log("add form");
                //console.log($scope.forms);
            });
        }

        /* a.	Uses form model and FormService to update the currently selected form */
        function updateForm() {
            $scope.currentForm.title = $scope.form.title;
            console.log("start updating:" + $scope.currentForm.title);
            FormService.updateFormById($scope.currentForm._id, $scope.currentForm, function(form) {
                console.log("update form");
                console.log(form);
            });
            $scope.currentForm = null;
        }

        /* a.	Uses the FormService to remove the form by index */
        function deleteForm(index) {
            var formId = $scope.forms[index]._id;
            //function deleteFormById(formId, callback)
            FormService.deleteFormById(formId,function(forms){
                console.log("delete form");
                console.log($scope.forms);
                getForms();
            });
        }

        /* a.	Uses the index to mark the currently selected form
         * b.	Updates the form with the currently selected form */
        function selectForm(index) {
            document.getElementById('formtitle').value = $scope.forms[index].title;
            $scope.currentForm = $scope.forms[index];
            $scope.isSelected = true;
            console.log("current form is:");
            //console.log($scope.currentForm);
        }

        function getForms(){
            FormService.findAllFormsForUser(currentUser._id, function(updateForms){
                $scope.forms = updateForms;
            })
        }
    }
})();