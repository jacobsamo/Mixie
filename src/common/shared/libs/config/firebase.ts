import { initializeApp, getApps, getApp} from 'firebase/app'
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from "firebase/auth";
import { getFirestore, Timestamp, FieldValue } from 'firebase/firestore'



const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATA_BASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// Initialize Firebase\
// let analytics = undefined;
// if (typeof window !== 'undefined') {
//   let analytics = getAnalytics(app);
// }

const db = getFirestore(app);
const auth = getAuth(app);
    

export { db, auth};
