// import { messageLogIn } from '../models/handle/message.js';
// import { checkLog } from '../models/handle/handleAcc.js';

const firebase = require('../config/database/config.js');

const Account =
{
    logIn: async(email, password) =>{
    
        var user,errorCode;
        return temp = await firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            user = userCredential.user;
            var id = user.uid;
            return [true,id]
        })
        .catch((error) => {
            errorCode = error.code;
            return [false,errorCode]
        })

    },
    createACcount: async(email,password) => {
        return temp = await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
              var user = userCredential.user;
              var id = user.uid;
                return [true,id]
              
            })
            .catch((error) => {
              var errorCode = error.code;
              return [false,errorCode]
            });
    }

}
module.exports = Account