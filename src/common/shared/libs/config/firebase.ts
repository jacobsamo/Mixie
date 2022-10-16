import admin from 'firebase-admin';



admin.initializeApp({
  credential: admin.credential.cert(require('./Meally_firebase_admin.json')),
  databaseURL: "https://recipe-webapp-a2a71-default-rtdb.asia-southeast1.firebasedatabase.app"
})





const db = admin.firestore()
const auth = admin.auth()
const analytics = admin.an
    

export { db, auth};
