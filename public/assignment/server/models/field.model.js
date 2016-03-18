module.exports = function(formModel) {

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
        var form = formModel.findById(formId);
        newField.formId = form._id;
        form.fields.push(newField);
        formModel.updateById(form._id, form);
        return newField;
    }

    function findAllForForm(formId) {
        var form = formModel.findById(formId);
        return form.fields;
    }

    function findByIdForForm(formId, fieldId) {
        var form = formModel.findById(formId);
        for (fieldIdx in form.fields) {
            var field = form.fields[fieldIdx];
            if (fieldId == field._id) {
                return field
            }
        }
        return null;
    }

    function updateByIdForForm(formId, fieldId, newField) {
        var form = formModel.findById(formId);
        for (fieldIdx in form.fields) {
            var field = form.fields[fieldIdx];
            if (fieldId == field._id) {
                form.fields[fieldIdx] = newField;
                return newField;
            }
        }
        return null;
    }

    function updateOrderForForm(formId, fieldIds) {
        var newFields = []
        for (fieldIdIndex in fieldIds) {
            var fieldId = fieldIds[fieldIdIndex];
            var field = findByIdForForm(formId,fieldId);
            if (field) {
                newFields.push(field);
            }
        }

        var form = formModel.findById(formId);
        form.fields = newFields;
        return form.fields;
    }

    function deleteByIdForForm(formId, fieldId) {
        var form = formModel.findById(formId);
        for (fieldIdx in form.fields) {
            var field = form.fields[fieldIdx];
            if (fieldId == field._id) {
                form.fields.splice(fieldIdx, 1);
            }
        }
    }
}