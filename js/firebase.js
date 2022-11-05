// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCZecI4zg7We3TKukIXYvglMVKkST5IOus",
    authDomain: "threedhousemap-new.firebaseapp.com",
    projectId: "threedhousemap-new",
    storageBucket: "threedhousemap-new.appspot.com",
    messagingSenderId: "419796651556",
    appId: "1:419796651556:web:7e0635ed2208eb8637d2b1",
    measurementId: "G-MKDS9SEZE9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// console.log(db);

export default { app, db }