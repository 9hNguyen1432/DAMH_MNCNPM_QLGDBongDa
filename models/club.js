const firebase = require('../config/database/config.js');
const Player = require('../models/player')
const database = firebase.database();
// const storageRef = firebase.storage().ref();


class Club
{
    constructor(id,logo,name, stadium, listPlayer,coach,captain,totalGoal=0,goalDelta=0,score = 0,numberMatch = 0,win = 0,draw = 0,lost = 0,description="")
    {
        this.id =id;
        this.logo = logo;
        this.name=name
        this.stadium=stadium
        this.listPlayer = listPlayer
        this.coach = coach;
        this.captain = captain;
        this.score = score;
        this.numberMatch = numberMatch ;
        this.totalGoal = totalGoal;
        this.goalDelta = goalDelta;
        this.win = win;
        this.draw = draw;
        this.lost = lost;
        this.description = description;
        //Khởi tạo club ban đầu với score = 1; win = 0; draw = 1; lost = 0

    }

    async setID(){
      const id = await database.ref("clubs").push().key;
      return this.id = id;
    }
    setCaptain(captain){
      this.captain =captain;
    }
    async addClub(club){
      club.id = await this.setID();
      for (let player of club.listPlayer){
        let logo ="https://firebasestorage.googleapis.com/v0/b/qlbd-234ef.appspot.com/o/16716118829092784403.png?alt=media&token=b1324135-a031-4645-ad74-3136cb033627"
        var temp = new Player.constructor(player.idCauThu, logo, player.ten, player.DOB, club.name, player.number, player.type, player.description);
        await database.ref("players").child(temp.id).set(temp);
      } 

      return await database.ref("clubs").child(club.id).set(club);
  }

    async getClubByName(name){
      var club = null;
      await database.ref('clubs').once('value', (snapshot) => {
      var temp = snapshot.forEach((childSnapshot) => {
      if(childSnapshot.val().name.toString() == name){
           club = childSnapshot.val();
      }
      });
    });
    return club;
    }
    async getAllClub(){
        var club = [];
        await database.ref('clubs').once('value', (snapshot) => {
        var temp = snapshot.forEach((childSnapshot) => {
             club.push(childSnapshot.val());
        });
    });
        return club;
    }

    
    async setLogo(uri){
      const urlImage = await this.uploadLogo(uri);
      this.logo = urlImage;
      return await this.addClub(this);
    }
}

module.exports = new Club
