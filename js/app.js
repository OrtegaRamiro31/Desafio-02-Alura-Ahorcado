/* Elementos del DOM */
const canvas = document.querySelector(".canva-ahorcado");
const pincel = canvas.getContext("2d");
const btnIniciar = document.querySelector(".inicio-juego");
const lineasLetras = document.querySelector(".lineas-letras");
const letrasErroneas = document.querySelector(".letras-erroneas");
const modal = document.querySelector(".modal");
const btnModal = document.querySelector(".btn-modal");

/* Lista de palabras */
// const palabras = ["hola", "soy", "ramiro"];
let palabras = JSON.parse(localStorage.getItem("palabras"));

/* Variables */
let juegoActivo = false;
let palabra = "";
let caracteresEncontrados = [];
let caracteresErroneos = [];
let intentos = 0;
let letrasPorEncontrar = 0;
let finJuego = false;
let dispositivoMovil = false;

personaje(); // Dibujamos inicialmente el personaje

function inicializarElementos() {
  inicializarVariables(); // Inicializamos variables en cada click
  limpiarCanvas(); // Limpiamos el Canvas
  detectarResolucion(); // Detectamos la resolución actual
  lineasLetras.innerHTML = ""; // Limpiamos las líneas de letras existentes
  letrasErroneas.innerHTML = ""; // Limpiamos las letras erroneas
}
function elegirPalabraAleatoria() {
  let random = Math.ceil(Math.random() * palabras.length - 1); // Generamos un número aleatorio entre 0 y la longitud -1 del arreglo de palabras
  palabra = palabras[random].toUpperCase(); // Se elige una palabra del array en base al número aleatorio
}

function inicioJuego() {
  inicializarElementos();
  elegirPalabraAleatoria();
  letrasPorEncontrar = palabra.length;
  let i = 0; // Inicializamos iterador
  // Con este ciclo creamos las líneas que indican el número de letras de la palabra
  while (i < palabra.length) {
    // Agregamos el número de líneas correspondiente al número de caracteres de la palabra
    lineasLetras.innerHTML += `
    <div class="contenedor-letra-linea">
    <p class="letra letra${i}"></p>
    <div class="lineas"></div>
  </div>
  `;
    i++; // Incremento de iterador
  }

  // Si juegoActivo es verdadero...
  if (juegoActivo === true) {
    // Usamos un evento para el body que detecte cuando se pulsa una tecla
    document.body.addEventListener("keypress", (e) => {
      // Si se ha llegado al fin del juego, detenemos el evento, sino, llamamos la función recorrerPalabra.
      finJuego
        ? e.preventDefault()
        : recorrerPalabra(palabra, e.key.toUpperCase());
    });

    if (dispositivoMovil) {
      /* Recorremos cada elemento del array "letras" que se encuentra en teclado.js y contiene todas las letras del abecedario */
      letras.forEach((i) => {
        // Seleccionamos del DOM el elemento que contenga la clase letra concatenado con su letra correspondiente
        document.querySelector(".letra" + i).addEventListener("click", (e) => {
          // Si se ha llegado al fin del juego, detenemos el evento, sino, llamamos la función recorrerPalabra.
          finJuego
            ? e.preventDefault()
            : recorrerPalabra(palabra, e.target.textContent.toUpperCase());
        });
      });
    }
  }
}

/* Evento de botón de jugar */
btnIniciar.addEventListener("click", () => {
  inicioJuego();
});

btnModal.addEventListener("click", () => {
  modal.close();
  inicioJuego();
});

function detectarResolucion() {
  limpiarTeclado(); // Limpiamos el tecaldo
  const mq = window.matchMedia("(min-width: 1024px)"); // Detectamos si la resolución mínima es de 1024px

  // Si la resolución mínima no es de 1024 (es decir, que sea una resolución menor)...
  if (!mq.matches) {
    mostrarTeclado(); // Muestra el teclado
    dispositivoMovil = true; // Indica que está usándose un dispositivo móvil
  }
}

