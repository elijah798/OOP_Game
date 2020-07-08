/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const strtGame = document.getElementById("btn__reset");

console.log(strtGame);
document.addEventListener("click", (e) => {
  //starts  game wheneber strtGame button is clicked.
  if (e.target == strtGame) {
    //creates new Game Object
    let game = new Game();
    //starts the game by initiating startGame function
    game.startGame();
    //checks interaction with game.
    game.handleInteraction();
    //resets overlay before game is over.
    document.getElementById("overlay").className = "";
    document.getElementById("overlay").children[1].textContent = "";
  }
});
