// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD9SHQr2lcBWuap7-5MAcvs3IVMgwoFPO4',
  authDomain: 'fir-rn-db326.firebaseapp.com',
  databaseURL: 'https://fir-rn-db326-default-rtdb.firebaseio.com',
  projectId: 'fir-rn-db326',
  storageBucket: 'fir-rn-db326.appspot.com',
  messagingSenderId: '780894462560',
  appId: '1:780894462560:web:7c134df88db98a609cd905',
  measurementId: 'G-XXKMM78497',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
