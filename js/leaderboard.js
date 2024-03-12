import { initializeApp, getApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, getDocs, collection} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import {getStorage, ref, uploadBytes, getDownloadURL, listAll, deleteObject} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js"

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
const storage = getStorage(app)

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
    });}

async function getFirstProfilePictureURL(email) {
    console.log("Email enviado: ", email)
        const storageRef = ref(storage, 'profile_pictures/' + email);
        try {
            const listResult = await listAll(storageRef);
            if (listResult.items.length > 0) {
                const firstFileRef = listResult.items[0];
                const downloadURL = await getDownloadURL(firstFileRef);
                return downloadURL;
            } else {
                console.log('Nenhuma foto de perfil encontrada para o usuário.');
                return null;
            }
        } catch (error) {
            console.error('Erro ao obter URL da foto de perfil:', error);
            return null;
        }
    }


    async function getAllUsers() {
        const db = getFirestore(app);
        const usersCollection = collection(db, 'users');
    
        try {
            const querySnapshot = await getDocs(usersCollection);
            const usersArray = [];
            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                usersArray.push(userData);
            });
            return usersArray;
        } catch (error) {
            console.error('Erro ao obter todos os usuários:', error);
            return [];
        }
    }
    
    /*getAllUsers().then((usersArray) => {
        console.log(usersArray); // Aqui você terá a array contendo todos os usuários
    }).catch((error) => {
        console.error('Erro ao obter todos os usuários:', error);
    });*/
    
    async function sort() {
        const users = await getAllUsers();
        
        for (var i = 0; i < users.length; i++) {
            for (var j = 0; j < users.length - 1; j++) {
                if (users[j].dinheiro < users[j + 1].dinheiro) {
                    const temp = users[j];
                    users[j] = users[j + 1];
                    users[j + 1] = temp;
                }
            }
        }
        console.log(users); 
        return users
    }
    

    async function createLeaderboardTable() {
        const leaderboard = document.getElementById("leaderboard");
        const leaderboardData = await sort();
    
        leaderboard.innerHTML = ""; 
    
        // Cabeçalho da tabela
        leaderboard.innerHTML += `
            <tr>
                <th>Posição</th>
                <th>Nome</th>
                <th>Dinheiro</th>
                <th>Foto</th>
            </tr>
        `;

      
            for (let index = 0; index < leaderboardData.length; index++) {
                const user = leaderboardData[index];
                const { nome, dinheiro } = user;
                const pfpURL = await getUserPfpURL(user.email_cadastrado);
        
                let position = index + 1;
        
                if (index > 0 && user.dinheiro === leaderboardData[index - 1].dinheiro) {
                    position = "Empate"; 
                }
        
                leaderboard.innerHTML += `
                    <tr>
                        <td>${position}</td> <!-- Posição -->
                        <td>${nome}</td> <!-- Nome do usuário -->
                        <td>${dinheiro}</td> <!-- Dinheiro -->
                        <td><img src="${pfpURL}" alt="Foto do usuário" style="width: 40px; height: 40px;"></td> <!-- Foto -->
                    </tr>
                `;
            }
        
        
    }
    
    async function getUserPfpURL(email) {
        const profilePictureURL = await getFirstProfilePictureURL(email);
        return profilePictureURL;
    }
    
    document.addEventListener("DOMContentLoaded", async () => {
        if (document.getElementById("leaderboard")) {
            await createLeaderboardTable();
        }
    });