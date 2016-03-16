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

        function createFormForUser(userId, form, callback) {
            var newForm = {
                _id : (new Date).getTime(),
                userId : userId,
                title : form.title
            };
            forms.push(newForm);//4.	Adds new form to local array of forms
            callback(newForm);
            //console.log("create forms");
            //console.log(forms);
        }

        function findAllFormsForUser(userId, callback) {
            var formsFound = [];
            for(var i = 0; i < forms.length; i++) {
                if(forms[i].userId == userId) {
                    formsFound.push(forms[i]);
                }
            }
            callback(formsFound);
            //console.log("find all forms");
        }

        function deleteFormById(formId, callback) {
            for(var i = 0; i < forms.length; i++) {
                if(forms[i]._id == formId) {
                    forms.splice(i, 1);//remove forms[i]
                }
            }
            callback(forms);
            //console.log("delete form");
        }

        function updateFormById(formId, newForm, callback) {
            for(var i = 0; i < forms.length; i++) {
                if(forms[i]._id == formId) {
                    forms[i] = newForm;
                    callback(forms[i]);
                    console.log("update form " + forms[i].title);
                    break;
                }
            }
        }
    }
})();