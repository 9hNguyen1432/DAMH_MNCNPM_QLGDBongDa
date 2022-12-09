const firebase = require('../config/database/config.js');
const database = firebase.database();

class Match {
    constructor(id, date, time, club_1, club_2, referee, stadium, status, goal_1, goal_2, timeRunning) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.club_1 = club_1;
        this.club_2 = club_2;
        this.referee = referee;
        this.stadium = stadium;
        this.status = status;
        this.goal_1 = goal_1;
        this.goal_2 = goal_2;
        this.timeRunning = timeRunning;

    }

    //dựa vào tên club => Lấy club => Tạo match => Add Match
    //

    async addMatch(match) {
        await this.setID();
        return await database.ref("matchs").child(club.id).set(club);
    }

    async setID() {
        const id = await database.ref("matchs").push().key;
        return this.id = id;
    }
    async getMatchByDate(date) {
        var match = [];
        await database.ref('matchs').once('value', (snapshot) => {
            var temp = snapshot.forEach((childSnapshot) => {
                if (childSnapshot.val().date.toString() == date) {
                    match.push(childSnapshot.val());
                }
            });
        });
        return match;
    }
    async getMatchByDateTime(date, time) {
        
        var match = [];
        await database.ref('matchs').once('value', (snapshot) => {
            var temp = snapshot.forEach((childSnapshot) => {
                if (childSnapshot.val().date.toString() == date && childSnapshot.val().time.toString() == time) {
                    match.push(childSnapshot.val());
                }
            });
        });
        return match;
    }

    async getAllDate(){
        
        var date =[];
        await database.ref('matchs').once('value', (snapshot) => {
            var temp = snapshot.forEach((childSnapshot) => {
                var dt = childSnapshot.val().date.toString();
                if (!date.includes(dt)) {
                    date.push(dt);
                }
            });
        });
        return date.sort((a,b)=>Date.parse(a)-Date.parse(b));
    }

    async getDateNotFinish(){ //lay cac ngay mà có trận đấu đang diễn ra hoặc chưa diễn ra
        let date_ob = new Date();
        let curdate = ("0" + date_ob.getDate()).slice(-2) + '/' + ("0" + (date_ob.getMonth() + 1)).slice(-2) + '/' + date_ob.getFullYear();
        var date =[];
        await database.ref('matchs').once('value', (snapshot) => {
            var temp = snapshot.forEach((childSnapshot) => {
                var dt = childSnapshot.val().date.toString();
                if (!date.includes(dt) && (childSnapshot.val().status !='isFinished'||dt ==curdate)) {
                    date.push(dt);
                }
            });
        });
        return date.sort((a,b)=>Date.parse(a)-Date.parse(b));
    }

    
    async getMatchisRunning(){
        var match = [];
        await database.ref('matchs').once('value', (snapshot) => {
            var temp = snapshot.forEach((childSnapshot) => {
                if (childSnapshot.val().status.toString() == "isRunning" ) {
                    match.push(childSnapshot.val());
                }
            });
        });
        return match;
    }
    async updateMatchIsRunning() {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2) + '/' + ("0" + (date_ob.getMonth() + 1)).slice(-2) + '/' + date_ob.getFullYear();
        await database.ref('matchs').once('value', (snapshot) => {
            var temp = snapshot.forEach((childSnapshot) => {
                var key = childSnapshot.key;
                
                // current date
                let hours = date_ob.getHours();
                let minutes = date_ob.getMinutes();
  
                var status = childSnapshot.val().status.toString();
                var time = childSnapshot.val().time.toString();
                var t = time.split(':');
  
                var t1 = eval(t[0]) * 60 + eval(t[1]);
                var t2 = eval(hours) * 60 + eval(minutes);
                if(date == childSnapshot.val().date.toString()){
                    if( t2- t1 >= 0 && t2 -t1 <= 90 ){
                        if(status == "notRun")
                            database.ref("matchs").child(key).child("status").set("isRunning");
                        database.ref("matchs").child(key).child("timeRunning").set((t2-t1).toString());
                    }else if (t2 -t1<100 && t2 -t1 > 90 && status == "isRunning"){
                        database.ref("matchs").child(key).child("timeRunning").set("90+");
                    }else if (t2 -t1 > 100 ){
                    database.ref("matchs").child(key).child("status").set("isFinished");
                    database.ref("matchs").child(key).child("timeRunning").set("FT");
                    }
                }
            });
        })
    }

}

module.exports = new Match;