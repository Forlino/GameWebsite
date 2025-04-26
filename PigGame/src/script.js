"use strict";

// Funciones utilitarias
const getDiceValue = () => Math.floor(Math.random() * 6) + 1; // entre 1 y 6

function _strToInt(text) {
  if (text === null || text === "") return 0;
  return parseInt(text);
}

// Selección de elementos
const finalS0El = document.getElementById("score--0");
const finalS1El = document.getElementById("score--1");

const score0El = document.getElementById("current--0");
const score1El = document.getElementById("current--1");

const rollDiceButton = document.querySelector(".btn.btn--roll");
const holdButton = document.querySelector(".btn.btn--hold");
const newGameButton = document.querySelector(".btn.btn--new");

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const diceEl = document.querySelector(".dice");

// Ocultar el dado inicialmente
diceEl.classList.add("hidden");

// Funciones Setter & Getter
const setFinalScore = (v) => (activePlayer == 0 ? (finalS0El.textContent = v) : (finalS1El.textContent = v));
const setScore = (v) => (activePlayer == 0 ? (score0El.textContent = v) : (score1El.textContent = v));
const getFinalScore = () => _strToInt(activePlayer == 0 ? finalS0El.textContent : finalS1El.textContent);
const getScore = () => _strToInt(activePlayer == 0 ? score0El.textContent : score1El.textContent);

let activePlayer = 0;
let diceValue;
let _isGameComplete = false;

rollDiceButton.addEventListener("click", onTapRollDice);
holdButton.addEventListener("click", onTapHold);
newGameButton.addEventListener("click", onTapNewGame);

// Funcionalidad para lanzar el dado
function onTapRollDice() {
  if (isGameComplete()) return;
  diceValue = getDiceValue();
  diceEl.classList.remove("hidden");
  diceEl.src = `assets/dice-${diceValue}.png`;

  if (diceValue !== 1) {
    setScore(diceValue);
    setFinalScore(getFinalScore() + diceValue);
  } else {
    setScore(0);
    switchActivePlayer();
  }

  checkIfPlayerWon();
}

// Funcionalidad para mantener el puntaje
function onTapHold() {
  if (isGameComplete()) return;
  setFinalScore(getFinalScore() + diceValue);
  setScore(0);
  switchActivePlayer();
}

// Funcionalidad para nuevo juego
function onTapNewGame() {
  activePlayer = 0;
  _isGameComplete = false;
  finalS0El.textContent = 0;
  finalS1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
}

// Cambiar jugador activo
function switchActivePlayer() {
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
  setTimeout(() => alert(`Turno del Jugador ${activePlayer + 1}`), 100);
}

// Verificar si un jugador ganó
function checkIfPlayerWon() {
  if (getFinalScore() >= 100) {
    _isGameComplete = true;
    setTimeout(() => alert(`El Jugador ${activePlayer + 1} ganó`), 100);
  }
}

function isGameComplete() {
  if (_isGameComplete) {
    alert("El juego ya está completo");
    return true;
  }
  return false;
}
