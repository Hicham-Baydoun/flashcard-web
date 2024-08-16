import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

let app, db;

if (typeof window !== "undefined") {
  const firebaseConfig = {
    apiKey: "AIzaSyD3UoNTSKADFL_E6hUVM-siJ0gqI9lAVjk",
    authDomain: "flashcard-120a4.firebaseapp.com",
    projectId: "flashcard-120a4",
    storageBucket: "flashcard-120a4.appspot.com",
    messagingSenderId: "1010762047979",
    appId: "1:1010762047979:web:512d0808679e88af8379ae",
    measurementId: "G-63JZEY6KLV"
  };

  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
}

export { db };