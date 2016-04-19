(function(){
    angular
        .module("ProjectApp")
        .controller("PlayController", PlayController);

    function PlayController($scope, $rootScope, $interval, $location, MatchService, PubNubService, MiniGameService, UserService) {
        $scope.startMatch = startMatch;
        $scope.click = click;
        $scope.startMiniGame = startMiniGame;
        $scope.endMatch = endMatch;
        $scope.leaveGame = leaveGame;

        $scope.isAdmin = $rootScope.currentMatch.matchAdmin._id == $rootScope.currentUser._id;
        $scope.$rootScope = $rootScope;

        $scope.countdownSeconds = null;
        $scope.countdownTimer = null;

        $scope.miniGameStartTime = null;
        $scope.userFinished = false;

        $scope.currentPlayers = [$rootScope.currentUser];

        console.log($rootScope.currentMatch);

        PubNubService.subscribe($rootScope.currentMatch._id, function(payload) {
            console.log("NEW PUBNUB:");
            console.log(payload);
            if (payload.message.action == "gameStarted") {
                $scope.countdownSeconds = 5;
                $scope.countdownTimer = $interval(function() {
                    if ($scope.countdownSeconds == 0) {
                        $interval.cancel($scope.countdownTimer);
                        $scope.countdownTimer = null;
                        $scope.countdownSeconds = null;
                        $scope.miniGameStartTime = new Date().getTime();
                        $scope.userFinished = false;
                    }
                    $scope.countdownSeconds -= 1;
                }, 1000);

                $rootScope.currentMiniGame = payload.message.miniGame;

                MatchService.getMatch($rootScope.currentMatch._id).then(function(response){
                    if (response.data) {
                        $rootScope.currentMatch = response.data;
                    }
                });
            }
            else if (payload.message.action == "miniGameEnded") {
                $scope.miniGameStartTime = null;

                MatchService.getMatch($rootScope.currentMatch._id).then(function(response){
                    if (response.data) {
                        $rootScope.currentMatch = response.data;
                    }
                });

                MiniGameService.getMiniGame($rootScope.currentMiniGame._id).then(function(response){
                    if (response.data) {
                        $rootScope.currentMiniGame = response.data;
                    }
                });
            }
            else if (payload.message.action == "matchEnded") {
                $scope.miniGameStartTime = null;

                $rootScope.$apply(function() {
                    $location.path('/scores');
                    console.log($location.path());
                });
            }
            else if (payload.message.action == "joinedGame") {
                $scope.currentPlayers.push(payload.message.player);
                $scope.$apply();
            }
            else if (payload.message.action == "leftGame") {
                for (playerIdx in $scope.currentPlayers) {
                    var player = $scope.currentPlayers[playerIdx];
                    if (player._id == payload.message.player._id) {
                        $scope.currentPlayers.splice(playerIdx,1);
                        $scope.$apply();
                    }
                }
            }
        });

        function startMatch(){
            MatchService.startMatch($rootScope.currentMatch._id).then(function(response){
                if (response.data) {
                    $rootScope.currentMatch = response.data;

                   $scope.startMiniGame()
                }
            });
        }

        function startMiniGame() {
            var miniGame = {matchId: $rootScope.currentMatch._id};
            MiniGameService.createMiniGame(miniGame).then(function(response){
                console.log(response.data);
                if (response.data) {

                    $rootScope.currentMiniGame = response.data;
                    $rootScope.currentMatch.currentMiniGame = $rootScope.currentMiniGame;
                    MatchService.updateMatch($rootScope.currentMatch._id, $rootScope.currentMatch);

                    PubNubService.publish({action:"gameStarted",miniGame:$rootScope.currentMiniGame}, $rootScope.currentMatch._id);
                }
            });
        }

        function click() {
            MiniGameService.addResult($rootScope.currentMiniGame._id, $rootScope.currentUser, new Date().getTime() - $scope.miniGameStartTime).then(function(response){
                if (response.data) {
                    $rootScope.currentMiniGame = response.data;
                    $scope.userFinished = true;
                    if ($rootScope.currentMiniGame.results.length == $scope.currentMatch.players.length) {
                        MiniGameService.finishMiniGame($rootScope.currentMiniGame._id, $rootScope.currentMiniGame.results[0].player._id);
                        PubNubService.publish({action:"miniGameEnded"}, $rootScope.currentMatch._id);
                    }
                }
            });
        }

        function endMatch() {
            PubNubService.publish({action:"matchEnded"}, $rootScope.currentMatch._id);
        }

        function leaveGame() {
            MatchService.removePlayerFromMatch($rootScope.currentUser, $rootScope.currentMatch._id).then(function(response) {
                $rootScope.currentUser.currentMatchId = null;
                UserService.updateUser($rootScope.currentUser._id, $rootScope.currentUser).then(function(response){
                    $location.path('join');
                    PubNubService.publish({action:"leftGame", player: $rootScope.currentUser}, $rootScope.currentMatch._id);
                    $rootScope.currentMatch = null;
                });
            });
        }
    }
})();