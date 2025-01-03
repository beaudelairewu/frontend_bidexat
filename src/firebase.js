import firebase from 'firebase/app'
import 'firebase/auth'
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  };

const app = firebase.initializeApp(firebaseConfig);


const firestore = app.firestore()

export const db = {
    firestore: firestore,
    getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp
}

export const storage=app.storage()
export const auth = app.auth()
export default app
