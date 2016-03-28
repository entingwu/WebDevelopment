(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $rootScope, $routeParams, FieldService) {
        var model = this;
        model.addField = addField;
        model.deleteField = deleteField;
        model.editField = editField;
        model.createField = createField;
        model.getFields = getFields;

        function init() {
            var currentUser = $rootScope.user;
            model.fields = [];
            model.userId = $rootScope.userId;
            model.formId = $rootScope.formId;
            getFields(model.formId);
        }
        init();

        function addField(fieldType) {
            var field;
            switch(fieldType) {
                case "SINGLELINE" :
                    field = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    break;
                case "MULTILINE" :
                    field = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                    break;
                case "DATE" :
                    field = {"_id": null, "label": "New Date Field", "type": "DATE"};
                    break;
                case "DROPDOWN" :
                    field = {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                                {"label": "Option 1", "value": "OPTION_1"},
                                {"label": "Option 2", "value": "OPTION_2"},
                                {"label": "Option 3", "value": "OPTION_3"}
                    ]};
                    break;
                case "CHECKBOX" :
                    field = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                                {"label": "Option A", "value": "OPTION_A"},
                                {"label": "Option B", "value": "OPTION_B"},
                                {"label": "Option C", "value": "OPTION_C"}
                    ]};
                    break;
                case "RADIO" :
                    field = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                                {"label": "Option X", "value": "OPTION_X"},
                                {"label": "Option Y", "value": "OPTION_Y"},
                                {"label": "Option Z", "value": "OPTION_Z"}
                    ]};
                    break;
                default : return;
            }
            FieldService
                .createFieldForForm(model.formId, field)
                .then(function(field) {
                    if(model.fields == []) {
                        model.fields = [field];
                    }else {
                        model.fields.push(field);
                    }
                    console.log("added field");
                    console.log(model.fields);
                });
        }

        function deleteField(index, fieldId) {
            model.fields.splice(index, 1);
            FieldService
                .deleteFieldFromForm(model.formId, fieldId)
                .then(function(fields) {
                    console.log("delete");
                    console.log(fields);
                    getFields(model.formId);
                });
        }

        function editField(field) {
            $scope.field = field;
            var fieldOptions = [];
            for(var option in $scope.field.options) {
                var str = $scope.field.options[option].label + " : " + $scope.field.options[option].value + "\n";
                fieldOptions.push(str);
            }
            $scope.field.fieldOptions = fieldOptions;
        }

        function createField(field) {
            FieldService
                .createFieldForForm(model.formId, field)
                .then(function(newField) {
                    model.fields.push(newField);
                });
        }

        function getFields(formId) {
            FieldService
                .getFieldsForForm(formId)
                .then(function(fields) {
                    model.fields = fields;
                });
            console.log(model.fields);
        }

    }
})();