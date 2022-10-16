import { initializeApp, getApps, getApp} from 'firebase/app'
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from "firebase/auth";
import { getFirestore, Timestamp, FieldValue } from 'firebase/firestore'
import { consumers } from 'stream';

const firebaseConfig = {
  apiKey: "AIzaSyCWd8dGb1ZMvKRqFiVfm8xI5ke4IFsnrnQ",
  authDomain: "recipe-webapp-a2a71.firebaseapp.com",
  databaseURL: "https://recipe-webapp-a2a71-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "recipe-webapp-a2a71",
  storageBucket: "recipe-webapp-a2a71.appspot.com",
  messagingSenderId: "764527990838",
  appId: "1:764527990838:web:d507765a4a546369e8e097",
  measurementId: "G-K5JTJY5HP2"
};



// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.FIREBASE_DATA_BASE_URL,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID
// };
const app = initializeApp(firebaseConfig);
if (typeof window !== "undefined") {
  const analytics = getAnalytics(app);
} else {
  const analytics = ''
}


const db = getFirestore(app);
const auth = getAuth(app);
    

export { db, auth };
