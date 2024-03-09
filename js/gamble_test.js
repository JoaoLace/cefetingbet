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

async function showMoney() {
    try {
        const email = await getUserEmail();
        document.getElementById("user-show-money").innerText ="$ " + await dinheiroUser(email);
    } catch (error) {
        console.error('Erro ao obter o email do usuário:', error);
    }
}

if (document.getElementById("user-show-money")) {
    showMoney();
}

function atualizarDinheiroUsuario(email, novoDinheiro) {
    const db = getFirestore(app);
    const usersCollection = collection(db, 'users');

    return getDocs(usersCollection)
        .then((querySnapshot) => {
            let usuarioEncontrado = false;
            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                if (email === userData.email_cadastrado) {
                    const userRef = doc.ref; 
                    setDoc(userRef, { dinheiro: novoDinheiro }, { merge: true });
                    usuarioEncontrado = true;
                }
            });
            if (!usuarioEncontrado) {
                throw new Error("Usuário não encontrado");
            }
        })
        .catch((error) => {
            console.error("Erro ao atualizar o dinheiro do usuário:", error);
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



/*




*/


(function () {
    const items = [
      '🍭',
      '❌',
      '⛄️',
      '🦄',
      '🍌',
      '💩',
      '👻',
      '😻',
      '💵',
      '🤡',    
      '🦖',
      '🍎',
      '😂',
      '🖕',
    ];
    const doors = document.querySelectorAll('.door');
    
    document.getElementById('spinner').addEventListener('click', spin);
    document.getElementById('reseter').addEventListener('click', init);
  
    function init(firstInit = true, groups = 1, duration = 1) {
      for (const door of doors) {
        if (firstInit) {
          door.dataset.spinned = '0';
        } else if (door.dataset.spinned === '1') {
          return;
        }
  
        const boxes = door.querySelector('.boxes');
        const boxesClone = boxes.cloneNode(false);
        const pool = ['❓'];
  
        if (!firstInit) {
          const arr = [];
          for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
            arr.push(...items);
          }
          pool.push(...shuffle(arr));
  
          boxesClone.addEventListener(
            'transitionstart',
            function () {
              door.dataset.spinned = '1';
              this.querySelectorAll('.box').forEach((box) => {
                box.style.filter = 'blur(1px)';
              });
            },
            { once: true }
          );
  
          boxesClone.addEventListener(
            'transitionend',
            function () {
              this.querySelectorAll('.box').forEach((box, index) => {
                box.style.filter = 'blur(0)';
                if (index > 0) this.removeChild(box);
              });
            },
            { once: true }
          );
        }
  
        for (let i = pool.length - 1; i >= 0; i--) {
          const box = document.createElement('div');
          box.classList.add('box');
          box.style.width = door.clientWidth + 'px';
          box.style.height = door.clientHeight + 'px';
          box.textContent = pool[i];
          boxesClone.appendChild(box);
        }
        boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
        boxesClone.style.transform = `translateY(-${door.clientHeight * (pool.length - 1)}px)`;
        door.replaceChild(boxesClone, boxes);
      }
    }
  
    async function spin() {

        const promptMessage = "Quanto deseja apostar?";
        const valor = window.prompt(promptMessage); 

      init(false, 1, 2);
      
      for (const door of doors) {
        const boxes = door.querySelector('.boxes');
        const duration = parseInt(boxes.style.transitionDuration);
        boxes.style.transform = 'translateY(0)';
        await new Promise((resolve) => setTimeout(resolve, duration * 100));
      }
      
      verificarResultado(valor);
    }
  
    function shuffle([...arr]) {
      let m = arr.length;
      while (m) {
        const i = Math.floor(Math.random() * m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
      }
      return arr;
    }

    function verificarResultado(value) {
        const portas = document.querySelectorAll('.door');
        let icone = null;
        let todasIguais = true;
    
        for (const porta of portas) {
            const caixa = porta.querySelector('.box');
            const iconeAtual = caixa.textContent;
    
            if (icone === null) {
                icone = iconeAtual;
            } else {
                if (icone !== iconeAtual) {
                    todasIguais = false;
                    break;
                }
            }
        }
    
        setTimeout(() => {
            if (todasIguais) {
                console.log('Você ganhou!');
                const auth = getAuth(app);
                let email;
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        email = user.email;
                        let userTotalMoney = dinheiroUser(email).then(totalMoney => {
                            alert("Você ganhou!!!");
                            atualizarDinheiroUsuario(email, totalMoney + (Number(value) * 10))
                                .then(() => {
                                    setTimeout(() => {
                                        showMoney();
                                    }, 500); // Aguarda 500ms antes de chamar showMoney()
                                });
                        }).catch(error => {
                            console.error("Erro ao obter o dinheiro do usuário:", error);
                        });
                    }
                });
            } else {
                console.log('Você perdeu!');
                const auth = getAuth(app);
                let email;
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        email = user.email;
                        let userTotalMoney = dinheiroUser(email).then(totalMoney => {
                            alert("Você perdeu seu dinheiro!");
                            atualizarDinheiroUsuario(email, totalMoney - Number(value))
                                .then(() => {
                                    setTimeout(() => {
                                        showMoney();
                                    }, 500); // Aguarda 500ms antes de chamar showMoney()
                                });
                        }).catch(error => {
                            console.error("Erro ao obter o dinheiro do usuário:", error);
                        });
                    }
                });
            }
        }, 3000);
    }
    
  
    init();
})();