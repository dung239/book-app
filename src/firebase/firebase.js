import {initializeApp} from '@firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {firebase} from '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCO54dhnfZBlV37J49lChSB4DTVprtZwLQ',
  authDomain: 'bookstore-633ef.firebaseapp.com',
  databaseURL: 'https://bookstore-633ef-default-rtdb.firebaseio.com',
  projectId: 'bookstore-633ef',
  storageBucket: 'bookstore-633ef.appspot.com',
  messagingSenderId: '78267232961',
  appId: '1:78267232961:web:74d9f28468e953668d9a40',
  measurementId: 'G-EYFP00FKM4',
};

const FIREBASE = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;
// export default FIREBASE;