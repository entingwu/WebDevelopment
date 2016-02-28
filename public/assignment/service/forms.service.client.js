/**
 * Created by entingwu on 2/19/16.
 */
(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234}
        ];

        var service = {
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById
        };
        return service;

        function createFormForUser(userId, formname, callback) {
            var newForm = {
                _id : (new Date).getTime(),
                userId : userId,
                title : formname
            }
            forms.push(newForm);//4.	Adds new form to local array of forms
            callback(newForm);
            console.log("create forms");
            console.log(forms);
        }

        function findAllFormsForUser(userId, callback) {
            var formsFound = [];
            for(var i = 0; i < forms.length; i++) {
                if(forms[i].userId == userId) {
                    formsFound.push(forms[i]);
                }
            }
            callback(formsFound);
            console.log("find all forms");
            console.log(forms);
        }

        function deleteFormById(formId, callback) {
            for(var i = 0; i < forms.length; i++) {
                if(forms[i]._id == formId) {
                    //3.	If found, removes form from current array of forms
                    forms.splice(i, 1);
                }
            }
            callback(forms);
            console.log("delete form");
            console.log(forms);
        }

        function updateFormById(formId, newForm, callback) {
            var updatedForm;
            for(var i = 0; i < forms.length; i++) {
                if(forms[i]._id == formId) {
                    forms[i] = newForm;
                    updatedForm = forms[i];
                    console.log("found form id");
                    console.log(newForm);
                }
            }
            callback(updatedForm);
        }
    }
})();