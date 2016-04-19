(function(){
    angular
        .module("ProjectApp")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/login.view.html",
                controller: "LoginController"
            })
            .when("/signup", {
                templateUrl: "views/user/signup.view.html",
                controller: "SignupController"
            })
            .when("/profile", {
                templateUrl: "views/user/profile.view.html",
                controller: "ProfileController",
                resolve: {
                    loggedin: checkCurrentUserAndMatch
                }
            })
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                resolve: {
                    loggedin: checkCurrentUserAndMatch
                }
            })
            .when("/create", {
                templateUrl: "views/create/create.view.html",
                controller: "CreateController",
                resolve: {
                    loggedin: checkCurrentUserAndMatch
                }
            })
            .when("/join", {
                templateUrl: "views/join/join.view.html",
                controller: "JoinController",
                resolve: {
                    loggedin: checkCurrentUserAndMatch
                }
            })
            .when("/scores", {
                templateUrl: "views/scores/scores.view.html",
                controller: "ScoresController",
                resolve: {
                    loggedin: checkCurrentUserAndMatch
                }
            })
            .when("/scoresList", {
                templateUrl: "views/scores/scoresList.view.html",
                controller: "ScoresListController",
                resolve: {
                    loggedin: checkCurrentUserAndMatch
                }
            })
            .when("/play", {
                templateUrl: "views/play/play.view.html",
                controller: "PlayController",
                resolve: {
                    loggedin: checkCurrentUserAndMatch
                }
            })
            .when("/match", {
                templateUrl: "views/match/match.view.html",
                controller: "MatchController"
            })
            .when("/miniGame", {
                templateUrl: "views/miniGame/miniGame.view.html",
                controller: "MiniGameController"
            })
            .when("/miniGameType", {
                templateUrl: "views/miniGameType/miniGameType.view.html",
                controller: "MiniGameTypeController"
            })
            .when("/user", {
                templateUrl: "views/user/user.view.html",
                controller: "UserController"
            })
            .otherwise({
                redirectTo: "/login"
            });
    }

    var checkCurrentUserAndMatch = function($q, $timeout, $http, $location, $rootScope, MatchService, MiniGameService) {
        var deferred = $q.defer();

        $http.get("/api/project/user/loggedIn").success(function(user)
        {
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                if ($rootScope.currentUser.currentMatchId != null) {
                    MatchService.getMatch($rootScope.currentUser.currentMatchId).then(function(response) {
                        if (response.data) {
                            $rootScope.currentMatch = response.data;
                            $rootScope.currentMiniGame = $rootScope.currentMatch.currentMiniGame;
                        }
                        deferred.resolve();
                    });
                }
                else {
                    deferred.resolve();
                }
            }
            else {
                $location.path("#/");
            }
        });

        return deferred.promise;
    }

})();