//const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
var readline = require('readline-sync');



console.clear
console.log("begin game...");

var str = "abcdefghijklmnopqrstuvwxyz";
var alphaArray = str.split(""); // the argument is a null string, "".
var words = ["game", "sox", "bears", "bulls"];
var userWord = [];
var currentWord;
var currentWordArray = [];
var lettersUsed = [];//new Array(5);
var userLetter;
var allowedGuesses = 5;
var guessRemain = 5;

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

// function playGame() {
//     currentWord = randomWord();
//     currentWordArray = currentWord.split("");
//     console.log(currentWord);
    
//     for (i = 0; i < currentWord.length; i++) {
//         userWord.push('_');
//     }
//     //var totalGuesses = 5;
//     var currentGuess = 1;

//     //while (currentGuess < allowedGuesses) {
//     //console.log("Current guess: " + currentGuess);
//     console.log(userWord);
//         for (i = 0; i < currentWord.length; i++) {
//             var name = readline.question("Enter guess: ");
//             currentGuess++;
//             console.log(currentWord.indexOf(name));
//             if (currentWord.indexOf(name) >= 0) {
//                 console.log("letter in ");
//                 userWord.splice(currentWord.indexOf(name), 1, name);   
//                 currentWordArray.pop(name);
//                 console.log("What am I: " + currentWord.indexOf(name));
//                 console.log(userWord);
//             }
//             else {
//                 console.log("wrong guess");
//             }
//         }
//         //currentGuess++;
//     //}
// }

function playGame2() {
    currentWord = randomWord();
    currentWordArray = currentWord.split(",");
    
    for (i = 0; i < currentWord.length; i++) {
        userWord.push('_');
    }

    // for (i = 0; i < allowedGuesses.length; i++) {
    //     lettersUsed.push('_');
    // }

    //userWord = new Array(currentWordArray.length);
    var currentGuess = 0;

    var noWinner = true;
    //while (currentGuess <= allowedGuesses && noWinner) {
    while (guessRemain > 0 && noWinner) {
        console.log('\x1Bc');
        console.log("Total allowed guesses: " +allowedGuesses);
        console.log("Total current guess  : " + currentGuess);
        console.log("Remaing guess        : " + guessRemain);
        console.log("Letters already used : " +lettersUsed);
        console.log("Current word         : " +currentWord);
        console.log("User word            : " +userWord);
        console.log("");
        
        var letter = readline.question("Enter guess: ");
        console.log(lettersUsed);
        if (lettersUsed.includes(letter)) {
            console.log(letter +" already selected");
        }
        lettersUsed.push(letter);

        for (i = 0; i <= currentWord.length; i++) {
            var wletter = currentWord[i];
            if (letter === wletter) {
                console.log("found at: " + i + " splicing in userWord");
                userWord.splice(i, 1, letter);
                //console.log(userWord.join(""));
            }
            //lettersUsed.slice(i, 1, letter);
        }
        console.log(lettersUsed.join(""));
        //console.log("userword: " + userWord.join('') + ", currentWord: " + currentWord);
        console.log('\x1Bc');
        console.log("Total allowed guesses: " +allowedGuesses);
        console.log("Total current guess  : " + currentGuess);
        console.log("Remaing guess        : " +guessRemain);
        console.log("Letters already used : " +lettersUsed);
        console.log("Current word         : " +currentWord);
        console.log("User word            : " +userWord);
        console.log("");


        console.log(userWord.join(""));
        if (userWord.join("") == currentWord) {
            noWinner = false;
            console.log("");
            console.log("winner winner chicken dinner");
            console.log("");
        }
        currentGuess++;
        guessRemain--;
    }
    if (noWinner) {
        console.log("loser");
    }
    else {
        console.log("winner on last try")
    }
}

//playGame();
playGame2();