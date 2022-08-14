/* Elementos del DOM */
const contenedorTeclado = document.querySelector(".teclado");

/* Letras del abecedario para el teclado */
const letras = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "ñ",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
];

function mostrarTeclado() {
  letras.forEach((i) => {
    let letra = document.createElement("button");
    letra.classList = `letra-teclado letra${i}`;
    letra.type = "button";
    letra.textContent = i;
    contenedorTeclado.appendChild(letra);
  });
}

function limpiarTeclado() {
  contenedorTeclado.innerHTML = "";
}

function mostrarLetra() {}
