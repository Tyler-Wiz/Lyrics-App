const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyDWP68vTiDzT-3xaapQSmZxMvoX6anzYmk",
  authDomain: "plug-26bab.firebaseapp.com",
  projectId: "plug-26bab",
  storageBucket: "plug-26bab.appspot.com",
  messagingSenderId: "454059640444",
  appId: "1:454059640444:web:a57bc5b35940cc03e5abf9",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const Songs = db.collection("Songs");
const Artist = db.collection("Img");
const Albums = db.collection("Albums");

module.exports = {
  Songs,
  Artist,
  Albums,
};
