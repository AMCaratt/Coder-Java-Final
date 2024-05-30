
document.addEventListener("DOMContentLoaded", function () {
  const inventario = document.getElementById("inventario");
  const filtros = document.getElementById("filtros");

  inventario.style.display = "none"; // Oculta el inventario al cargar la página 
  filtros.style.display = "none";// Oculta los filtros al cargar la página
})

let autos; // Variable para almacenar los datos de los autos

// Función para mostrar u ocultar el inventario y los filtros
function mostrarInventario() {
  let inventario = document.getElementById("inventario");
  let filtros = document.getElementById("filtros");

  // Cargar los autos desde el archivo JSON
  fetch("./auto.json")
    .then(response => response.json())
    .then(data => {
      autos = data;
      if (inventario.style.display === "none") {
        inventario.style.display = "block";// Muestra el inventario
        filtros.style.display = "block";// Muestra los filtros
        mostrarAutos(); // Muestra los autos según los filtros seleccionados
      } else {
        inventario.style.display = "none";// Oculta el inventario
        filtros.style.display = "none";// Oculta los filtros
      }
      mostrarAutos();
    })
    .catch(error => console.error(error));
}

// Función para mostrar los autos según los filtros seleccionados
function mostrarAutos() {
  let marca = document.getElementById("marca").value;
  let año = parseInt(document.getElementById("año").value);
  let precio = parseInt(document.getElementById("precio").value);
  let error = document.getElementById('notfound')

  let carList = document.getElementById("carList");
  carList.innerHTML = ""; // Limpia la lista de autos

  let resultadosEncontrados = false;

  autos.forEach(function (auto) {
    if (
      (marca === "" || auto.marca === marca) &&
      (isNaN(año) || auto.año >= año) &&
      (isNaN(precio) || auto.precio <= precio)
    ) {
      let carItem = crearElementoAuto(auto);  // Crea un elemento HTML para representar el auto 
      carList.appendChild(carItem); // Agrega el elemento al listado de autos
      resultadosEncontrados = true;
    }
  });

  !resultadosEncontrados ? error.innerHTML = 'No se encontraron resultados' : error.innerHTML = ''
}




function abrirFormularioContacto(auto) {
  let nombreInput = document.getElementById('name');
  let correoInput = document.getElementById('email');
  let mensajeInput = document.getElementById('message');

  const nombre = nombreInput.value;
  const correo = correoInput.value;

  mensajeInput.value = `Estoy interesado(a) en el auto ${auto.marca} ${auto.modelo} con valor de $${auto.precio}. Por favor, contáctenme con más información. Mi nombre es ${nombre} y mi correo es ${correo}.`;


    // Guardar los datos en el Local Storage
    const formData = {
      nombre: nombreInput.value,
      correo: correoInput.value,
      mensaje: mensajeInput.value
    };
  
}





function crearElementoAuto(auto) {
  let carItem = document.createElement("div");
  carItem.className = "car-item";

  let img = document.createElement("img");
  img.src = auto.imagen;
  img.alt = "Auto";
  carItem.appendChild(img);

  agregarElemento(carItem, "h3", auto.marca); // Agrega la marca del auto
  agregarElemento(carItem, "p", "Modelo: " + auto.modelo); // Agrega el modelo del auto
  agregarElemento(carItem, "p", "Año: " + auto.año); // Agrega el año del auto 
  agregarElemento(carItem, "p", "Precio: $" + auto.precio); // Agrega el precio del auto

  let detallesLink = document.createElement("a");
  detallesLink.className = "btn";
  detallesLink.href = "";
  detallesLink.textContent = "Ver Detalles";
  carItem.appendChild(detallesLink); // Agrega un enlace de "Ver Detalles" al auto


  detallesLink.addEventListener('click', function (event) {
    event.preventDefault(); // Evitar que la página se actualice al hacer clic en el enlace
    abrirFormularioContacto(auto);
    document.getElementById('contact-form').style.display = 'block'; // Mostrar el formulario de contacto

    if (isContactFormOpen) {
      contactForm.style.display = 'none';
    } else {
      contactForm.style.display = 'block';
      confirmationMessage.style.display = 'none'; // Ocultar el mensaje de confirmación al abrir el formulario
    }

    isContactFormOpen = !isContactFormOpen;
  });


  return carItem; // Devuelve el elemento HTML que representa el auto
}



// Función para agregar un elemento al elemento padre con el texto proporcionado
function agregarElemento(padre, tipoElemento, texto) {
  let elemento = document.createElement(tipoElemento);
  elemento.textContent = texto;
  padre.appendChild(elemento);
}


document.getElementById('logoutButton').addEventListener('click', function () {
  Toastify({
    text: "Vuelva Pronto",
    duration: 2000,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    style: {
      background: "black",
    },
  }).showToast();
  // Redirigir a la página de inicio de sesión después de 3 segundos
  setTimeout(() => {
    window.location.href = '../Login/login.html';
  }, 3000);
})


// Variable de estado para controlar la apertura y cierre del formulario
let isContactFormOpen = false,
  contactLink = document.getElementById('contact'),
  contactForm = document.getElementById('contact-form'),
  confirmationMessage = document.getElementById('confirmation-message'),
  form = document.getElementById('form');

// Manejador de evento para abrir o cerrar el formulario de contacto
contactLink.addEventListener('click', function (e) {
  e.preventDefault();

  if (isContactFormOpen) {
    contactForm.style.display = 'none';
  } else {
    contactForm.style.display = 'block';
    confirmationMessage.style.display = 'none'; // Ocultar el mensaje de confirmación al abrir el formulario
  }

  isContactFormOpen = !isContactFormOpen;
});


// Manejador de evento para enviar el formulario
form.addEventListener('submit', function (e) {
  e.preventDefault();
  confirmationMessage.style.display = 'block'; // Mostrar el mensaje de confirmación al enviar el formulario
  form.reset(); // Restablecer el formulario
  isContactFormOpen = false; // Actualizar el estado del formulario a cerrado

  // Cerrar el formulario después de 3 segundos
  setTimeout(function () {
    contactForm.style.display = 'none';
  }, 1000);
});


