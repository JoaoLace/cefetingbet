import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC2wzob4G4hx0WZb4OgdXC_jsIG9gDrNwM",
    authDomain: "ufsj-894af.firebaseapp.com",
    databaseURL: "https://ufsj-894af-default-rtdb.firebaseio.com",
    projectId: "ufsj-894af",
    storageBucket: "ufsj-894af.appspot.com",
    messagingSenderId: "74536358217",
    appId: "1:74536358217:web:f4868d9a2f016147674a98"
  };
  
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
document.addEventListener("DOMContentLoaded", function() {
    // Verifique se o botão de login existe
    if (document.getElementById("btn-login")) {
        // Adicione um ouvinte de evento ao clique do botão de login
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

                        if (user) {
                            const db = getFirestore(app);
                            const userRef = doc(db, "users", user.uid);
                            const userData = {
                                nome: nomeUsuario,
                            };

                            return setDoc(userRef, userData);
                        } else {
                            console.error("Usuário não autenticado.");
                            throw new Error("Usuário não autenticado.");
                        }
                    })
                    .then(() => {
                        const user = auth.currentUser;
                        const db = getFirestore(app);
                        const userRef = doc(db, "users", user.uid);

                        return getDoc(userRef)
                            .then((doc) => {
                                alert("dgsau");

                                if (doc.exists()) {
                                    const userData = doc.data();
                                    const nomeDoUsuario = userData.nome;
                                    const userInfoElement = document.getElementById("user-info");
                                 
                                }
                            });
                    })
                    .then(() => {
                        window.location.href = "index.html";
                    })
                    .catch((error) => {
                        console.error("Erro ao registrar o usuário:", error);
                    });
            }
        });
    } else {
        console.error("O botão de login não foi encontrado.");
    }
});

if(window.location === "index.html")
{
    alert("rteste")
     const userData = doc.data();
     const nomeDoUsuario = userData.nome;
     const userInfoElement = document.getElementById("user-info");
     userInfoElement.textContent = "Bem-vindo, " + nomeDoUsuario;
}