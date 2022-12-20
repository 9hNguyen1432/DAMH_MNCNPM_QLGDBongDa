const firebase = require("../config/database/config.js");
const database = firebase.database();
class rules {
    constructor(minAge,
        maxAge,
        foreignerPlayer,
        minPlayer,
        maxPlayer,
        maxTimeGoal,
        typeOfGoal,
        score,
        priorityToRank) {
        this.minAge = minAge
        this.maxAge = maxAge
        this.foreignerPlayer = foreignerPlayer
        this.minPlayer = minPlayer
        this.maxPlayer = maxPlayer
        this.maxTimeGoal = maxTimeGoal
        this.typeOfGoal = typeOfGoal
        this.score = score
        this.priorityToRank = priorityToRank
    }

    async getRulesFromDataBase(){
        var rules = null;
        await database.ref('rules').once('value', (snapshot) => {
           rules = snapshot.val();
        });
        return rules;
    }

}

module.exports = new rules();