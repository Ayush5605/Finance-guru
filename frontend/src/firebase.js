import {initializeApp} from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";


const firebaseConfig={
     apiKey: "AIzaSyAyouA6M85QipURTK47lNdea_mSE1vyg70",
  authDomain: "finance-guru-254c8.firebaseapp.com",
  projectId: "finance-guru-254c8",
  storageBucket: "finance-guru-254c8.appspot.com",
  messagingSenderId: "800454059340",
  appId: "1:800454059340:web:3a52e36598284640565be9"
};


const app=initializeApp(firebaseConfig);

export const auth=getAuth(app);

export const googleProvider=new GoogleAuthProvider();