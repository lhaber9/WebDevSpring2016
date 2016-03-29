var miniGameTypeData = require('./miniGameType.mock.json');
module.exports = function() {

    var api = {
        createMiniGameType: createMiniGameType,
        deleteMiniGameType: deleteMiniGameType,
        updateMiniGameType: updateMiniGameType,
        getMiniGameType: getMiniGameType,
        getAllMiniGameTypes: getAllMiniGameTypes,
        deactivateMiniGameType:deactivateMiniGameType
    };

    return api;

    function createMiniGameType(miniGameType) {
        miniGameTypeData.push(miniGameType);
        return miniGameTypeData;
    }

    function getAllMiniGameTypes() {
        return miniGameTypeData;
    }

    function getMiniGameType(miniGameTypeId) {
        var index = findMiniGameTypeIndexById(miniGameTypeId);
        if (index) {
            return miniGameTypeData[index];
        }

        return null;
    }

    function updateMiniGameType(miniGameTypeId, newMiniGameType) {
        var index = findMiniGameTypeIndexById(miniGameTypeId);
        if (index) {
            miniGameTypeData[index] = newMiniGameType;
        }
        return miniGameTypeData;
    }

    function deleteMiniGameType(miniGameTypeId) {
        var index = findMiniGameTypeIndexById(miniGameTypeId);
        if (index) {
            miniGameTypeData.splice(index, 1);
        }
        return miniGameTypeData;
    }

    function deactivateMiniGameType() {
        var index = findMiniGameTypeIndexById(miniGameTypeId);
        if (index) {
            miniGameTypeData[index].isActive = false;
        }
        return miniGameTypeData;
    }

    function findMiniGameTypeIndexById(miniGameTypeId) {
        for (miniGameTypeIdx in miniGameTypeData) {
            var miniGameType = miniGameTypeData[miniGameTypeIdx];
            if (miniGameType["id"] == miniGameTypeId) {
                return miniGameTypeIdx;
            }
        }

        return null;
    }
}