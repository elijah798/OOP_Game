/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
function Game() {
    this.missed = 0;
    this.phrases = [];
    this.activePhrase = null;

    this.startGame = function() {
        document.getElementById("overlay").style.display = "none";

        this.createPhrase();
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    };

    this.getRandomPhrase = function() {
        const numb = Math.floor(Math.random() * 5);
        let randomphrase = this.phrases[numb];
        return randomphrase;
    };
    this.createPhrase = function() {
        let newPhrase1 = new Phrase("Famous Last Words");
        this.phrases.push(newPhrase1);
        let newPhrase2 = new Phrase("A Diamond in the Rough");
        this.phrases.push(newPhrase2);
        let newPhrase3 = new Phrase("A different Kettle of Fish");
        this.phrases.push(newPhrase3);
        let newPhrase4 = new Phrase("Fair and Square");
        this.phrases.push(newPhrase4);
        let newPhrase5 = new Phrase("Fancy Pants");
        this.phrases.push(newPhrase5);
    };
    //function that handles interaction with keypad.
    this.handleInteraction = function() {
        const keypad = document.getElementById("qwerty");
        const buttonpress = keypad.addEventListener("click", (e) => {
            //Checks to see if clicked target is a key
            if (e.target.className == "key") {
                //removes life if incorrect and checks if game is over.
                if (this.activePhrase.checkLetter(e.target.textContent) == false) {
                    this.activePhrase.showMatchedLetter(e.target.textContent, e.target);
                    e.target.className = "wrong";
                    e.target.disabled = true;
                    this.removeLife();

                }
                //checks if letter selected is correct.
                if (
                    this.activePhrase.checkLetter(e.target.textContent) == true &&
                    this.missed < 5
                ) {
                    this.activePhrase.showMatchedLetter(e.target.textContent, e.target);
                    e.target.classList.add("chosen");
                }
                if (this.checkForWin() == false) {
                    this.gameOver('lose');
                } else if (this.checkForWin() == true) {
                    this.gameOver('win');
                }

            }
        });


    };
    //function to remove life from player if letter chosen is incorrect.
    this.removeLife = function() {
        this.missed += 1;

        const life = document.getElementsByTagName("img");
        // changes the image to images/lostheart.png
        for (let i = 0; i <= this.missed - 1; i++) {
            life[i].src = "images/lostHeart.png";
        }
        if (this.checkForWin() == false) {
            this.gameOver('lose');
        } else if (this.checkForWin() == true) {
            this.gameOver('win');
        }
    };
    //function that checks if player won.
    this.checkForWin = function() {
        //checking for win
        //declared variable to add how many of the phrases characters were correct
        let sum = 0;
        let spaces = 0;
        const liElements = document.getElementById("phraseUL").children;
        Array.from(liElements).forEach((element) => {
            if (element.classList.contains("show") == true) {
                sum++;
            }
            if (element.classList.contains("space") == true) {
                spaces++;
            }
        });
        //checks if length of phrase corresponds to the amount added in the sum variable.
        if (sum == liElements.length - spaces && this.missed < 5) {
            sum = 0;
            return true;
        } else if (this.missed == 5) {
            return false;
            sum = 0;
        }
    };
    //gameover function. finishes the game and displays a winning or losing screen depending on outcome of game.
    this.gameOver = function(winloss) {
        const liElements = document.getElementById("phraseUL").children;
        const qwerty = document.getElementById("qwerty");
        const keys = document.getElementsByClassName("keyrow");

        //removes hidden phrase
        Array.from(liElements).forEach((element) => {
            element.parentElement.removeChild(element);
        });

        //remove class names on keypad
        for (let i = 0; i < keys.length; i++) {
            Array.from(keys[i].children).forEach((element) => {
                element.classList.remove("chosen");
                element.classList.remove("wrong");
                element.classList.add("key");
                element.disabled = false;
            });
        }

        const life = document.getElementsByTagName("img");
        //changes lives back to images/liveHeart.png
        for (let i = 0; i <= life.length - 1; i++) {
            life[i].src = "images/liveHeart.png";
        }

        document.getElementById("overlay").style.display = "";
        document.getElementById("overlay").className = "";
        document.getElementById("game-over-message").textContent = "";
        //if win overlay displays winning message changes class of overlay to win
        if (winloss == "win") {
            document.getElementById("overlay").className = "win";
            document.getElementById("game-over-message").textContent = "You win";
            this.missed = 0;
            this.activePhrase = "";
            //if lost overlay display losing message. changes class of overlay to lose
        } else if (winloss == "lose") {
            this.missed = 0;
            this.activePhrase = "";
            document.getElementById("overlay").className = "lose";
            document.getElementById("game-over-message").textContent = "You Lost";
        }
    };
}