function inicializarVariables() {
  juegoActivo = true; // Una vez dado click en Nuevo Juego pasamos a verdadero el valor de juegoActivo
  palabra = ""; // Reestablecemos la palabra
  caracteresEncontrados = []; // Reestablecemos los caracteres válidos
  caracteresErroneos = []; // Restablecemos las teclas erroneas
  intentos = 8; // Inicializamos los intentos
  letrasPorEncontrar = 0; // Reestablecemos las letras por encontrar
  finJuego = false; // Restablecemos el fin del juego a false
}

/* Función para buscar el caracter presionado en la palabra */
function recorrerPalabra(palabra, caracter) {
  let encontrado = false;
  // Recorremos la palabra desde 0 hasta la longitud que tenga
  for (let i = 0; i < palabra.length; i++) {
    // Si el caracter presionado es igual al caracter en la posición del iterador de la palabra...
    if (caracter === palabra[i]) {
      // Si el caracter no se encuentra en el array de caracteresEncontrados...
      if (!caracteresEncontrados.includes(caracter)) {
        // Seleccionamos el elemento del DOM correspondiente a la posición del caracter en la palabra
        document.querySelector(".letra" + i).textContent = `${caracter}`;
        // Decrementamos las letras por encontrar dentro de la palabra
        letrasPorEncontrar--;
        // Si las letrasPorEncontrar son cero...
        if (letrasPorEncontrar === 0) {
          // Ganamos
          ganar();
          // Retornamos
          return;
        }
      }
      // Seleccionamos el párrafo en la posición correspondiente y añadimos el valor de la tecla presionada
      encontrado = true;
    }
  }
  mostrarResultado(encontrado, caracter);
}

function mostrarResultado(encontrado, caracter) {
  // Si la letra fue encontrada...
  if (encontrado) {
    // Añadimos al array de caracteresEncontrados la letra encontrada
    caracteresEncontrados.push(caracter);
  }

  // Sino...
  else {
    // Si se encuentra entre el rango de las letras
    if (
      (caracter.charCodeAt(0) >= 65 && caracter.charCodeAt(0) <= 90) ||
      (caracter.charCodeAt(0) >= 97 && caracter.charCodeAt(0) <= 122)
    ) {
      // Si el caracter no se encuentra ya dentro de los caracteres erroneos...
      if (!caracteresErroneos.includes(caracter)) {
        // Creamos un nuevo elemento párrafo
        const parrafoLetraErronea = document.createElement("p");
        // Le añadimos la clase "letra-erronea"
        parrafoLetraErronea.classList = "letra-erronea";
        // Le añadimos el contenido, en este caso, el caracter
        parrafoLetraErronea.textContent = caracter;
        // Añadimos el elemento recien creado como hijo de parrafoLetraErronea
        letrasErroneas.appendChild(parrafoLetraErronea);
        // Añadimos el caracter al array de caracteresErroneos
        caracteresErroneos.push(caracter);
        // Decrementamos en 1 los intentos
        intentos--;
        // Dibujamos en el canvas
        dibujarErrores();
      }
    }
  }
}

function ganar() {
  // document.querySelector(".resultadofinal").textContent = "Has ganado";
  // crearModal();
  agregarAModal("¡Has ganado!", "Felicidades, has ganado esta ronda.");
  modal.showModal();

  finJuego = true;
}
function perder() {
  agregarAModal(
    "¡Has perdido!",
    "Has perdido, la palabra correcta era " + palabra
  );
  modal.showModal();
  // document.querySelector(".resultadofinal").textContent =
  //   "Has perdido, la palabra era " + palabra;

  finJuego = true;
}

function agregarAModal(titulo, texto) {
  const tituloModal = document.createElement("h2");
  const parrafoModal = document.createElement("p");
  tituloModal.textContent = titulo;
  tituloModal.classList = "titulo-modal";
  parrafoModal.textContent = texto;
  parrafoModal.classList = "texto-modal";
  modal.replaceChild(tituloModal, document.querySelector(".titulo-modal"));
  modal.replaceChild(parrafoModal, document.querySelector(".texto-modal"));
}
