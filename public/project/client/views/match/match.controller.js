(function(){
    angular
        .module("ProjectApp")
        .controller("MatchController", MatchController);

    function MatchController($scope) {

        $scope.addMatch = addMatch;
        $scope.updateMatch = updateMatch;
        $scope.deleteMatch = deleteMatch;
        $scope.selectMatch = selectMatch;

        $scope.matches = [];
        resetEditingMatch();

        function resetEditingMatch() {
            $scope.editingMatch = {
                "id":"",
                "isActive":false,
                "maxPlayers": 0,
                "matchAdmin":"",
                "players":0,
                "winner":""
            }
        }

        function addMatch() {
            $scope.matches.push($scope.editingMatch);
            resetEditingMatch();
        }

        function updateMatch() {
            for (matchIndex in $scope.matches) {
                var match = $scope.matches[matchIndex];
                if (match.id == $scope.editingMatch.id) {
                    $scope.matches[matchIndex] = $scope.editingMatch;
                    resetEditingMatch();
                    return;
                }
            }
        }

        function deleteMatch(deleteMatch) {
            for (matchIndex in $scope.matches) {
                var match = $scope.matches[matchIndex];
                if (match.id == deleteMatch.id) {
                    $scope.matches.splice(matchIndex, 1);
                    return;
                }
            }
        }

        function selectMatch(match) {
            $scope.editingMatch = match;
        }
    }
})();