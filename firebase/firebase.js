// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";
import {
    getStorage,
    ref,
    uploadBytesResumable
} from "firebase/storage";


import {
    getAuth
} from "firebase/auth"
import {
    getFirestore
} from "firebase/firestore";



const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "chat-1bc25.firebaseapp.com",
    projectId: "chat-1bc25",
    storageBucket: "chat-1bc25.appspot.com",
    messagingSenderId: "168145660603",
    appId: "1:168145660603:web:a2e65c7bb09cb823ccd79e",
    measurementId: "G-B8F5NLZ5XY"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
//const analytics = getAnalytics(app);