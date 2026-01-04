import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4vbTipGkDkQgQEKXCgdfCDbuDqhnGkRk",
  authDomain: "my-bookshop-d6dca.firebaseapp.com",
  projectId: "my-bookshop-d6dca",
  storageBucket: "my-bookshop-d6dca.firebasestorage.app",
  messagingSenderId: "1057456178386",
  appId: "1:1057456178386:web:8fddd86e3815fe9d99190b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
