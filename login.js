// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB-0xCOSEtLmvM1w88JJ4KuVvhTi-tseh4",
    authDomain: "encriptacionutpuebla.firebaseapp.com",
    projectId: "encriptacionutpuebla",
    storageBucket: "encriptacionutpuebla.appspot.com",
    messagingSenderId: "972000501501",
    appId: "1:972000501501:web:3806b6090d391015e12894"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const loginForm = document.getElementById('loginForm');
const registerBtn = document.getElementById('registerBtn');

// Función para encriptar la contraseña usando la API global de CryptoJS
const hashPassword = (password) => {
    return CryptoJS.SHA256(password).toString();
};

// Evento de registro
registerBtn.addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        const hashedPassword = hashPassword(password);

        try {
            await addDoc(collection(db, "usuarios"), {
                username: username,
                passwordHash: hashedPassword,
                timestamp: serverTimestamp()
            });
            alert("Usuario registrado exitosamente.");
        } catch (error) {
            console.error("Error al registrar usuario: ", error);
            alert("Error al registrar el usuario.");
        }
    } else {
        alert("Por favor, ingresa un nombre de usuario y una contraseña.");
    }
});
// Evento de inicio de sesión
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const hashedPassword = hashPassword(password);

    try {
        const q = query(collection(db, "usuarios"), where("username", "==", username), where("passwordHash", "==", hashedPassword));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            alert("Inicio de sesión exitoso.");
            
            window.location.href = "inicio.html";
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    } catch (error) {
        console.error("Error al iniciar sesión: ", error);
        alert("Error al iniciar sesión.");
    }
});
