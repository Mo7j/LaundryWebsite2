import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuzFFILWznvF3Zs4wYIknkbUn-NR5pq0U",
  authDomain: "tartib-laundry.firebaseapp.com",
  projectId: "tartib-laundry",
  storageBucket: "tartib-laundry.firebasestorage.app",
  messagingSenderId: "75762571645",
  appId: "1:75762571645:web:7e42d5a5a7ffa469519414"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
