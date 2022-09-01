import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import firebase from 'firebase/compat/app'


const firebaseConfig = {
  apiKey: "AIzaSyDfbGY74LJRmGlEnBoU58j-_itT45upya4",
  authDomain: "react-auth-68654.firebaseapp.com",
  projectId: "react-auth-68654",
  storageBucket: "react-auth-68654.appspot.com",
  messagingSenderId: "62969952534",
  appId: "1:62969952534:web:312caeac7bb35a03edb837",
  measurementId: "G-JH6066HKY2"
};

const app = initializeApp(firebaseConfig);
export const db =getFirestore(app)
export const auth = getAuth();
export const storage = getStorage(app)
export const fs = firebase



