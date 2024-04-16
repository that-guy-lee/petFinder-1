// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCwfgp_OQ1oYFY8S9XtVJfVmVGQ-RHSGXI",
  authDomain: "pet-finder-76ee7.firebaseapp.com",
  projectId: "pet-finder-76ee7",
  storageBucket: "pet-finder-76ee7.appspot.com",
  messagingSenderId: "14563185582",
  appId: "1:14563185582:web:7137b7eeb24ab8d9696e3f",
  measurementId: "G-28FQTMYCX6",
  storageBucket: 'gs://pet-finder-76ee7.appspot.com/'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
