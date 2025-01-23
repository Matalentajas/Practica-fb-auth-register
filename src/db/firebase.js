import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDHi-A7fe3D6dQIzEhPYSd1mVeEFWcgqj0",
  authDomain: "fir-auth-5b627.firebaseapp.com",
  projectId: "fir-auth-5b627",
  storageBucket: "fir-auth-5b627.firebasestorage.app",
  messagingSenderId: "187248487370",
  appId: "1:187248487370:web:fa317779136bd7eb0bbd33"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app) 
const db = getFirestore(app)
export { auth, db }