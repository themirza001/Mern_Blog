// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-blog-48617.firebaseapp.com',
  projectId: 'mern-blog-48617',
  storageBucket: 'mern-blog-48617.appspot.com',
  messagingSenderId: '1223424485',
  appId: '1:1223424485:web:cf6fcbbddfddefb357170c',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
