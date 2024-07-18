'use strict';

//*Selecting HTML Elements
const showWinner = document.getElementById('show-winner');

const player0El = document.querySelector('.player--0');
const score0El = document.getElementById('score--0');
const current0El = document.getElementById('current--0');

const player1El = document.querySelector('.player--1');
const score1El = document.getElementById('score--1');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');

const btnInfo = document.querySelector('.info');
const modalInfo = document.querySelector('.info-modal');
const btnCloseInfo = document.querySelector('.close-info');
const overlay = document.querySelector('.overlay');

//*Initialize Variables
let current, activePlayer, score0, score1;

//! Function to Switch Between Players.
function switchToPlayer(active) {
  current = 0;
  player1El.classList.toggle('player--active');
  player0El.classList.toggle('player--active');
  if (active !== 0) {
    current0El.textContent = current;
  } else {
    current1El.textContent = current;
  }
}

//! Function to Reset the Game Setting
function reset() {
  current = 0;
  activePlayer = 0;
  score0 = 0;
  score1 = 0;
  score0El.textContent = score0;
  score1El.textContent = score1;
  current0El.textContent = current;
  current1El.textContent = current;

  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');

  showWinner.textContent = '';

  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
}

//! Function to Check for Winner
function checkForWin(score, active) {
  if (score >= 100) {
    showWinner.textContent = `Player ${active + 1} Won! 🎉`;
    btnRoll.classList.toggle('hidden');
    btnHold.classList.toggle('hidden');
    diceEl.classList.add('hidden');
    document
      .querySelector(`.player--${active}`)
      .classList.remove('player--active');
    document
      .querySelector(`.player--${active}`)
      .classList.add('player--winner');
  } else {
    activePlayer = Number(!active);
    switchToPlayer(activePlayer);
  }
}

//! Functions to open and close Modal Info
function openInfo() {
  modalInfo.classList.remove('hidden');
  overlay.classList.remove('hidden');
}
function closeInfo() {
  modalInfo.classList.add('hidden');
  overlay.classList.add('hidden');
}

//*Reset The Game
reset();

//* Roll Btn Functionality
btnRoll.addEventListener('click', function () {
  //Generate Randon Number Between 1 to 6
  const dice = Math.trunc(Math.random() * 6) + 1;

  //Desplay Dice
  diceEl.src = `dice-${dice}.png`;
  diceEl.classList.remove('hidden');

  // Check If Dice is 1 or not
  if (dice !== 1) {
    //Adding Current dice to Active Player
    current += dice;
    if (activePlayer === 0) {
      current0El.textContent = current;
    } else {
      current1El.textContent = current;
    }
  } else {
    //Change Active Player And Switch it
    activePlayer = Number(!activePlayer);
    switchToPlayer(activePlayer);
  }
});

//* Hold Btn Functionality
btnHold.addEventListener('click', function () {
  //Add Current Score to Main Score and Check for Win
  if (activePlayer === 0) {
    score0 += current;
    score0El.textContent = score0;
    checkForWin(score0, activePlayer);
  } else {
    score1 += current;
    score1El.textContent = score1;
    checkForWin(score1, activePlayer);
  }
});

//*New Btn Functionality
btnNew.addEventListener('click', reset);

//*Info Btn Functionality
btnInfo.addEventListener('click', openInfo);

//*Close Info Btn Functionality
btnCloseInfo.addEventListener('click', closeInfo);

//*Overlay close Info Functionality
overlay.addEventListener('click', closeInfo);
