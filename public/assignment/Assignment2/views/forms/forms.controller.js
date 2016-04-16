(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, $rootScope, FormService) {
        $scope.$location = $location;
        /**Using the FormService, get the current array of forms for the currently logged in users
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
        /* a.	Uses forms model and FormService to create a new forms
         * b.	Adds the new forms to the array of forms*/
        function addForm() {
            //function createFormForUser(userId, forms, callback)
            FormService.createFormForUser(currentUser._id, $scope.form, function(newform) {
                $scope.forms.push(newform);
                console.log("add forms");
                //console.log($scope.forms);
            });
        }

        /* a.	Uses forms model and FormService to update the currently selected forms */
        function updateForm() {
            $scope.currentForm.title = $scope.form.title;
            console.log("start updating:" + $scope.currentForm.title);
            FormService.updateFormById($scope.currentForm._id, $scope.currentForm, function(form) {
                console.log("update forms");
                console.log(form);
            });
            $scope.currentForm = null;
        }

        /* a.	Uses the FormService to remove the forms by index */
        function deleteForm(index) {
            var formId = $scope.forms[index]._id;
            //function deleteFormById(formId, callback)
            FormService.deleteFormById(formId,function(forms){
                console.log("delete forms");
                console.log($scope.forms);
                getForms();
            });
        }

        /* a.	Uses the index to mark the currently selected forms
         * b.	Updates the forms with the currently selected forms */
        function selectForm(index) {
            document.getElementById('formtitle').value = $scope.forms[index].title;
            $scope.currentForm = $scope.forms[index];
            $scope.isSelected = true;
            console.log("current forms is:");
            //console.log($scope.currentForm);
        }

        function getForms(){
            FormService.findAllFormsForUser(currentUser._id, function(updateForms){
                $scope.forms = updateForms;
            })
        }
    }
})();