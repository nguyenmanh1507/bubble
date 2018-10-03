import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyDWZIxKJ8EHoNnlW1k-Vn4n1XKroyc5wos',
  authDomain: 'bubble-personal-financial.firebaseapp.com',
  databaseURL: 'https://bubble-personal-financial.firebaseio.com',
  projectId: 'bubble-personal-financial',
  storageBucket: 'bubble-personal-financial.appspot.com',
  messagingSenderId: '917570880337'
};
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});
