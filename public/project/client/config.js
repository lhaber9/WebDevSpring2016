(function(){
    angular
        .module("ProjectApp")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/create", {
                templateUrl: "views/create/create.view.html",
                controller: "CreateController"
            })
            .when("/join", {
                templateUrl: "views/join/join.view.html",
                controller: "JoinController"
            })
            .when("/scores", {
                templateUrl: "views/scores/scores.view.html",
                controller: "ScoresController"
            })
            .when("/play", {
                templateUrl: "views/play/play.view.html",
                controller: "PlayController"
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
                redirectTo: "/home"
            });
    }
})();