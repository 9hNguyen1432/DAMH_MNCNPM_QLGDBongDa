const { score } = require("./club")
const firebase = require("../config/database/config.js");
const database = firebase.database();
const storageRef = firebase.storage().ref();
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
    async getDeadlineFromDataBase(){
        var dl = null;
        await database.ref('deadlineRegister').once('value', (snapshot) => {
           dl = snapshot.val();
        });
        return dl;
    }
    async addRule(rule){
       return await database.ref('rules').set(rule);
    }
    async getDayStart(){
        var date = null;
        await database.ref('dayStart').once('value', (snapshot) => {
           date = snapshot.val();
        });
        return date;
    }
    async setDayStart(date){
       return await database.ref('dayStart').set(date);
    }
    async setDeadline(dl){
        return await database.ref('deadlineRegister').set(dl);
     }



}

module.exports = new rules();