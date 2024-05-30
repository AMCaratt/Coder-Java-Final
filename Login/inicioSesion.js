import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
function iniciarSesion(event) {
  console.log("Prevent default called"); // Agrega esta línea
  event.preventDefault(); // Previene el envío predeterminado del formulario
  const loginForm = event.target;
  const usuario = loginForm.username.value;
  const contrasena = loginForm.password.value;

  const request = window.indexedDB.open('registroDB', 1);

  request.onsuccess = function(event) {
    const db = event.target.result;
    const transaction = db.transaction('registro', 'readonly');
    const objectStore = transaction.objectStore('registro');

    const getRequest = objectStore.get(usuario);

    getRequest.onsuccess = function(event) {
      const registro = event.target.result;
      if (registro && registro.contrasena === contrasena) {
        // Inicio de sesión exitoso
        Toastify({
          text: "Inicio de sesión exitoso",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#4CAF50",
          close: true,
        }).showToast();
        
        // Redirigir a la página principal después del inicio de sesión
        setTimeout(() => {
          window.location.href = '../Pagina/pagPrincipal.html';
        }, 3000); // Espera 3 segundos antes de redirigir
      } else {
        // Inicio de sesión fallido
        Toastify({
          text: "Usuario o contraseña incorrectos",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#FF0000",
          close: true,
        }).showToast();
      }
    };

    getRequest.onerror = function(event) {
      console.error('Error al obtener el registro en IndexedDB', event.target.error);
      Toastify({
        text: "Error al acceder a la base de datos",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#FF0000",
        close: true,
      }).showToast();
    };
  };

  request.onerror = function(event) {
    console.error('Error al abrir/crear la base de datos', event.target.error);
    Toastify({
      text: "Error al abrir la base de datos",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#FF0000",
      close: true,
    }).showToast();
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', iniciarSesion);
});
