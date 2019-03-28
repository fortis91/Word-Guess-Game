
$(document).ready(function () {
    var words = ["game", "sox", "bears", "bulls", "fire", "jamaica"];
    var userWord = [];
    var currentWord;
    var currentWordArray = [];
    var lettersUsed = [];
    var userLetter;
    var allowedGuesses = 5;
    var guessRemain = 5;
    var currentGuess = 0;
    //var noWinner = true;

    var foundLetter = false;
    var wins = 0;
    var loss = 0;

    var smsg = "winner winner chicken dinner";
    var lmsg = "Sorry, try again";

    var background = document.createElement("audio");
    background.setAttribute("src", "assets/sound/bensound-ukulele.mp3")

    //background music https://www.bensound.com/
    //button sounds https://www.soundjay.com/button-sounds-1.html

    // Create variables that hold references to the places in the HTML where we want to display things.
    var winsText = document.getElementById("wins-text");
    var lossesText = document.getElementById("losses-text");
    var currentWordText = document.getElementById("current-word-text");
    var allowedGuessesText = document.getElementById("allowed-guesses-text");
    var guessRemainText = document.getElementById("guess-remain-text");
    var userWordText = document.getElementById("user-word-text");
    var lettersUsedText = document.getElementById("letters-used-text");

    init();

    // get key pressed
    document.onkeypress = function (event) {
        // Todo: number should be alphabat
        background.pause();
        playGame(event.key)
    }


    function init() {
        console.clear();
        console.log("initializing new game...");

        currentWord = randomWord();
        userWord = [];
        lettersUsed = [];
        //currentWordArray = currentWord.split(",");

        // Todo: cause exception - check
        log("init - currentWord length: " + currentWord.length);

        for (i = 0; i < currentWord.length; i++) {
            userWord.push('_');
        }

        currentGuess = 0;
        guessRemain = 5;
        //noWinner = true;
        foundLetter = false;
        displayStats();
        background.play();
    }


    function randomWord() {
        var random = Math.floor((Math.random() * words.length - 1) + 1);
        return words[random];
    }


    function displayStats() {
        document.getElementById("demo").innerHTML = "<h1>Word Guess Game</h1>";

        winsText.textContent = "Wins: " + wins;
        lossesText.textContent = "Loss: " + loss;
        allowedGuessesText.textContent = "Allowed Guesses: " + allowedGuesses;
        guessRemainText.textContent = "Guess Remaining: " + guessRemain;
        currentWordText.textContent = "Current Word: " + currentWord;
        userWordText.textContent = "User Word: " + userWord.join(" ");
        lettersUsedText.textContent = "Letters Used: " + lettersUsed.join("-");
        console.log("stats displayed");
    }


    function checkForWinner(letter) {
        log("checkforWinner");
        if (userWord.join("") == currentWord) {
            wins++;
            //noWinner = false;

            document.getElementById("successmmsg").innerHTML = smsg;
            setTimeout(function () {
                document.getElementById("successmmsg").innerHTML = '';
                init();
            }, 3000);
            //init();
        }
    }


    function checkForLoser(letter) {
        log("checkForLoser");
        var gameOver = document.createElement("audio");
        gameOver.setAttribute("src", "assets/sound/gameover.mp3")
        if (guessRemain === 0) {
            loss++;
            gameOver.play();
            document.getElementById("alarmmsg").innerHTML = lmsg;
            setTimeout(function () {
                document.getElementById("alarmmsg").innerHTML = '';
                init();
            }, 3000);
        }
        console.log("checkForLoser - guess remaining: " + guessRemain);
    }


    function playGame(letter) {
        log("playGame");
        var correctLetter = document.createElement("audio");
        var wrongLetter = document.createElement("audio");
        correctLetter.setAttribute("src", "assets/sound/correct.mp3")
        wrongLetter.setAttribute("src", "assets/sound/wrong.mp3");

        if (!lettersUsed.includes(letter)) {
            for (i = 0; i < currentWord.length; i++) {
                var wletter = currentWord[i];
                if (letter === wletter) {
                    foundLetter = true;
                    userWord.splice(i, 1, letter);
                }
            }
            if (foundLetter) {
                correctLetter.play();
                checkForWinner();
            }
            else {
                guessRemain--;
                checkForLoser(letter);
                wrongLetter.play();
            }
            lettersUsed.push(letter);
            console.log("playGame - letters used: " + lettersUsed.join(""));
            foundLetter = false;
        }
        else {
            console.log(letter + " letter already used");
        }

        displayStats();
    }

    function log(value) {
        console.log(value);
    }
})