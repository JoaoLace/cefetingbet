import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, doc, setDoc, add } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Inicialize o aplicativo Firebase
const firebaseConfig = {
    apiKey: "sua-api-key",
    authDomain: "seu-auth-domain",
    projectId: "seu-project-id",
    storageBucket: "seu-storage-bucket",
    messagingSenderId: "seu-messaging-sender-id",
    appId: "sua-app-id"
};

const firebaseApp = initializeApp(firebaseConfig);

// Obtenha a instância de autenticação
const auth = getAuth(firebaseApp);

if (document.getElementById("btn-login")) {
    document.getElementById("btn-login").addEventListener("click", function () {
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
                .then((userCredential) => {
                    const user = userCredential.user;
                    const nomeUsuario = document.getElementById("nome-sign").value;

                    const db = getFirestore();
                    const userRef = doc(db, "users", user.uid);
                    const dinheiro = 10000
                    const userData = {
                        nome: nomeUsuario,
                        dinheiro: 10000.0
                    };
                    // Define os dados do usuário no Firestore
                     return setDoc((userRef), userData);
                   
                })
                .then(() => {
                    window.location.href = "index.html";
                })
                .catch((error) => {
                    console.error("Erro ao registrar o usuário:", error);
                });
        }
    });
}
