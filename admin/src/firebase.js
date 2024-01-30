// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "shopify-58aac.firebaseapp.com",
  projectId: "shopify-58aac",
  storageBucket: "shopify-58aac.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASEMESSAGESENDERID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export default app;
