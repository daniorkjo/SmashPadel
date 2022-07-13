import firebase from 'firebase'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBvALvORO_ErdWhML61nH7e3gJmRRCZXQE",
  authDomain: "smash-padel.firebaseapp.com",
  projectId: "smash-padel",
  storageBucket: "smash-padel.appspot.com",
  messagingSenderId: "478104729226",
  appId: "1:478104729226:web:17d945b799303a8ee61f73",
  measurementId: "G-PKBH7V2F4R"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  const auth = fire.auth();
  const store = fire.firestore();
  
  export {auth,store}
