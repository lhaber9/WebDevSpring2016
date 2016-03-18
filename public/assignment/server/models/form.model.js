var formData = require('./form.mock.json');
module.exports = function() {

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
        formData.push(form);
        return form;
    }

    function findAll() {
        return formData;
    }

    function findById(formId) {
        var index = findUserIndexById(formId);
        if (index) {
            return formData[index];
        }

        return null;
    }

    function updateById(formId, newForm) {
        var index = findFormIndexById(formId);
        if (index) {
            formData[index] = newForm;
        }
        return formData;
    }

    function deleteById(formId) {
        var index = findFormIndexById(formId);
        if (index) {
            formData.splice(index, 1);
        }
        return formData;
    }

    function findFormByTitle(title) {
        for (formIdx in formData) {
            var form = formData[formIdx];
            if (form["title"] == title) {
                return form;
            }
        }
        return null;
    }

    function findFormIndexById(formId) {
        for (formIdx in formData) {
            var form = formData[formIdx];
            if (form["_id"] == formId) {
                return formIdx;
            }
        }
        return null;
    }

    function findFormsByUserId(userId) {
        var userForms = [];
        for (formIdx in formData) {
            var form = formData[formIdx];
            if (form["userId"] == userId) {
                userForms.push(form);
            }
        }
        return userForms
    }

}