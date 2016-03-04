(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormContoller);

    function FormContoller($scope, $rootScope, FormService) {

        $scope.updateForms = updateForms;
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        $scope.updateForms();

        $scope.selectedForm = null;
        $scope.newFormName = ""

        function updateForms() {
            FormService.findAllFormsForUser($rootScope.currentUser, function(forms){
                $scope.forms = forms;
            });
        }

        function addForm() {
            FormService.createFormForUser($rootScope.currentUser, {"title": $scope.newFormName}, function(form){
                $scope.newFormName = "";
                $scope.forms.push(form);
            });
        }

        function updateForm() {
            if ($scope.selectedForm) {
                $scope.selectedForm["title"] = $scope.newForm["title"];
                FormService.updateFormById($scope.selectedForm["_id"], $scope.selectedForm, function(form) {
                    $scope.selectedForm = null;
                });
            }
        }

        function deleteForm(form) {
            FormService.deleteFormById(form["_id"], function(forms) {
                $scope.updateForms();
            });
        }

        function selectForm(form) {
            $scope.selectedForm = form;
        }
    }
})();