var q = require("q");

module.exports = function(mongoose) {
    var MiniGameSchema = require("./miniGame.schema.server.js")(mongoose);
    var MiniGameModel = mongoose.model("MiniGameModel", MiniGameSchema);

    var api = {
        createMiniGame: createMiniGame,
        deleteMiniGame: deleteMiniGame,
        updateMiniGame: updateMiniGame,
        getMiniGame: getMiniGame,
        getAllMiniGames: getAllMiniGames,
        deactivateMiniGame: deactivateMiniGame
    };

    return api;

    function createMiniGame(miniGame) {
        var deferred = q.defer();

        MiniGameModel.create(miniGame, function (err, miniGame) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(miniGame);
            }
        });

        return deferred.promise;
    }

    function getAllMiniGames() {
        var deferred = q.defer();

        MiniGameModel.find(function (err, miniGames) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(miniGames);
            }
        });

        return deferred.promise;
    }

    function getMiniGame(miniGameId) {
        var deferred = q.defer();

        MiniGameModel.findById(miniGameId, function (err, miniGames) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(miniGames);
            }
        });

        return deferred.promise;
    }

    function updateMiniGame(miniGameId, newMiniGame) {
        var deferred = q.defer();

        MiniGameModel.update({_id: miniGameId}, {$set: newMiniGame}, function (err, miniGame) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(miniGame);
            }
        });

        return deferred.promise;
    }

    function deleteMiniGame(miniGameId) {
        var deferred = q.defer();

        MiniGameModel.remove({_id: miniGameId}, function (err, obj) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(obj);
            }
        });

        return deferred.promise;
    }

    function deactivateMiniGame() {
        var deferred = q.defer();

        MiniGameModel.update({_id: miniGameId}, {$set: {isActive: false}}, function (err, miniGame) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(miniGame);
            }
        });

        return deferred.promise;
    }
}