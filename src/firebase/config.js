import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA96TNzmUuRv3Xi8pzsA8BRfmnzi7_85BU",
  authDomain: "twitter-clone-8003e.firebaseapp.com",
  projectId: "twitter-clone-8003e",
  storageBucket: "twitter-clone-8003e.appspot.com",
  messagingSenderId: "895842014493",
  appId: "1:895842014493:web:f8d990ce34c6fa56e63df4"
};

const app = initializeApp(firebaseConfig);

// auth referansı al
export const auth = getAuth(app)

// provider referansı al
export const provider = new GoogleAuthProvider();

// firebase referansı alma
export const db = getFirestore(app);

// storage referansı alma
export const storage = getStorage(app);