import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/database'
import 'firebase/firestore'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

export default class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(config);
    } else {
      app.app();
    }
    app.analytics();
    this.auth = app.auth();
    this.database = app.database();
    this.firestore = app.firestore();
  }

  createUser = (email, password) => new Promise((res, rej) => {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(registeredUser => {
        // Using realtime database
        // this.database.ref('counters').child(registeredUser.user.uid).set({
        //     counter: 0,
        // }).then((doc) => {
        //     console.log(doc)
        // }).catch((error) => {
        //     console.log('error ', error)
        // })
        // Using firestorage
        this.firestore.collection('users').doc(registeredUser.user.uid)
          .set({
            counter: 0,
          }).then((doc) => {
            res(registeredUser);
          })
          .catch((docErr) => {
            console.log('error', docErr);
          });
      })
      .catch((err) => {
        console.log(err);
        rej(err);
      });
  });

  login = (email, password) => this.auth.signInWithEmailAndPassword(email, password)

  logout = () => this.auth.signOut();
  
  // Using realtime database
  // counterByUID = (uid) => this.database.ref('counters').child(uid)
  // Using firestorage
  counterByUID = (uid) => this.firestore.collection('users').doc(uid);
}