// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmH3aLX7GnVwhCNv7xdSaydHsR_LsW-QY",
  authDomain: "realtime-to-do-3ff30.firebaseapp.com",
  projectId: "realtime-to-do-3ff30",
  storageBucket: "realtime-to-do-3ff30.firebasestorage.app",
  messagingSenderId: "464334812293",
  appId: "1:464334812293:web:f03fb99eef1ca0bf41e5ec"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);