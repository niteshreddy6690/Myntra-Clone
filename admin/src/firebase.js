// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmp3TdEu_CtDMBZUAQxtsW0AoBU42j0H4",
  authDomain: "shopify-58aac.firebaseapp.com",
  projectId: "shopify-58aac",
  storageBucket: "shopify-58aac.appspot.com",
  messagingSenderId: "138755403911",
  appId: "1:138755403911:web:0a53b162cd689acb284822",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export default app;
