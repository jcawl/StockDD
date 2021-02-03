import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDiZC4Xtc0HzQMuokILhh9gATGDtKUo8d8",
    authDomain: "duediligence-56d71.firebaseapp.com",
    projectId: "duediligence-56d71",
    storageBucket: "duediligence-56d71.appspot.com",
    messagingSenderId: "595386909513",
    appId: "1:595386909513:web:dce9c367ea9ec45f8c1098",
    measurementId: "G-02XEENFCE6"
  };

var fire = firebase.initializeApp(firebaseConfig)

export default fire
