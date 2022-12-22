const firebase = require('../config/database/config.js');
const database = firebase.database();

class Player{
    constructor(id,avt,name,birthday,club,number,role,description){
        this.id =id;
        this.avt=avt;
        this.name =name;
        this.birthday =birthday;
        this.club =club;
        this.number =number; 
        this.role =role;
        this.description = description;
    }
    async addPlayer(player){
        await this.setID();
        return await database.ref("players").child(player.id).set(player);
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

    async searchPlayer(name){
        var players = []
        if(name == null){
            players = await this.getAllPlayer();
        }else{
            await database.ref('players').once('value', (snapshot) => {
                var temp = snapshot.forEach((childSnapshot) => {
                  if(childSnapshot.val().name.toString().toLowerCase().includes(name.toLowerCase())){
                    players.push(childSnapshot.val());
                  }
                    
            });
             });       
        }

        return players;
    }
    
    async getAllNamePlayers(){
        var names =[];
        await database.ref('players').once('value', (snapshot) => {
            var temp = snapshot.forEach((childSnapshot) => {
              if(!names.includes(childSnapshot.val().name.toString())){
                players.push(childSnapshot.val().name.toString());
              }
                
            });
        });  

        return names;
    }

    async getPlayerById(id){
        var player;
        await database.ref('players').once('value', (snapshot) => {
            var temp = snapshot.forEach((childSnapshot) => {
              if(childSnapshot.val().id.toString()== id){
                player = childSnapshot.val();
              }
                
             });
        });  

        return player;
    }

    async editPlayerById(player)
    {
      await database.ref('players').child(player.id).set(player)
    }

}

module.exports = new Player