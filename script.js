const random = parseInt(Math.random() * 100 + 1);
const submit = document.querySelector(`.guessSubmit`);
const userInput = document.querySelector('.guessField');
const guessSlot = document.querySelector('.used');
const remaining = document.querySelector('.remains');
const lowOrHI = document.querySelector('.lowOrHi');
const startover = document.querySelector('.result');
const p = document.createElement('p');

let prevGuess = [];
let numGuess = 0;
let playGame = true;

if (playGame){
    submit.addEventListener('click', function(e){
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess){
    if(isNaN(guess) || guess < 1 || guess > 100) {
        alert('Please Enter A Valid Number');
    }
    else{
        prevGuess.push(guess);
        if(numGuess === 9){
            cleanUp(guess);
            displayMessage(`Game Over. Random Number was ${random}`);
            endGame();
        }
        else{
            cleanUp(guess);
            verifyGuess(guess);
        }
    }
}

function verifyGuess(guess){
    if (guess === random){
        displayMessage('Yayy! YOU WON');
        endGame();
    } else if(guess > random){
        displayMessage('Think Smaller');
    } else if(guess < random){
        displayMessage('Think Bigger');
    }
}

function cleanUp(guess){
    userInput.value = '';
    guessSlot.innerHTML = prevGuess.join(' , ');
    numGuess++;
    remaining.innerHTML = `${10 - numGuess}`;
}

function displayMessage(message){
    lowOrHI.innerHTML = `<h2>${message}</h2>`;
}

function endGame(){
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h1 id="newGame">Start new game</h1>`;
    startover.appendChild(p);
    playGame = false;
    
    // Added event listener directly here instead of calling newGame()
    document.querySelector('#newGame').addEventListener('click', function(){
        // Using let for random so we can reassign
        window.random = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        numGuess = 0;
        guessSlot.innerHTML = '';
        remaining.innerHTML = '10';
        lowOrHI.innerHTML = '';
        userInput.removeAttribute('disabled');
        startover.removeChild(p);
        playGame = true;
    });
}

// Removed the separate newGame function that was causing issues