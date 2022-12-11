const firebase = require('../config/database/config.js');
const database = firebase.database();
class User{
    constructor(id,email, fullname, birthdate, gender, role,author)
    {
        this.id =id;
        this.email=email
        this.fullname=fullname
        this.birthdate=birthdate
        this.gender=gender
        this.role=role
        this.author = author;
       
    }

    async addUser(user){
        return await database.ref('users').child(user.id).set(user);
    }
    
    async getUserByEmail(email){
        var user =null;
        await database.ref('users/').once('value', (snapshot) => {
           var temp= snapshot.forEach((childSnapshot) => {
            if(childSnapshot.val().email.toString()==email){
                 user = childSnapshot.val();
            }
            });
        });
    return user;
        
    }
    getAllUsers(){
        
    }
}

module.exports = new User