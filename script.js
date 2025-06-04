// Todos:
// 1. Create settings menu, where you can chose guessing ranges.
// 2. Mobile responsiveness

let randomNumber;
let gameEnded = false;
let minNum = 1,
  maxNum = 20;

const againButton = document.querySelector('.main-header button');
const checkButton = document.querySelector('button[type="submit"]');

const answerField = document.querySelector('.answer-field');
const guessInput = document.getElementById('guess');

const gameInfo = document.querySelector('.game-info');
const currentScore = document.querySelector('.current-score');
const highscore = document.querySelector('.highscore');

function generateRandomNumber() {
  randomNumber = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

function initiateRestart() {
  gameEnded = false;
  generateRandomNumber();

  if (document.body.classList.contains('win-bg')) {
    document.body.classList.toggle('win-bg');
  } else if (document.body.classList.contains('lose-bg')) {
    document.body.classList.toggle('lose-bg');
  }

  answerField.innerText = '?';
  gameInfo.innerText = 'Start guessing...';

  updateScore(20);
}

function initiateWin() {
  gameEnded = true;
  gameInfo.innerText = '🎉 Correct Number!';
  document.body.classList.toggle('win-bg');
  answerField.innerText = String(randomNumber);
  updateHighscore();
}

function initiateLose() {
  gameEnded = true;
  gameInfo.innerText = '💥 You lost the game!';
  document.body.classList.toggle('lose-bg');
  answerField.innerText = String(randomNumber);
}

function getScore() {
  return Number(currentScore.innerText.split(' ')[2]);
}

function getHighscore() {
  return Number(highscore.innerText.split(' ')[2]);
}

function updateHighscore() {
  highscore.innerText = `🥇 Highscore: ${Math.max(getScore(), getHighscore())}`;
}

function updateScore(score) {
  currentScore.innerText = `💯 Score: ${score}`;
}

function checkUserInput() {
  const value = guessInput.value;

  if (value === '') {
    gameInfo.innerText = '⛔️ No number!';
    return;
  }

  let score = getScore();

  if (score > 1) {
    if (value > randomNumber) {
      gameInfo.innerText = '📈 Too high!';
    } else if (value < randomNumber) {
      gameInfo.innerText = '📉 Too low!';
    } else {
      initiateWin();
      return;
    }
    updateScore(--score);
  } else {
    updateScore(--score);
    initiateLose();
  }
}

againButton.addEventListener('click', initiateRestart);

checkButton.addEventListener('click', function (e) {
  e.preventDefault();

  if (randomNumber === undefined) {
    generateRandomNumber();
  } else if (gameEnded) {
    return;
  }
  checkUserInput();
});

console.log(getScore());
