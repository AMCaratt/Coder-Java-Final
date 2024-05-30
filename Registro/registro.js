import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
// Función para guardar los datos de registro en IndexedDB
function guardarRegistro(event) {
  event.preventDefault();

  // Obtener referencia al formulario de registro
  const registerForm = event.target;

  // Obtener valores de los campos de registro
  const nombre = registerForm.nombre.value;
  const apellido = registerForm.apellido.value;
  const usuario = registerForm.usuario.value;
  const email = registerForm.email.value;
  const contrasena = registerForm.contrasena.value;

  // Abrir o crear la base de datos 'registroDB'
  const request = window.indexedDB.open('registroDB', 1);

  request.onsuccess = function (event) {
    const db = event.target.result;
    console.log('Base de datos abierta o creada con éxito');

    // Obtener una transacción de escritura en la base de datos
    const transaction = db.transaction('registro', 'readwrite');
    const objectStore = transaction.objectStore('registro');

    // Comprobar si ya existe un registro con la misma clave
    const getRequest = objectStore.get(usuario);

    getRequest.onsuccess = function (event) {
      const existingRegistro = event.target.result;
      if (existingRegistro) {
        console.log('El registro con la clave ya existe en IndexedDB');
        // Manejar el caso de registro duplicado, mostrar un mensaje de error, etc.
      } else {
        // Crear un objeto con los datos de registro
        const registro = {
          nombre,
          apellido,
          usuario,
          email,
          contrasena
        };

        // Agregar el objeto de registro al almacén de objetos 'registro'
        const addRequest = objectStore.add(registro);

        addRequest.onsuccess = function (event) {
          // Mostrar notificación "Registro Exitoso"
          Toastify({
            text: "Registro Exitoso 👍",
            duration: 3000,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            style: {
              background: "black",
            },
          }).showToast();

          // Redirigir a la página de inicio de sesión después de 3 segundos
          setTimeout(() => {
            window.location.href = '/Login/login.html';
          }, 3000);
        }


        addRequest.onerror = function (event) {
          console.error('Error al guardar el registro en IndexedDB', event.target.error);
        };
      }
    };

    getRequest.onerror = function (event) {
      console.error('Error al obtener el registro en IndexedDB', event.target.error);
    };
  };

  request.onerror = function (event) {
    console.error('Error al abrir/crear la base de datos', event.target.error);
  };

  request.onupgradeneeded = function (event) {
    const db = event.target.result;
    const objectStore = db.createObjectStore('registro', { keyPath: 'usuario' });
    console.log('Estructura de la base de datos actualizada');
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  registerForm.addEventListener('submit', guardarRegistro);
});
