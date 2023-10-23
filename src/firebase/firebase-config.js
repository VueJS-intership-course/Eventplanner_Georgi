import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const firebaseConfig = {
    apiKey: "AIzaSyAYetBgeQ49ejVw_Y0zCC9DyC3RKa7wxNc",
    authDomain: "eventsapp-1c1b0.firebaseapp.com",
    projectId: "eventsapp-1c1b0",
    storageBucket: "eventsapp-1c1b0.appspot.com",
    messagingSenderId: "711833953000",
    appId: "1:711833953000:web:4122e3620dfd92c2c05f5d",
    measurementId: "G-510L1VV43D"
};

firebase.initializeApp(firebaseConfig);

const fireStore = firebase.firestore();
const fireAuth = firebase.auth();


const firebaseData = {
    fireStore,
    fireAuth,
};

export default firebaseData;