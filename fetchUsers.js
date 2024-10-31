
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

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

// Función para obtener y mostrar usuarios
async function fetchAndDisplayUsers() {
    const usersTableBody = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
    
    try {
        const querySnapshot = await getDocs(collection(db, "usuarios"));
        
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            
            // Crear una fila para cada usuario
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${userData.username}</td>
                <td>${userData.passwordHash}</td>
                <td>${userData.timestamp ? new Date(userData.timestamp.toDate()).toLocaleString() : "N/A"}</td>
            `;
            
            // Agregar la fila a la tabla
            usersTableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error al obtener usuarios: ", error);
        alert("Error al cargar la lista de usuarios.");
    }
}

//  función para cargar los usuarios al cargar la página
fetchAndDisplayUsers();
