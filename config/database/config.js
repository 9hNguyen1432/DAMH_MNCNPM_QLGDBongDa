const firebase = require("firebase");
const firebaseConfig = {
    apiKey: "AIzaSyBfKiT4NExrUvguvOFcfZZovhW5wikRZLI",
    authDomain: "qlbd-234ef.firebaseapp.com",
    databaseURL: "https://qlbd-234ef-default-rtdb.firebaseio.com",
    projectId: "qlbd-234ef",
    storageBucket: "qlbd-234ef.appspot.com",
    messagingSenderId: "810535153989",
    appId: "1:810535153989:web:d0ab09a70b279f2724ce2c",
    measurementId: "G-NFLJVHPMYV"
  };

const app=firebase.initializeApp(firebaseConfig);


module.exports = firebase;