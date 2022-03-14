import firebase from 'firebase/app'
import 'firebase/auth'
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyA3CoI0DR3kEUxLAhQyxAvsrqoKVv7-4FU",
    authDomain: "bidex-c1983.firebaseapp.com",
    projectId: "bidex-c1983",
    storageBucket: "bidex-c1983.appspot.com",
    messagingSenderId: "555830481055",
    appId: "1:555830481055:web:8bd4b1af7db3d043bcd2aa"
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