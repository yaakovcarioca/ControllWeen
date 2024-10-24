// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDyHoMrqMyToffOdOm0XAxn6wu6g7CRTTc",
  authDomain: "controllween-api.firebaseapp.com",
  projectId: "controllween-api",
  storageBucket: "controllween-api.appspot.com",
  messagingSenderId: "206952565752",
  appId: "1:206952565752:web:cf5df98f54b7999e17e40d"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const functions = getFunctions(app);

export { db, functions };
