import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCf3KcHbjzUdo4XpgbeJch7qqa1EsVXkY8",
  authDomain: "fir-auth-42fb6.firebaseapp.com",
  projectId: "fir-auth-42fb6",
  storageBucket: "fir-auth-42fb6.appspot.com",
  messagingSenderId: "432743772858",
  appId: "1:432743772858:web:1e325508ebe2ecdfdf4883",
};
//Checking if firebase has been initialized

// const db = fir
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const db = firebase.firestore();
const auth = firebase.auth();

export default {
  firebase,
  db,
  auth,
};
