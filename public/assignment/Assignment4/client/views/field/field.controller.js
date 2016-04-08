(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $rootScope, FieldService) {
        var model = this;
        model.fields = [];
        model.userId = $rootScope.userId;
        model.addField = addField;
        model.deleteField = deleteField;
        model.cloneField = cloneField;
        model.editField = editField;
        model.modalEdit = modalEdit;
        model.currentField = {};//selected

        function init() {
            var currentUser = $rootScope.user;
            model.formId = $rootScope.formId;

            FieldService
                .getFieldsForForm(model.formId)
                .then(function (fields) {
                    model.fields = fields;
                });
        }

        init();

        function addField(fieldType) {
            var field;
            switch (fieldType) {
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
                    field = {
                        "_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}
                        ]
                    };
                    break;
                case "CHECKBOX" :
                    field = {
                        "_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                            {"label": "Option A", "value": "OPTION_A"},
                            {"label": "Option B", "value": "OPTION_B"},
                            {"label": "Option C", "value": "OPTION_C"}
                        ]
                    };
                    break;
                case "RADIO" :
                    field = {
                        "_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                            {"label": "Option X", "value": "OPTION_X"},
                            {"label": "Option Y", "value": "OPTION_Y"},
                            {"label": "Option Z", "value": "OPTION_Z"}
                        ]
                    };
                    break;
                default :
                    return;
            }
            FieldService
                .createFieldForForm(model.formId, field)
                .then(init);
        }

        function deleteField(field) {
            FieldService
                .deleteFieldFromForm(model.formId, field._id)
                .then(init);
        }

        function cloneField(field) {
            FieldService
                .createFieldForForm(model.formId, field)
                .then(init);
        }

        /* options array -> optionString */
        function editField(index, field) {
            console.log(field);
            var hasOptions = false;
            if(!(field.type == "TEXT" || field.type =="TEXTAREA" || field.type == "EMAIL" || field.type == "DATE")) {
                hasOptions = true;
            }
            var fieldOptions = [];
            if(hasOptions) {
                for (var op in field.options) {
                    var str = field.options[op].label + " : " + field.options[op].value;
                    fieldOptions.push(str);
                }
            }
            field.optionString = fieldOptions.join("\n");
            model.currentField = field;
            console.log(field.optionString);
        }

        /* optionString -> options array*/
        function modalEdit() {
            var field = model.currentField;
            var hasOptions = false;
            if(!(field.type == "TEXT" || field.type =="TEXTAREA" || field.type == "EMAIL" || field.type == "DATE")) {
                hasOptions = true;
            }

            /*model.currentField = {
                _id : field.id,
                label : field.label,
                type : field.type,
                placeholder : field.placeholder,
                options : field.options,
                optionString : fieldOptions.join("\n")
            };*/

            var fieldOptions = [];
            if(hasOptions && field.optionString!=null) {
                var textArray = field.optionString.split("\n");
                for(var t in textArray) {
                    var textLine = field.optionString[t];
                    var optionArray = textLine.split(":");
                    var option = { label : optionArray[0], value : optionArray[1]};
                    fieldOptions.push(option);
                }
                field.options = fieldOptions;
            }

            FieldService
                .updateField(model.formId, field._id, field)
                .then(init);
        }
    }
})();