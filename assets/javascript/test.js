function myFunction() {
    var userChoiceText = document.getElementById("userchoice-text");
    var x = document.getElementById("stats");

    //x.style.display === "none";
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    console.log(x.style.display);
    document.onkeyup = function (event) {
        var userPress = event.key;
        userChoiceText.textContent = "You chose: " + userPress;
        //console.log(event);
        console.log(userPress);

        x.style.display = "block";
    }

    document.getElementById("demo").innerHTML = "<h1>Word Guess Game</h1>";

}


function init() {
    x.style.display = "block";

}


function displayStats() {

}