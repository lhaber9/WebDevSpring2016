var q = require("q");

module.exports = function(mongoose) {
    var MatchSchema = require("./match.schema.server.js")(mongoose);
    var MatchModel = mongoose.model("MatchModel", MatchSchema);

    var api = {
        createMatch: createMatch,
        deleteMatch: deleteMatch,
        updateMatch: updateMatch,
        getMatch: getMatch,
        getAllMatches: getAllMatches,
        getAllActiveMatches: getAllActiveMatches,
        deactivateMatch: deactivateMatch,
        addUserToMatch:addUserToMatch,
        removeUserFromMatch:removeUserFromMatch,
        startMatch:startMatch,
        getAllActiveUnstartedMatches: getAllActiveUnstartedMatches,
        getAllMatchesForUser: getAllMatchesForUser
    };

    return api;

    function createMatch(match) {
        var deferred = q.defer();

        MatchModel.create(match, function (err, match) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(match);
            }
        });

        return deferred.promise;
    }

    function startMatch(matchId) {
        var deferred = q.defer();

        MatchModel.update({_id: matchId}, { $set: {isStarted: true} }, function (err, obj) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(obj);
            }
        });

        return deferred.promise;
    }

    function getAllMatches() {
        var deferred = q.defer();

        MatchModel.find(function (err, matches) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(matches);
            }
        });

        return deferred.promise;
    }

    function getAllActiveMatches() {
        var deferred = q.defer();

        MatchModel.find({isActive:true},function (err, matches) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(matches);
            }
        });

        return deferred.promise;
    }

    function getAllActiveUnstartedMatches() {
        var deferred = q.defer();

        MatchModel.find({isActive:true, isStarted:false},function (err, matches) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(matches);
            }
        });

        return deferred.promise;
    }

    function getMatch(matchId) {
        var deferred = q.defer();

        MatchModel.findById(matchId,function (err, match) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(match);
            }
        });

        return deferred.promise;
    }

    function updateMatch(matchId, newMatch) {
        var deferred = q.defer();

        MatchModel.update({_id: matchId}, {$set: newMatch}, function (err, obj) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(obj);
            }
        });

        return deferred.promise;
    }

    function deleteMatch(matchId) {
        var deferred = q.defer();

        MatchModel.remove({_id: matchId}, function (err, obj) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(obj);
            }
        });

        return deferred.promise;
    }

    function deactivateMatch() {
        var deferred = q.defer();

        MatchModel.update({_id: matchId}, { $set: {isActive: false} }, function (err, obj) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(obj);
            }
        });

        return deferred.promise;
    }

    function addUserToMatch(userId, matchId) {
        var deferred = q.defer();

        MatchModel.findById(matchId, function (err, match) {
            if (err) {
                deferred.reject(err);
            } else {
                if (match.players.indexOf(userId) == -1) {
                    MatchModel.update({_id: matchId}, { $push: {players: userId} }, function (err, obj) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(obj);
                        }
                    });
                }
            }
        });

        return deferred.promise;
    }

    function removeUserFromMatch(userId, matchId) {
        var deferred = q.defer();

        MatchModel.findById(matchId, function (err, match) {
            if (err) {
                deferred.reject(err);
            } else {
                if (match.players.indexOf(userId) != -1) {
                    match.players.splice(match.players.indexOf(userId), 1);
                    match.save(function(err, match){
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(match);
                        }
                    })
                }
            }
        });

        return deferred.promise;
    }

    function getAllMatchesForUser(userId) {
        return MatchModel.find({players: userId});
    }
}