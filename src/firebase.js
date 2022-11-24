// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4dk2tF7Tw7U0nFxMp0jNdbC6o8kKGy5Y",
  authDomain: "salon-app-dd380.firebaseapp.com",
  projectId: "salon-app-dd380",
  storageBucket: "salon-app-dd380.appspot.com",
  messagingSenderId: "1042614107989",
  appId: "1:1042614107989:web:cce5aa848585c0a5dff9dc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const messaging = getMessaging(app);


export { db,storage, auth, messaging};
