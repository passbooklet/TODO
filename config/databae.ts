import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyCs-SViRbxsxpOtD83lkLra7OPVKEoqZQU",
    authDomain: "interntodo-4e14b.firebaseapp.com",
    projectId: "interntodo-4e14b",
    storageBucket: "interntodo-4e14b.appspot.com",
    messagingSenderId: "1041583679387",
    appId: "1:1041583679387:web:d3bb654abdeea129c2233e",
    measurementId: "G-8YV6473GLZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {db}