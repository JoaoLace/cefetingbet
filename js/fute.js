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

async function getUserEmail() {
    const auth = getAuth(app);
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(user.email);
            } else {
                reject(new Error('Usuário não autenticado.'));
            }
        });
    });
}

async function checkUserRole() {
    const auth = getAuth(app);
    const user = await new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            resolve(user);
        });
    });

    if (user && user.email === "adm@gmail.com") {
        console.log("adm is on!!!");
        defineScores()
    }
}


document.addEventListener("DOMContentLoaded", function() {
if (document.getElementById("jogos")) {
    checkUserRole();
    defineBotoes();

}});


function defineScores()
{
    const divJogos = document.getElementById("jogos")
    divJogos.innerHTML += '<button id="mudarScore"></button>'

    const butaoMudarScore = document.getElementById("mudarScore")
    butaoMudarScore.addEventListener("click", (e) => {
        const promptMessage = "Time A:";
        const timeAscore = window.prompt(promptMessage); 

        const promptMessage2 = "Time B:";
        const timeBscore = window.prompt(promptMessage); 

        document.getElementById("timeA_score").innerText = timeAscore;
        document.getElementById("timeB_score").innerText = timeBscore;

    })
}

function winner(timeA,timeB)
{
    if (timeA > timeB)
        return 1;

    else if (timeB > timeA)
        return 2;

    else if (timeB == timeA)
        return 0;
}

async function apostar(time) {
    const promptMessage = "Valor da aposta:";
    const valor = window.prompt(promptMessage);

    if (valor === null || valor === '') {
        console.log('Aposta cancelada ou valor não fornecido.');
        return;
    }

    try {
        const email = await getUserEmail();

        const db = getFirestore(app);
        const apostasCollection = collection(db, 'apostas');

        await setDoc(doc(apostasCollection, email), {
            valor: Number(valor),
            time: time
        }, { merge: true });

        console.log('Aposta realizada com sucesso.');
    } catch (error) {
        console.error('Erro ao realizar a aposta:', error);
    }
}
function defineBotoes() {
    let butao1 = document.getElementById("butao1");
    butao1.addEventListener("click", () => {
        alert("dohasdoisa")
        apostar(1);
    })


    document.getElementById("butao2").addEventListener("click", (e) => {
        apostar(2);
    });
}
