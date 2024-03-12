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

    async function deleteOldProfilePictures(email) {
        const storageRef = ref(storage, 'profile_pictures/' + email);
        try {
            const listResult = await listAll(storageRef);
            const deletePromises = listResult.items.map(item => deleteObject(item));
            await Promise.all(deletePromises);
            console.log('Fotos antigas do perfil excluídas com sucesso.');
        } catch (error) {
            console.error('Erro ao excluir fotos antigas do perfil:', error);
        }
    }
    
    async function uploadFile(file) {
        const email = await getUserEmail();
        const storageRef = ref(storage, 'profile_pictures/' + email + '/' + file.name);
    
        // Excluir fotos antigas do perfil antes de fazer o upload da nova
        await deleteOldProfilePictures(email);
    
        // Upload do arquivo
        try {
            const snapshot = await uploadBytes(storageRef, file);
            console.log('File uploaded successfully');
            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log('File available at', downloadURL);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

const fileInput = document.getElementById('file-input');
if (fileInput){
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    uploadFile(file);
});
}
async function getFirstProfilePictureURL(email) {
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

async function displayProfilePicture() {
    const email = await getUserEmail();
    const profilePictureURL = await getFirstProfilePictureURL(email);
    if (profilePictureURL) {
        const profilePictureImg = document.getElementById('profile-picture');
        profilePictureImg.src = profilePictureURL;
    }
}

displayProfilePicture();

