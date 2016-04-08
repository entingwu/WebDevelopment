//var forms = require("./form.mock.json");
var Guid = require('guid');
var q = require("q");//load a promise library

module.exports = function(db, mongoose) {
    "use strict";
    // load form schema from form model
    var FormSchema = require("./form.schema.server.js")(mongoose);
    // create form from schema
    var FormModel = mongoose.model('FormModel', FormSchema);//Data Access Object

    var api = {
        //FORM
        createFormForUser : createFormForUser,
        findFormByTitle : findFormByTitle,
        findFormById : findFormById,
        findAllFormsForUser : findAllFormsForUser,
        findAllForms : findAllForms,
        updateFormById : updateFormById,
        deleteFormById : deleteFormById,

        //FIELD
        findAllFieldsForForm : findAllFieldsForForm,
        findFieldById : findFieldById,
        createFieldForForm : createFieldForForm,
        updateFieldById : updateFieldById,
        deleteFieldById : deleteFieldById
    };
    return api;

    /* I. FORM */

    function createFormForUser(userId, form) {
        var deferred = q.defer();
        FormModel.create(form, function(err, result) {
            if(err) {
                deferred.reject(err);
            }else {
                console.log("result form from model is: ");
                console.log(result);
                deferred.resolve(result);
            }
        });
        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();
        FormModel.findOne({title : title}, function(err, form) {
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
    }

    //findById is a method on the model that's provided by Mongoose to find a document by its _id.
    function findFormById(formId) {
        var deferred = q.defer();
        FormModel.findById(formId, function(err, form) {
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
    }

    function findAllFormsForUser(userId) {
        var deferred = q.defer();
        FormModel.find({userId : userId}, function(err, forms) {
            if(err) {
                deferred.reject(err);
            }else {
                console.log("find all forms from model: ");
                console.log(forms);
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
    }

    function findAllForms() {
        var deferred = q.defer();
        FormModel.find(function(err, forms) {
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
    }

    function updateFormById(formId, newForm) {
        var deferred = q.defer();
        FormModel.update(
            {_id : formId},
            {$set : newForm},
            function(err, form) {
                if(err) {
                    deferred.reject(err);
                }else {
                    console.log("update from model : ");
                    console.log(form);
                    deferred.resolve(form);
                }
        });
        return deferred.promise;
    }

    function deleteFormById(formId) {
        var deferred = q.defer();
        FormModel.remove(
            {_id : formId},
            function(err, forms) {
                if(err) {
                    deferred.reject(err);
                }else {
                    deferred.resolve(forms);
                }
            });
        return deferred.promise;
    }

    /* II. FIELD */

    function findAllFieldsForForm(formId) {
        var deferred = q.defer();
        FormModel.findById(formId, function(err, form) {//return form
            if(err) {
                deferred.reject(err);
            }else {
                var fields = form.fields;
                deferred.resolve(fields);
                console.log("found fields: " + fields);
                console.log(fields);
            }
        });
        return deferred.promise;
    }

    function findFieldById(formId, fieldId) {
        var deferred = q.defer();
        FormModel.findById(formId, function(err, form) {
            var fields = form.fields;
            for(var i = 0; i < fields.length; i++) {
                if(fields[i]._id == fieldId) {
                    deferred.resolve(fields[i]);
                }
            }
        });
        return deferred.promise;
    }

    function createFieldForForm(formId, field) {
        var deferred = q.defer();
        FormModel.findById(formId, function(err, form) {
            if(err) {
                deferred.reject(err);
            }else {
                var fields = form.fields;
                field._id = Guid.create();
                //field.label = field.type
                fields.push(field);
                form.save(function(err, form) {
                    if(err) {
                        deferred.reject(err);
                    }else {
                        deferred.resolve(field);
                        console.log("create field in form: " + field);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function updateFieldById(formId, fieldId, newField) {
        var deferred = q.defer();
        FormModel.findById(formId, function(err, form) {
            if(err) {
                deferred.reject(err);
            }else {
                var fields = form.fields;
                for(var i = 0; i < fields.length; i++) {
                    if(fields[i]._id == fieldId) {
                        fields[i] = newField;
                        deferred.resolve(fields[i]);
                    }
                }
            }
        });
        return deferred.promise;
    }

    function deleteFieldById(formId, fieldId) {
        var deferred = q.defer();
        FormModel.findById(formId, function(err, form) {
            if(err) {
                deferred.reject(err);
            }else {
                var fields = form.fields;
                for(var i = 0; i < fields.length; i++) {
                    if(fields[i]._id == fieldId) {
                        console.log("deleted field from form" + formId + ":" + fields[i]);
                        form.fields.splice(i, 1);
                        form.save(function(err, form) {
                            deferred.resolve(form.fields);
                        });
                    }
                }
            }
        });
        return deferred.promise;
    }

};
