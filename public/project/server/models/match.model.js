var matchData = require('./match.mock.json');
module.exports = function() {

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
        startMatch:startMatch
    };

    return api;

    function createMatch(match) {
        matchData.push(match);
        return match;
    }

    function startMatch(matchId) {
        var index = findMatchIndexById(matchId);
        if (index) {
            matchData[index].isStarted = true;
            return matchData[index];
        }

        return null;
    }

    function getAllMatches() {
        return matchData;
    }

    function getAllActiveMatches() {
        var matches = [];

        console.log("HERE");
        console.log(matchData);

        for (matchIdx in matchData) {
            var match = matchData[matchIdx];
            if (match["isActive"] == true) {
                return matches.push(match);
            }
        }

        return matches;
    }

    function getMatch(matchId) {
        var index = findMatchIndexById(matchId);
        if (index) {
            return matchData[index];
        }

        return null;
    }

    function updateMatch(matchId, newMatch) {
        var index = findMatchIndexById(matchId);
        if (index) {
            matchData[index] = newMatch;
        }
        return matchData;
    }

    function deleteMatch(matchId) {
        var index = findMatchIndexById(matchId);
        if (index) {
            matchData.splice(index, 1);
        }
        return matchData;
    }

    function deactivateMatch() {
        var index = findMatchIndexById(matchId);
        if (index) {
            matchData[index].isActive = false;
        }
        return matchData;
    }

    function addUserToMatch(user, matchId) {
        var index = findMatchIndexById(matchId);
        if (index) {
            matchData[index].players.push(user);
        }
        return matchData;
    }

    function removeUserFromMatch(userId, matchId) {
        var index = findMatchIndexById(matchId);
        if (index) {
            for (userIdx in matchData[index].players) {
                var user = matchData[index].players[matchIdx];
                if (user["id"] == userId) {
                    matchData[index].players.splice(index, 1);
                }
            }
        }
        return matchData;
    }

    function findMatchIndexById(matchId) {
        for (matchIdx in matchData) {
            var match = matchData[matchIdx];
            if (match["id"] == matchId) {
                return matchIdx;
            }
        }

        return null;
    }
}