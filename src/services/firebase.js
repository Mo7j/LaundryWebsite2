import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGGpzjYibd6U7NudjbndfdJVDG1psdRTc",
  authDomain: "laundry-test-59e21.firebaseapp.com",
  projectId: "laundry-test-59e21",
  storageBucket: "laundry-test-59e21.firebasestorage.app",
  messagingSenderId: "986342969062",
  appId: "1:986342969062:web:fcfa99c0e15811a010b527"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
