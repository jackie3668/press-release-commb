// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3lfSzfqlwhoqAWHZH15w64c7H2kr7v74",
  authDomain: "ooh-gpt.firebaseapp.com",
  databaseURL: "https://ooh-gpt-default-rtdb.firebaseio.com",
  projectId: "ooh-gpt",
  storageBucket: "ooh-gpt.appspot.com",
  messagingSenderId: "831291528861",
  appId: "1:831291528861:web:d1c7ef17f014233ae42674",
  measurementId: "G-5RG8GKP0V3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize storage

export { app, db, storage }; 