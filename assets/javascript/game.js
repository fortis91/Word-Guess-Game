
$(document).ready(function () {
    var words = ["hawks", "sox", "bears", "bulls", "fire", "cubs"];
    var currentWord;

    var userWord = [];
    var lettersUsed = [];

    var allowedGuesses = 10;
    var guessRemain = 10;

    var foundLetter = false;
    var wins = 0;
    var loss = 0;

    var smsg = "winner winner chicken dinner";
    var lmsg = "Sorry, game over try again";

    var background = document.createElement("audio");
    background.setAttribute("src", "assets/sound/bensound-ukulele.mp3")

    //background music https://www.bensound.com/
    //button sounds https://www.soundjay.com/button-sounds-1.html

    // Create variables that hold references to the places in the HTML where we want to display things.
    var winsText = document.getElementById("wins-text");
    var lossesText = document.getElementById("losses-text");
    // var currentWordText = document.getElementById("current-word-text");
    // var allowedGuessesText = document.getElementById("allowed-guesses-text");
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
        log("initializing new game...");

        currentWord = randomWord();
        userWord = [];
        lettersUsed = [];

        // Todo: cause exception - check
        log("currentWord: " + currentWord);
        for (i = 0; i < currentWord.length; i++) {
            userWord.push('_');
        }

        guessRemain = 10;
        foundLetter = false;
        displayStats();
        //background.play();
    }


    function randomWord() {
        var random = Math.floor((Math.random() * words.length - 1) + 1);
        return words[random];
    }


    function displayStats() {
        document.getElementById("demo").innerHTML = "<h1>Word Guess Game</h1> <br> Chicago Sports Teams Edition";

        winsText.textContent = "Wins: " + wins;
        lossesText.textContent = "Loss: " + loss;
        // allowedGuessesText.textContent = "Allowed Guesses: " + allowedGuesses;
        guessRemainText.textContent = "Guess Remaining: " + guessRemain;
        // currentWordText.textContent = "Current Word: " + currentWord.toUpperCase();
        userWordText.textContent = "Current Word: " + userWord.join(" ").toUpperCase();
        lettersUsedText.textContent = "Letters Aready Guessed: " + lettersUsed.join(",").toUpperCase();
    }


    function checkForWinner(letter) {
        if (userWord.join("") == currentWord) {
            wins++;
            log("winner")
            
            document.getElementById("successmmsg").innerHTML = smsg;
            setTimeout(function () {
                document.getElementById("successmmsg").innerHTML = '';
                init();
            }, 3000);
        }
    }


    function checkForLoser(letter) {
        var gameOver = document.createElement("audio");
        gameOver.setAttribute("src", "assets/sound/gameover.mp3")
        if (guessRemain === 0) {
            loss++;
            gameOver.play();
            // userWord = currentWord;

            document.getElementById("alarmmsg").innerHTML = lmsg;
            // currentWordText.textContent = "Current Word: " + currentWord.toUpperCase();
            setTimeout(function () {
                document.getElementById("alarmmsg").innerHTML = '';
                init();
            }, 3000);
        }
    }


    function playGame(letter) {
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
            foundLetter = false;
        }
        displayStats();
    }


    function log(value) {
        console.log(value);
    }
})