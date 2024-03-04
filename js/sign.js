import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Inicialize o aplicativo Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC2wzob4G4hx0WZb4OgdXC_jsIG9gDrNwM",
    authDomain: "ufsj-894af.firebaseapp.com",
    projectId: "ufsj-894af",
    storageBucket: "ufsj-894af.appspot.com",
    messagingSenderId: "74536358217",
    appId: "1:74536358217:web:f4868d9a2f016147674a98"
  };
const firebaseApp = initializeApp(firebaseConfig);

// Obtenha a instância de autenticação
const auth = getAuth(firebaseApp);

if (document.getElementById("btn-login")){
    alert("dsaugdiusahg")
document.getElementById("btn-login").addEventListener("click", function () { 
alert("udagsdiusga")
    var email = document.getElementById("email-sign").value;
    var senha1 = document.getElementById("senha1").value;
    var senha2 = document.getElementById("senha2").value;

    if (senha1 !== senha2) {
        alert("As senhas não coincidem");
        setTimeout(function () {
            location.reload(true);
        }, 100);
    } else {
        createUserWithEmailAndPassword(auth, email, senha1)
            .then(() => {
                // esconderCarregamento(); // Certifique-se de definir ou remover esta função
        location.reload()
                
                window.location.href = "index.html";
            })
            .catch((error) => {
                // esconderCarregamento(); // Certifique-se de definir ou remover esta função
                alert(error);
            });
    }
});
}