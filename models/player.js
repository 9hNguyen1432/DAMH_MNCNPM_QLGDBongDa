const firebase = require('../config/database/config.js');
const database = firebase.database();

class Player{
    constructor(id,avt,name,birthday,club,number,role){
        this.id =id;
        this.avt=avt;
        this.name =name;
        this.birthday =birthday;
        this.club =club;
        this.number =number; 
        this.role =role;
    }
    async addPlayer(player){
        await this.setID();
        return await database.ref("players").child(id).set(player);
    }
    async setID(){
        const id = await database.ref("players").push().key;
        return this.id = id;
    }

    async getAllPlayer(){
        var players = [];
      await database.ref('players').once('value', (snapshot) => {
      var temp = snapshot.forEach((childSnapshot) => {
        players.push(childSnapshot.val());
    });
        });
        return players;
    }
    async getPlayersOfClub(nameClub){
        var clubs =[];
        await database.ref('players').once('value', (snapshot) => {
            var temp = snapshot.forEach((childSnapshot) => {
              if(childSnapshot.val().club.toString()==nameClub){
                clubs.push(childSnapshot.val());
              }
          });
              });
              return clubs;
    }
}

module.exports = new Player