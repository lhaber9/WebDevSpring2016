var miniGameData = require('./miniGame.mock.json');
module.exports = function() {

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
        miniGameData.push(miniGame);
        return miniGameData;
    }

    function getAllMiniGames() {
        return miniGameData;
    }

    function getMiniGame(miniGameId) {
        var index = findMiniGameIndexById(miniGameId);
        if (index) {
            return miniGameData[index];
        }

        return null;
    }

    function updateMiniGame(miniGameId, newMiniGame) {
        var index = findMiniGameIndexById(miniGameId);
        if (index) {
            miniGameData[index] = newMiniGame;
        }
        return miniGameData;
    }

    function deleteMiniGame(miniGameId) {
        var index = findMiniGameIndexById(miniGameId);
        if (index) {
            miniGameData.splice(index, 1);
        }
        return miniGameData;
    }

    function deactivateMiniGame() {
        var index = findMiniGameIndexById(miniGameId);
        if (index) {
            miniGameData[index].isActive = false;
        }
        return miniGameData;
    }

    function findMiniGameIndexById(miniGameId) {
        for (miniGameIdx in miniGameData) {
            var miniGame = miniGameData[miniGameIdx];
            if (miniGame["id"] == miniGameId) {
                return miniGameIdx;
            }
        }

        return null;
    }
}