
var str = "abcdefghijklmnopqrstuvwxyz";
var alphaArray = str.split("");
var words = ["game", "sox", "bears", "bulls"];
var userWord = [];
var currentWord;
var currentWordArray = [];
var lettersUsed = [];
var userLetter;
var allowedGuesses = 5;
var guessRemain = 5;
var currentGuess = 0;

var foundLetter = false;

init();

function init() {
    console.clear();
    console.log("initializing...");

    currentWord = randomWord();
    currentWordArray = currentWord.split(",");

    for (i = 0; i < currentWord.length; i++) {
        userWord.push('_');
    }

    var currentGuess = 0;
    var noWinner = true;
}

function randomWord() {
    var x = Math.floor((Math.random() * words.length) + 1);
    return words[x];
}

// get key pressed
document.onkeypress = function (event) {
    // Todo: number should be alpha
    console.log(event.key);
    playGame(event.key)
}


function displayStats() {
    console.log('\x1Bc');
    console.log("Total allowed guesses: " + allowedGuesses);
    console.log("Total current guess  : " + currentGuess);
    console.log("Remaing guess        : " + guessRemain);
    console.log("Letters already used : " + lettersUsed);
    console.log("Current word         : " + currentWord);
    console.log("User word            : " + userWord);
    console.log("");

}

function checkGame(letter) {
    //currentGuess++;
    //guessRemain--;

    console.log(userWord.join(""));
    if (foundLetter) {
        if (userWord.join("") == currentWord) {
            noWinner = false;
            console.log("");
            console.log("winner winner chicken dinner");
            console.log("");
            //init();
        }
        else {
            currentGuess++;
            guessRemain--;
        }
    }
    else {
        if (!lettersUsed.includes(letter)) {
            lettersUsed.push(letter);
            guessRemain--;
        }
    }
}

function playGame(letter) {
    var noWinner = true;

    displayStats();
    console.log(lettersUsed);

    if (lettersUsed.includes(letter)) {
        console.log(letter + " already selected");
    }
    //lettersUsed.push(letter);

    for (i = 0; i <= currentWord.length; i++) {
        var wletter = currentWord[i];
        if (letter === wletter) {
            foundLetter = true;
            console.log("found at: " + i + " splicing in userWord");
            userWord.splice(i, 1, letter);
        }
    }
    console.log(lettersUsed.join(""));

    displayStats();
    checkGame(letter);
}