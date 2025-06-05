// Todos:
// 1. Create settings menu, where you can chose guessing ranges.
// 2. Mobile responsiveness
// 3. Save the highscore to the local storage

let minNum = 1,
  maxNum = 20;

let randomNumber;
let gameEnded = false;

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
  guessInput.value = '';

  updateScore(20);
}

function initiateWin() {
  gameEnded = true;
  gameInfo.innerText = '🎉 Correct Number!';
  document.body.classList.toggle('win-bg');
  answerField.innerText = randomNumber;
  updateHighscore();
}

function initiateLoss() {
  gameEnded = true;
  gameInfo.innerText = '💥 You lost the game!';
  document.body.classList.toggle('lose-bg');
  answerField.innerText = randomNumber;
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
  let value = guessInput.value;

  if (value === '') {
    gameInfo.innerText = '⛔️ No number!';
    return;
  }

  value = Number(value);
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
    initiateLoss();
  }
}

generateRandomNumber();

againButton.addEventListener('click', initiateRestart);

checkButton.addEventListener('click', function (e) {
  e.preventDefault();

  if (gameEnded) {
    return;
  }
  checkUserInput();
});
