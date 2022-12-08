const firebase = require('../config/database/config.js');
const database = firebase.database();

class Club
{
    constructor(id,logo,name, stadium,coach,captain)
    {
        this.id =id;
        this.logo = logo;
        this.name=name
        this.stadium=stadium
        this.coach = coach;
        this.captain = captain;
    }

    async addClub(club){
        await this.setID();
        return await database.ref("clubs").child(club.id).set(club);
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
    
}

module.exports = new Club


// async function getData(){
//     // var club = new Club()
//     // club = await club.getClubByName("HAGL");
//     // console.log(club);

//     var club = new Club(" ","HAGL","Pleiku","Trinh"," ");
//     await club.setID();
//     club.addClub(club)

//  }
// getData()

module.exports = new Club