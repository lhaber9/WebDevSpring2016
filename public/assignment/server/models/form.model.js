var q = require("q");

module.exports = function(mongoose) {
    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel = mongoose.model("FormModel", FormSchema);
    var api = {
        findAll: findAll,
        findById: findById,
        create: create,
        deleteById: deleteById,
        updateById: updateById,
        findFormByTitle: findFormByTitle,
        findFormsByUserId: findFormsByUserId
    };

    return api;

    function create(form) {
        var deferred = q.defer();

        FormModel.create(form, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });

        return deferred.promise;
    }

    function findAll() {
        var deferred = q.defer();

        FormModel.find(function (err, forms) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(forms);
            }
        });

        return deferred.promise;
    }

    function findById(formId) {
        var deferred = q.defer();

        FormModel.findById(formId, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });

        return deferred.promise;
    }

    function updateById(formId, newForm) {
        var deferred = q.defer();

        FormModel.findById(formId, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                form.title = newForm.title
                form.save(function (err, form) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(form);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function deleteById(formId) {
        var deferred = q.defer();

        FormModel.remove({_id: formId}, function (err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();

        FormModel.findOne({title: title}, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });

        return deferred.promise;
    }

    function findFormsByUserId(userId) {
        var deferred = q.defer();

        FormModel.find({userId: userId}, function (err, forms) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(forms);
            }
        });

        return deferred.promise;
    }

}