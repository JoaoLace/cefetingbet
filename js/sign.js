import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, getDocs, collection} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

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




// Codigo pra cuidar do cadastro de users          // Code that takes care of the sign in
// Cria usando auth com email e senha do firebase  // Create a user using auth with email and password from firebase
// Cria tambem um user no firestore database       // Also creates a user with firestore database
// User
//  nome: nome selecionado na hora do cadastro     // Name,
//  dinheiro: 10000 por padrao                     // 10000 by default
//  email_cadastrado: email usado no auth          // email_cadastrado: email used

const auth = getAuth(app);
document.addEventListener("DOMContentLoaded", function() {
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

                        if (user) {
                            const db = getFirestore(app);
                            const userRef = doc(db, "users", user.uid);
                            const userData = {
                                nome: nomeUsuario,
                                dinheiro: 10000,
                                email_cadastrado: email
                            };

                            return setDoc(userRef, userData);
                        } else {
                            console.error("Usuário não autenticado.");
                            throw new Error("Usuário não autenticado.");
                        }
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
        console.log("Not at sign in page.");
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const userInfoElement = document.getElementById("user-info");

    if (userInfoElement) {
        const auth = getAuth(app);

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const email = user.email;
                console.log("Email do usuário:", email);

                nomeUser(email)
                    .then(nome => {
                        console.log("Nome do usuário:", nome);
                        document.getElementById("user-name").innerText = nome;

                        if(document.getElementById("user-email-profile")){ document.getElementById("user-name-profile").innerText = nome;
                        document.getElementById("user-email-profile").innerText = email;
                        
                        dinheiroUser(email)
                            .then(dinheiro => {
                                console.log("Dinheiro do usuário:", dinheiro);
                                document.getElementById("user-money-profile").innerText = dinheiro;
                            })
                            .catch(error => {
                                console.error("Erro ao obter dinheiro do usuário:", error);
                            });}

                       
                    })
                    .catch(error => {
                        console.error("Erro ao obter nome do usuário:", error);
                    });
            } else {
                console.log("Nenhum usuário autenticado.");
            }
        });
    }
});

function nomeUser(email) {
    const db = getFirestore(app);
    const usersCollection = collection(db, 'users');


    return getDocs(usersCollection)
        .then((querySnapshot) => {
            const usersArray = [];
            querySnapshot.forEach((doc) => {
                usersArray.push(doc.data());
            });
            for (var i = 0; i < usersArray.length; i++) {
                if (email == usersArray[i].email_cadastrado) {
                    return usersArray[i].nome;
                }
            }
            throw new Error("Usuário não encontrado");
        })
        .catch((error) => {
            throw error;
        });
}

function dinheiroUser(email)
{
    const db = getFirestore(app);
    const usersCollection = collection(db, 'users');


    return getDocs(usersCollection)
        .then((querySnapshot) => {
            const usersArray = [];
            querySnapshot.forEach((doc) => {
                usersArray.push(doc.data());
            });
            for (var i = 0; i < usersArray.length; i++) {
                if (email == usersArray[i].email_cadastrado) {
                    console.log("Dinheiro: ", usersArray[i].dinheiro)

                    return usersArray[i].dinheiro;
                }
            }
            throw new Error("Usuário não encontrado");
        })
        .catch((error) => {
            throw error;
        });
}

