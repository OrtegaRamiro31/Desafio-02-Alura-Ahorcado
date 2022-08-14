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

  dibujarLinea(250, 550, 250, 100); // Mastil

  dibujarLinea(250, 100, 400, 100); // Mastil Arriba

  dibujarLinea(400, 100, 400, 150); // Mastil para colgar
}

function cabeza() {
  // Colocamos un círculo dentro de otro para simular la cabeza y que no se vea de un solo color.
  dibujarCirculo(400, 180, 30, darkBlue); // Cabeza con background darkblue
  dibujarCirculo(400, 180, 25, lightBlue); // Cabeza más pequeña con lightblue
}

function torso() {
  dibujarLinea(400, 210, 400, 350); // Dibujamos torso de personaje
}

function brazoIzquierdo() {
  dibujarLinea(400, 210, 370, 250); // Dibujamos brazo izquierdo
}

function brazoDerecho() {
  dibujarLinea(400, 210, 430, 250); // Dibujamos brazo derecho
}

function pieIzquierdo() {
  dibujarLinea(400, 350, 370, 400); // Dibujamos pie izquierdo
}

function pieDerecho() {
  dibujarLinea(400, 350, 430, 400); // Dibujamos pie derecho
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
