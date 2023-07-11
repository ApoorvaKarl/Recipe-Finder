import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBSjU_baHOMwTsUPiQ0dIHpODPuPCEBkNI",
    authDomain: "form-data-59c37.firebaseapp.com",
    databaseURL: "https://form-data-59c37-default-rtdb.firebaseio.com",
    projectId: "form-data-59c37",
    storageBucket: "form-data-59c37.appspot.com",
    messagingSenderId: "374624703063",
    appId: "1:374624703063:web:4829512779b1db0babc912"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export default firebase;
