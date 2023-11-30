import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyDri_9lQyCFlHcpKPYY3fF3-7DN-xCKfWw",
    authDomain: "reclancer-ef5a0.firebaseapp.com",
    projectId: "reclancer-ef5a0",
    storageBucket: "reclancer-ef5a0.appspot.com",
    messagingSenderId: "796856635239",
    appId: "1:796856635239:web:4cbf354242298e8d14e9c2",
    measurementId: "G-ZQE0JQCBTW"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

