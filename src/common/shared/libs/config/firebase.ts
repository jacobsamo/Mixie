import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics, initializeAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

//TODO: turn this into an environment variable
// const firebaseConfig = {
//   apiKey: "AIzaSyCWd8dGb1ZMvKRqFiVfm8xI5ke4IFsnrnQ",
//   authDomain: "recipe-webapp-a2a71.firebaseapp.com",
//   databaseURL: "https://recipe-webapp-a2a71-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "recipe-webapp-a2a71",
//   storageBucket: "recipe-webapp-a2a71.appspot.com",
//   messagingSenderId: "764527990838",
//   appId: "1:764527990838:web:d507765a4a546369e8e097",
//   measurementId: "G-K5JTJY5HP2"
// };

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);

//TODO: Add analytics

export { db, auth };
