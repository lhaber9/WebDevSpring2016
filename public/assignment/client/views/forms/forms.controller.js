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
            FormService.findAllFormsForUser($rootScope.currentUser._id).then(function(response){
                var forms = response.data
                $scope.forms = forms;
            });
        }

        function addForm() {
            FormService.createFormForUser($rootScope.currentUser._id, {"title": $scope.newFormName}).then(function(response){
                var form = response.data;
                $scope.newFormName = "";
                $scope.forms.push(form);
            });
        }

        function updateForm() {
            if ($scope.selectedForm) {
                $scope.selectedForm["title"] = $scope.newFormName;
                FormService.updateFormById($scope.selectedForm["_id"], $scope.selectedForm).then(function(response) {
                    $scope.selectedForm = null;
                });
            }
        }

        function deleteForm(form) {
            FormService.deleteFormById(form["_id"]).then(function(response) {
                $scope.updateForms();
            });
        }

        function selectForm(form) {
            $scope.selectedForm = form;
        }
    }
})();