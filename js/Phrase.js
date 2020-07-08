/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }
  //function to display the phrase on screen.
  addPhraseToDisplay() {
    const contain = document.getElementById("phraseUL");
    for (let i = 0; i < this.phrase.length; i++) {
      if (this.phrase[i] == " ") {
        //creates li element for spaces and adds classes.
        let newLi = document.createElement("li");
        newLi.className = "space";
        contain.appendChild(newLi);
      } else {
        //creates new li Elements for each character of phrase.
        let newLi = document.createElement("li");
        newLi.textContent = this.phrase[i];
        newLi.className = "hide letter " + this.phrase[i];
        contain.appendChild(newLi);
      }
    }
  }
  //function that checks if the letter is inside phrase
  checkLetter(letter) {
    for (let i = 0; i < this.phrase.length; i++) {
      if (letter === this.phrase[i]) {
        return true;
      }
    }
    return false;
  }

  //function to display the letter if it is correctly chosen.
  showMatchedLetter(letter, target) {
    let selectedLetter = letter;
    const liElements = document.getElementById("phraseUL").children;
    for (let i = 0; i < this.phrase.length; i++) {
      if (this.checkLetter(selectedLetter) == true) {
        if (this.phrase[i] == selectedLetter) {
          //adds classes to key and letter of correct letter chosen
          liElements[i].classList.add("show");
          liElements[i].classList.remove("hide");
          target.classList.add("chosen");
          liElements[i].textContent = selectedLetter;
        }
        //adds classes to key if incorrect letter is chosen
      } else if (this.checkLetter(selectedLetter) == false) {
        if (target.tagName.toLowerCase() === "button") {
          target.className = "wrong";
          target.disabled = true;
        }
      }
    }
  }
}

//use classlist.contains('show');
