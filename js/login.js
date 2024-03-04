import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC2wzob4G4hx0WZb4OgdXC_jsIG9gDrNwM",
  authDomain: "ufsj-894af.firebaseapp.com",
  projectId: "ufsj-894af",
  storageBucket: "ufsj-894af.appspot.com",
  messagingSenderId: "74536358217",
  appId: "1:74536358217:web:f4868d9a2f016147674a98"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

if (document.getElementById("botao-login")) {
    alert("digasduisag")
  document.getElementById("botao-login").addEventListener("click", (e) => {
    signInWithEmailAndPassword(
      auth,
      document.getElementById("email").value,
      document.getElementById("senha").value
    ).then(response => {
      

        window.location.href = "index.html";
      
    }).catch(error => {
      alert(error.message);
    });
  });
}

