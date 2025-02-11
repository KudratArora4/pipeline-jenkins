import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";

//firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZCu8Ntf1wnNT60WOWL_UUVYs7EsKb_yI",
  authDomain: "d-find-questions.firebaseapp.com",
  projectId: "d-find-questions",
  storageBucket: "d-find-questions.appspot.com",
  messagingSenderId: "981305235724",
  appId: "1:981305235724:web:697af22892f7d8d63d5129"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);