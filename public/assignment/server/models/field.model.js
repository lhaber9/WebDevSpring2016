var q = require("q");

module.exports = function(mongoose) {
    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel = mongoose.model("FormFieldsModel", FormSchema);

    var api = {
        findAllForForm: findAllForForm,
        findByIdForForm: findByIdForForm,
        createForForm: createForForm,
        deleteByIdForForm: deleteByIdForForm,
        updateByIdForForm: updateByIdForForm,
        updateOrderForForm:updateOrderForForm
    };

    return api;

    function createForForm(formId, newField) {
        var deferred = q.defer();

        FormModel.findById(formId, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                form.fields.push(newField);
                form.save(function (err, form) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(newField);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function findAllForForm(formId) {
        var deferred = q.defer();

        FormModel.findById(formId, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form.fields);
            }
        });

        return deferred.promise;
    }

    function findByIdForForm(formId, fieldId) {
        var deferred = q.defer();

        FormModel.findById(formId, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                for (fieldIdx in form.fields) {
                    var field = form.fields[fieldIdx];
                    if (fieldId == field._id) {
                        deferred.resolve(field);
                    }
                }
                deferred.resolve(null);
            }
        });

        return deferred.promise;
    }

    function updateByIdForForm(formId, fieldId, newField) {
        var deferred = q.defer();

        FormModel.findById(formId, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                var found = false
                for (fieldIdx in form.fields) {
                    var field = form.fields[fieldIdx];
                    if (fieldId == field._id) {
                        found = true
                        form.fields.splice(fieldIdx, 1, newField);
                        form.save(function (err, form) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(newField);
                            }
                        });
                    }
                }
                if (!found) {
                    deferred.reject(err);
                }
            }
        });

        return deferred.promise;
    }

    function updateOrderForForm(formId, fieldIds) {
        var deferred = q.defer();

        FormModel.findById(formId, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                var newFields = []
                for (fieldIdIndex in fieldIds) {
                    var fieldId = fieldIds[fieldIdIndex];
                    var field = findByIdForForm(formId,fieldId);
                    if (field) {
                        newFields.push(field);
                    }
                }
                form.fields = newFields;
                deferred.resolve(fields);
            }
        });

        return deferred.promise;
    }

    function deleteByIdForForm(formId, fieldId) {
        var deferred = q.defer();

        FormModel.findById(formId, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                for (fieldIdx in form.fields) {
                    var field = form.fields[fieldIdx];
                    if (fieldId == field._id) {
                        form.fields.splice(fieldIdx, 1);
                        form.save(function (err, form) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(form);
                            }
                        });
                    }
                }
            }
        });

        return deferred.promise;
    }
}