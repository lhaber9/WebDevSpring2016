(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {

        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo", "userId": 123},
            {"_id": "020", "title": "CDs", "userId": 234},
        ];

        var api = {
            createFormForUser:createFormForUser,
            findAllFormsForUser:findAllFormsForUser,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById
        };

        return api;

        function createFormForUser(userId, form, callback) {
            form["_id"] = (new Date).getTime();
            form["userId"] = userId;
            forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback) {
            var foundForms = [];
            for (formIdx in forms) {
                var form = forms[formIdx];
                if (form["userId"] == userId) {
                    foundForms.push(form);
                }
            }

            callback(foundForms);
        }

        function deleteFormById(formId, callback) {
            for (formIdx in forms) {
                var form = forms[formIdx];
                if (form["_id"] == formId) {
                    forms.splice(formIdx, 1);
                    callback(forms);
                    return;
                }
            }
        }

        function updateFormById(formId, newForm, callback) {
            for (formIdx in forms) {
                var form = forms[formIdx];
                if (form["_id"] == formId) {
                    forms[formIdx] = newForm;
                    callback(newForm);
                    return;
                }
            }
        }
    }
})();