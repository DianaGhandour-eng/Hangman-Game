const hungmanImage = document.querySelector(".hungman-box img");
const keyboardDiv = document.querySelector(".keyboard");
const guessText = document.querySelector(".guesses-text b");
const wordDisplay = document.querySelector(".word-display");
const gameModel = document.querySelector(".game-modal");
const playAgain = document.querySelector(".play-again");
let currentWord, corectLetter, wrongGussCount;
const maxGuess = 6;

const resetGame = () => {
  //reseting all game variables and ui elements
  corectLetter = [];
  wrongGussCount = 0;
  hungmanImage.src = `images/hangman-${wrongGussCount}.svg`;
  guessText.innerText = `${wrongGussCount} / ${maxGuess}`;
  keyboardDiv
    .querySelectorAll("button")
    .forEach((btn) => (btn.disabled = false));
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  gameModel.classList.remove("show");
};
const getRandomWord = () => {
  //select random word and hint from the world list
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  document.querySelector(".hint-text b").innerText = hint;
  resetGame();
};
const gameOver = (isVictory) => {
  //after 600ms of game complete ..showing model with relevent deatils
  setTimeout(() => {
    const ModelText = isVictory
      ? `You Found The Word:`
      : "The Correct Word Was:";
    gameModel.querySelector("img").src = `images/${
      isVictory ? "victory" : "lost"
    }.gif`;
    gameModel.querySelector("h4").innerText = `${
      isVictory ? "Congrats!" : "GameOver!"
    }`;
    gameModel.querySelector(
      "p"
    ).innerHTML = `${ModelText}<b>${currentWord}</b>`;
    gameModel.classList.add("show");
  }, 300);
};
const initGame = (button, clickedLetter) => {
  //check if clickedletter is exist to currentword
  if (currentWord.includes(clickedLetter)) {
    //showing al lcorrect letter on the word display
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        corectLetter.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    //if click letter dosnot exist then update wrongGussCoun and svg hungman
    wrongGussCount++;
    hungmanImage.src = `images/hangman-${wrongGussCount}.svg`;
  }
  button.disabled = true;
  guessText.innerText = `${wrongGussCount} / ${maxGuess}`;
  // calling  gameover function if any of these condtional meet
  if (wrongGussCount === maxGuess) return gameOver(false);
  if (corectLetter.length === currentWord.length) return gameOver(true);
};
//creating keyboard button and adding event listner.
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}
getRandomWord();
playAgain.addEventListener("click", getRandomWord);
