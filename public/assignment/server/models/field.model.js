var fieldData = require('./field.mock.json');
module.exports = function() {

    var api = {
        findAllForForm: findAllForForm,
        findByIdForForm: findByIdForForm,
        createForForm: createForForm,
        deleteByIdForForm: deleteByIdForForm,
        updateByIdForForm: updateByIdForForm
    };

    return api;

    function createForForm(formId, newField) {
        newField.formId = formId;
        fieldData.push(newField);
        return newField;
    }

    function findAllForForm(formId) {
        var fields = []
        for (fieldIdx in fieldData) {
            var field = fieldData[fieldIdx];
            if (field.formId == formId) {
                fields.push(field);
            }
        }
        return fields;
    }

    function findByIdForForm(formId, fieldId) {
        for (fieldIdx in fieldData) {
            var field = fieldData[fieldIdx];
            if (field.formId == formId && fieldId == field._id) {
                return field
            }
        }
        return null;
    }

    function updateByIdForForm(formId, fieldId, newField) {
        for (fieldIdx in fieldData) {
            var field = fieldData[fieldIdx];
            if (field.formId == formId && fieldId == field._id) {
                fieldData[fieldIdx] = newField;
                return newField;
            }
        }
        return null;
    }

    function deleteByIdForForm(formId, fieldId) {
        for (fieldIdx in fieldData) {
            var field = fieldData[fieldIdx];
            if (field.formId == formId && fieldId == field._id) {
                fieldData.splice(fieldIdx, 1);
            }
        }
    }
}