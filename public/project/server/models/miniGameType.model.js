var q = require("q");

module.exports = function(mongoose) {
    var MiniGameTypeSchema = require("./miniGameType.schema.server.js")(mongoose);
    var MiniGameTypeModel = mongoose.model("MiniGameTypeModel", MiniGameTypeSchema);

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
        var deferred = q.defer();

        MiniGameTypeModel.create(miniGameType, function (err, miniGameType) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(miniGameType);
            }
        });

        return deferred.promise;
    }

    function getAllMiniGameTypes() {
        var deferred = q.defer();

        MiniGameTypeModel.find(function (err, miniGameTypes) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(miniGameTypes);
            }
        });

        return deferred.promise;
    }

    function getMiniGameType(miniGameTypeId) {
        var deferred = q.defer();

        MiniGameTypeModel.findById(miniGameTypeId, function (err, miniGameType) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(miniGameType);
            }
        });

        return deferred.promise;
    }

    function updateMiniGameType(miniGameTypeId, newMiniGameType) {
        var deferred = q.defer();

        MiniGameTypeModel.update({_id: miniGameTypeId}, {$set: newMiniGameType}, function (err, miniGameType) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(miniGameType);
            }
        });

        return deferred.promise;
    }

    function deleteMiniGameType(miniGameTypeId) {
        var deferred = q.defer();

        MiniGameTypeModel.remove({_id: miniGameTypeId}, function (err, obj) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(obj);
            }
        });

        return deferred.promise;
    }

    function deactivateMiniGameType(miniGameTypeId) {
        var deferred = q.defer();

        MiniGameTypeModel.update({_id: miniGameTypeId}, {$set: {isActive: false}}, function (err, miniGameType) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(miniGameType);
            }
        });

        return deferred.promise;
    }
}