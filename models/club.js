const firebase = require('../config/database/config.js');
const database = firebase.database();
<<<<<<< Updated upstream
// const storageRef = firebase.storage().ref();

=======
const storage = firebase.storage();
const storageRef = firebase.storage().ref();
>>>>>>> Stashed changes

class Club {
  constructor(
    id,
    logo,
    name,
    stadium,
    coach,
    captain,
    score,
    numberMatch,
    win,
    draw,
    lost,
    description
  ) {
    this.id = id;
    this.logo = logo;
    this.name = name;
    this.stadium = stadium;
    this.coach = coach;
    this.captain = captain;
    this.score = score;

    this.numberMatch = numberMatch;
    this.win = win;
    this.draw = draw;
    this.lost = lost;
    this.description = description;

    //Khởi tạo club ban đầu với score = 1; win = 0; draw = 1; lost = 0
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
<<<<<<< Updated upstream
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
=======
  }

  async uploadImage(file) {
    const ref = firebase.storage().ref();

    const name = new Date() + '-' + file.filename;

    const metadata = {
      contentType: file.type
    }

    const task = ref.child(name).put(file, metadata);

    task.then((snapshot) => {
      snapshot.ref.getDownloadURL()
      
    }).then( url => {
      console.log(url)
      alert("Image Upload Success")
      
    })
  }

  async uploadLogo(uri) {
    var d = new Date();
    var urlImage;
    var ref = storageRef.child(d.getTime().toString() + ".png");
    console.log(ref);
    await ref.put(uri);
    // await ref.put(uri).then((snapshot) => {
    //   var temp = ref
    //     .getDownloadURL()
    //     .then((url) => {
    //       urlImage += url.toString();
    //     })
    //     .catch((error) => {});
    // });
>>>>>>> Stashed changes

    
    async setLogo(uri){
      const urlImage = await this.uploadLogo(uri);
      this.logo = urlImage;
      return await this.addClub(this);
    }
}

<<<<<<< Updated upstream
module.exports = new Club
=======
module.exports = new Club();
>>>>>>> Stashed changes
