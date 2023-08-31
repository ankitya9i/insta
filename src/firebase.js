// Import the functions you need from the SDKs you need

import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwzSXvj16aseQdeUobgIphtsazLZWwAGA",
  authDomain: "instagram-4a879.firebaseapp.com",
  projectId: "instagram-4a879",
  storageBucket: "instagram-4a879.appspot.com",
  messagingSenderId: "566218517755",
  appId: "1:566218517755:web:e78fc1692a8ceee848145e"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
 const auth = getAuth(app);
 const storage = getStorage(app);

export { db, auth,storage };