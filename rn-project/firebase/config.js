
// import "firebase/auth";
// import "firebase/compat/storage";
// import "firebase/compat/firestore";
import { getApps, getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDhoUROe7Xog0zj9sfc7BMwqhVN5C88lOw",
  authDomain: "rn-project-7c6d5.firebaseapp.com",
  projectId: "rn-project-7c6d5",
  storageBucket: "rn-project-7c6d5.appspot.com",
  messagingSenderId: "989181023296",
  appId: "1:989181023296:web:a0f51fa8934442be00bba5",
  measurementId: "G-TPQ0KZFSE7"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const authFirebase = getAuth(app);

export const storage = getStorage(app);
