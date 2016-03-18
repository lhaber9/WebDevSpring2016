(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $routeParams, FieldService) {

        $scope.formId = $routeParams.formId;
        $scope.editingField = null;

        $scope.fieldType;

        $("#sortableFields").sortable({ handle: '.handle' });

        function updateFields() {
            FieldService.getFieldsForForm($scope.formId).then(function(response) {
                $scope.fields = response.data;
            });
        }

        updateFields();

        function newFieldForType(fieldType) {

            switch(fieldType) {
                case "TEXT":
                    return {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    break;
                case "TEXTAREA":
                    return {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                    break;
                case "DATE":
                    return {"_id": null, "label": "New Date Field", "type": "DATE"};
                    break;
                case "OPTION":
                   return {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]};
                    break;
                case "CHECKBOXES":
                    return {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]}
                    break;
                case "RADIOS":
                    return {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]}
                    break;
                default:
                    return {};
                    break;
            }

        }

        $scope.saveEditingField = function() {
            if ($scope.editingField.optionDescription) {
                var newOptions = [];

                var options = $scope.editingField.optionDescription.split("\n");
                for (optionIdx in options) {
                    var option = options[optionIdx].split(":");
                    var label = option[0];
                    var value = option[1];
                    newOptions.push({"label":label,"value":value});
                }

                $scope.editingField.options = newOptions;
            }

            FieldService.updateField($scope.formId, $scope.editingField._id, $scope.editingField).then(function(response) {
                $scope.editingField = null;
                updateFields();
            });
        }

        $scope.setEditingField = function(field) {
            $scope.editingField = field;

            $scope.editingField.optionDescription = "";
            if ($scope.editingField.options) {
                for (optionIdx in $scope.editingField.options) {
                    var option = $scope.editingField.options[optionIdx];
                    $scope.editingField.optionDescription += option.label + ":" + option.value;
                    $scope.editingField.optionDescription += "\n";
                }
            }
        }

        $scope.addField = function(fieldType) {
            if (!fieldType) {
                return;
            }

            FieldService.createFieldForForm($scope.formId, newFieldForType(fieldType)).then(function(response) {
                updateFields();
            });
        }

        $scope.removeField = function(field) {
            FieldService.deleteFieldFromForm($scope.formId, field._id).then(function(response) {
                updateFields();
            });
        }
    }

})();