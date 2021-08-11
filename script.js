'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const scorePlayer0 = document.querySelector('#score--0');
const scorePlayer1 = document.querySelector('#score--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceElement = document.querySelector('.dice');
const currentPlayer0 = document.querySelector('#current--0');
const currentPlayer1 = document.querySelector('#current--1');

let scores;
let currentScore;
let activePlayer;
let playing;

function init() {
    scores = [0, 0];
    activePlayer = 0;
    playing = true;
    currentScore = 0;
    
    scorePlayer0.textContent = 0;
    scorePlayer1.textContent = 0;
    currentPlayer0.textContent = 0;
    currentPlayer1.textContent = 0;

    diceElement.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

init();

function switchActivePlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = (activePlayer === 0) ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function() {
    if (playing) {
        //1. Generate roll dice
        const dice = Math.trunc(Math.random() * 6) + 1;
        //2. Display dice image
        diceElement.classList.remove('hidden');
        diceElement.src = `dice-${dice}.png`;
        
        //3. Check for rolled 1
        if (dice !== 1) {
            //Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {    
            //Switch to next player
            switchActivePlayer();
        }
    }
});

btnHold.addEventListener('click', function() {
    if (playing) {
        //1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        
        //2. Check player's score >= 100
        if (scores[activePlayer] >= 20) {
            //Finish the game
            diceElement.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');        
            playing = false;
        } else {   
            //Switch active player
            switchActivePlayer();
        }
    }
})

btnNew.addEventListener('click', init)
