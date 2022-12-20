

var admin = require("firebase-admin");

var serviceAccount = require("../config/firebase-key.json");



const BUCKET = "qlbd-234ef.appspot.com"
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();

const uploadImage = (req) => {

    const reqFile = req.file
    const name = Date.now() + reqFile.originalname;

     file = bucket.file(name);

    const stream = file.createWriteStream({
        meta: { 
            contentType: reqFile.mimetype,
        },
    });
    stream.on('error',(e) =>{
        console.log(e);
    })


    stream.on("finish",async ()=>{
        await file.makePublic();

        req.file.firebaseUrl =   'https://storage.googleapis.com/' + BUCKET + '/'+ name
        //url = 'https://storage.googleapis.com/' + BUCKET + '/'+ name
        
    })


    stream.end(reqFile.buffer);

    return 'https://storage.googleapis.com/' + BUCKET + '/'+ name
}

module.exports = uploadImage