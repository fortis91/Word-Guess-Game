var readline = require('readline-sync');

console.log("begin game...");

var str = "abcdefghijklmnopqrstuvwxyz";
var alphaArray = str.split(""); // the argument is a null string, "".
var words = ["game", "sox", "bears", "bulls"];
var userWord = [];
var currentWord;
var currentWordArray = [];
var lettersUsed = new Array(5);
var userLetter;
var allowedGuesses = 5;
var currentGuess = 0;

console.log(alphaArray.length);
for (i = 0; i < alphaArray.length; i++) {
    //console.log(alphaArray[i]);
}

//https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_random2
function randomWord() {
    var x = Math.floor((Math.random() * 3) + 1);
    //document.getElementById("demo").innerHTML = x;
    return words[x];
}

function userGuess() {
    var x = Math.floor((Math.random() * 26) + 1);
    //document.getElementById("demo").innerHTML = x;
    return alphaArray[x];
}

console.reset = function () {
    return process.stdout.write('\033c');
}
console.reset;
console.clear;
console.log('\x1Bc');

function displayStats(currentWord) {
    console.log('\x1Bc');
    console.log("Total allowed guesses: " + allowedGuesses);
    console.log("Total current guess  : " + currentGuess);
    console.log("Letters already used : " + lettersUsed);
    console.log("Current word         : " + currentWord);
    console.log("User word            : " + userWord);
    console.log("");
}

function beginGame() {
    currentWord = randomWord();
    currentWordArray = currentWord.split(",");
    
    for (i = 0; i < currentWord.length; i++) {
        userWord.push('_');
    }

    for (i = 0; i < allowedGuesses.length; i++) {
        lettersUsed.push("_");
    }

    //userWord = new Array(currentWordArray.length);

    var noWinner = true;
    while (currentGuess <= allowedGuesses && noWinner) {
        //console.log('\x1Bc');
        // console.log("Total allowed guesses: " +allowedGuesses);
        // console.log("Total current guess  : " + currentGuess);
        // console.log("Letters already used : " + lettersUsed);
        // console.log("Current word         : " +currentWord);
        // console.log("User word            : " +userWord);
        // console.log("");
        
        var letter = readline.question("Enter guess: ");
        //lettersUsed.push(letter);

        for (i = 0; i <= currentWord.length; i++) {
            var wletter = currentWord[i];
            if (letter === wletter) {
                console.log("found at: " + i + " splicing in userWord");
                userWord.splice(i, 1, letter);
                //console.log(userWord.join(""));
            }
            lettersUsed.slice(i, 1, letter);
        }
        //console.log("userword: " + userWord.join('') + ", currentWord: " + currentWord);
        //console.log('\x1Bc');
        displayStats(currentWord);

        console.log(userWord.join(""));
        if (userWord.join("") == currentWord) {
            noWinner = false;
            console.log("");
            console.log("winner winner chicken dinner");
            console.log("");
        }
        currentGuess++;
    }
}

beginGame();