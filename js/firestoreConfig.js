import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDdyuI_oGs76cwhdBIUHsCEKYFsPX3z7UE",
    authDomain: "studentsproject-332008.firebaseapp.com",
    projectId: "studentsproject-332008",
    storageBucket: "studentsproject-332008.appspot.com",
    messagingSenderId: "120210360756",
    appId: "1:120210360756:web:206bdd8af4516179be4ae1",
    measurementId: "G-3JQRB2MM4R"
  };

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();

  
