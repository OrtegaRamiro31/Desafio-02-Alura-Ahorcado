/* Elementos del DOM */
const canvas = document.querySelector(".canva-ahorcado");
const pincel = canvas.getContext("2d");
const btnIniciar = document.querySelector(".inicio-juego");
const lineasLetras = document.querySelector(".lineas-letras");
const letrasErroneas = document.querySelector(".letras-erroneas");

/* Lista de palabras */
const palabras = ["hola", "soy", "ramiro"];

/* Variables */
let juegoActivo = false;
let palabra = "";
let caracteresEncontrados = [];
let caracteresErroneos = [];
let intentos = 0;
let letrasPorEncontrar = 0;
let finJuego = false;

/* Evento de botón de jugar */
btnIniciar.addEventListener("click", () => {
  inicializarVariables(); // Inicializamos variables en cada click
  limpiarCanvas(); // Limpiamos el Canvas

  lineasLetras.innerHTML = ""; // Limpiamos las líneas de letras existentes
  letrasErroneas.innerHTML = ""; // Limpiamos las letras erroneas

  let random = Math.ceil(Math.random() * palabras.length - 1); // Generamos un número aleatorio entre 0 y la longitud -1 del arreglo de palabras
  palabra = palabras[random].toUpperCase(); // Se elige una palabra del array en base al número aleatorio

  letrasPorEncontrar = palabra.length;
  let i = 0; // Inicializamos iterador
  console.log(letrasPorEncontrar);
  // Con este ciclo creamos las líneas que indican el número de letras de la palabra
  while (i < palabra.length) {
    console.log(palabra[i]);

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
  }
});

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
  console.log("Ganaste");
  finJuego = true;
}
function perder() {
  console.log("Perdiste");
  finJuego = true;
}
/* Colores */
const darkBlue = "#0A3871";
const lightBlue = "#F3F5FC";

/* Grosor */
const grosor = 5;

/* Funciones */
function limpiarCanvas() {
  pincel.clearRect(0, 0, canvas.width, canvas.height); // Limpiamos el canvas.
}
function mastil() {
  dibujarLinea(200, 550, 450, 550); // Base

  dibujarLinea(250, 550, 250, 200); // Mastil

  dibujarLinea(250, 200, 400, 200); // Mastil Arriba

  dibujarLinea(400, 200, 400, 250); // Mastil para colgar
}

function cabeza() {
  // Colocamos un círculo dentro de otro para simular la cabeza y que no se vea de un solo color.
  dibujarCirculo(400, 280, 30, darkBlue); // Cabeza con background darkblue
  dibujarCirculo(400, 280, 25, lightBlue); // Cabeza más pequeña con lightblue
}

function torso() {
  dibujarLinea(400, 310, 400, 450); // Dibujamos torso de personaje
}

function brazoIzquierdo() {
  dibujarLinea(400, 310, 370, 350); // Dibujamos brazo izquierdo
}

function brazoDerecho() {
  dibujarLinea(400, 310, 430, 350); // Dibujamos brazo derecho
}

function pieIzquierdo() {
  dibujarLinea(400, 450, 370, 500); // Dibujamos pie izquierdo
}

function pieDerecho() {
  dibujarLinea(400, 450, 430, 500); // Dibujamos pie derecho
}

function dibujarLinea(x1, y1, x2, y2, color = darkBlue) {
  pincel.beginPath();
  pincel.moveTo(x1, y1); // Mover a x,y coordenadas
  pincel.lineTo(x2, y2); // Dibujar línea desde el punto actual hasta otro punto (x,y)
  pincel.strokeStyle = color; // Añadimos color
  pincel.lineWidth = grosor; // Grosor de la linea
  pincel.lineCap = "round"; // Redondeamos la línea
  pincel.stroke(); // Colocamos el dibujo dentro del canva
}

function dibujarCirculo(x, y, radio, color = darkBlue) {
  pincel.beginPath();
  pincel.fillStyle = color;
  pincel.beginPath();
  pincel.arc(x, y, radio, 0, 2 * 3.14);
  pincel.fill();
}

function personaje() {
  mastil();
  cabeza();
  torso();
  brazoIzquierdo();
  brazoDerecho();
  pieIzquierdo();
  pieDerecho();
}

personaje();

function dibujarErrores() {
  switch (intentos) {
    case 7:
      mastil();
      break;

    case 6:
      cabeza();
      break;

    case 5:
      torso();
      break;

    case 4:
      brazoIzquierdo();
      break;

    case 3:
      brazoDerecho();
      break;

    case 2:
      pieIzquierdo();
      break;

    case 1:
      pieDerecho();
      perder();
      break;

    default:
      console.log("error");
  }
}
