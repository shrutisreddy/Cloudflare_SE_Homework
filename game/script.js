'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);

const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);

let playing, currentScore, activePlayer, score;

const resetGame = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');

  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
};

resetGame();
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  player1El.classList.toggle(`player--active`);
  player0El.classList.toggle(`player--active`);
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generate a random dice roll
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    //2. Display Dice

    diceEl.classList.remove('hidden');

    diceEl.src = `dice-${diceRoll}.png`;

    //3. Check for rolled dice 1 and switch player

    if (diceRoll !== 1) {
      //Add dice to current score
      currentScore += diceRoll;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
      // also works - document
      //   .querySelector(`.player--${activePlayer}`)
      //  .classList.remove(`player--active`);
      //Switch to next player

      // also works -  document
      //.querySelector(`.player--${activePlayer}`)
      //.classList.add(`player--active`);
    }
  }
});

btnHold.addEventListener(`click`, function () {
  if (playing) {
    //Add current score of Active player to score and update DOM and switch player
    score[activePlayer] += currentScore;
    score0El.textContent = score[0];
    score1El.textContent = score[1];
    if (score[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      diceEl.classList.add('hidden');
    } else switchPlayer();
  }
});

btnNew.addEventListener(`click`, resetGame);
