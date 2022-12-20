const firebase = require('../config/database/config.js');
const database = firebase.database();
// const storageRef = firebase.storage().ref();


class Club
{
    constructor(id,logo,name, stadium, listPlayer,coach,captain,score = 0,numberMatch = 0,win = 0,draw = 0,lost = 0,description)
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
