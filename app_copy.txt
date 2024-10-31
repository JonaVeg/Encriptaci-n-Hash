// Configuración de Firebase proporcionada
const firebaseConfig = {
    apiKey: "AIzaSyB-0xCOSEtLmvM1w88JJ4KuVvhTi-tseh4",
    authDomain: "encriptacionutpuebla.firebaseapp.com",
    projectId: "encriptacionutpuebla",
    storageBucket: "encriptacionutpuebla.appspot.com",
    messagingSenderId: "972000501501",
    appId: "1:972000501501:web:3806b6090d391015e12894"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore(); // Inicializa Firestore

// Función para el registro de usuario
function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Crea un hash de la contraseña
    const hashedPassword = CryptoJS.SHA256(password).toString();

    // Registrar usuario con Firebase Authentication
    auth.createUserWithEmailAndPassword(email, hashedPassword)
        .then((userCredential) => {
            const userId = userCredential.user.uid;
            // Guarda los datos del usuario en Firestore
            db.collection("users").doc(userId).set({
                email: email,
                createdAt: new Date()
            }).then(() => {
                alert('Registro exitoso');
                window.location.href = 'dashboard.html'; // Redirige al dashboard
            }).catch((error) => {
                console.error("Error al guardar en Firestore:", error);
            });
        })
        .catch((error) => {
            document.getElementById('message').innerText = 'Error en el registro: ' + error.message;
        });
}
