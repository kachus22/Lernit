import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/analytics';

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
  }

  createUser = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);
  login = (email, password) => this.auth.signInWithEmailAndPassword(email, password)
  logout = () => this.auth.signOut();
}