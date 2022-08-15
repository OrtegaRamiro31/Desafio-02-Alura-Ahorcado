const btnGuardar = document.querySelector(".agregar-palabra");
let palabrasAux;

// Si no existe un localStorage "palabras" entonces...
if (window.localStorage.getItem("palabras") === null) {
  /* Lista de palabras */
  let palabras = ["hola", "soy", "ramiro"]; // Declaramos una lista de palabras iniciales
  palabrasAux = localStorage.setItem("palabras", JSON.stringify(palabras)); // Creamos localStorage, convertimos el arreglo a una cadena en JSON y asignamos a palabrasAux
}

if (btnGuardar !== null) {
  btnGuardar.addEventListener("click", (e) => {
    let obtenerPalabra = document.querySelector(".palabra-nueva"); // Seleccionamos del DOM (TextArea)

    // Si la longitud de la palabra del textarea es menor que 3...
    obtenerPalabra.textLength < 3
      ? alert("Debes colocar una palabra de al menos 3 caractéres.") // Colocamos un Alert indicando al usuario que coloque una palabra de al menos 3 caractéres
      : agregarPalabra(obtenerPalabra.value); // Caso contrario... colocamos la palabra escrita por el usuario en el localstorage
  });
}

/* Función para añadir la palabra nueva al localstorage */
function agregarPalabra(nuevaPalabra) {
  let aux = JSON.parse(localStorage.getItem("palabras")); // Obtenemos los datos del localstorage y asignamos a aux
  aux.push(nuevaPalabra); // Añadimos la nuevaPalabra a aux
  localStorage.setItem("palabras", JSON.stringify(aux)); // Seleccionamos del localStorage a "palabras" y colocamos y sobreescribimos por aux.
}
