// 获取 DOM 元素
const btnEasy = document.querySelector('#btn-easy');
const btnMedium = document.querySelector('#btn-medium');
const btnHard = document.querySelector('#btn-hard');
const btnSubmit = document.querySelector('#btn-submit');
const btnNewGame = document.querySelector('#btn-new-game');
const guessInput = document.querySelector('#guess');
const message = document.querySelector('#message');
const attempts = document.querySelector('#attempts');
const warning = document.querySelector('#warning');
const gameSection = document.querySelector('#game-section');

// 初始化游戏参数
let randomNumber;
let maxNumber;
let totalAttempts = 0;

// 绑定事件
btnEasy.addEventListener('click', startGame);
btnMedium.addEventListener('click', startGame);
btnHard.addEventListener('click', startGame);
btnSubmit.addEventListener('click', checkGuess);
guessInput.addEventListener('input', validateInput);
btnNewGame.addEventListener('click', confirmRestart);

// 函数定义
function startGame(event) {
    switch (event.target.id) {
        case 'btn-easy':
            maxNumber = 10;
            break;
        case 'btn-medium':
            maxNumber = 50;
            break;
        case 'btn-hard':
            maxNumber = 100;
            break;
    }

    // 更新游戏参数
    randomNumber = Math.floor(Math.random() * (maxNumber + 1));
    totalAttempts = 0;

    // 更新 DOM
    guessInput.value = '';
    attempts.textContent = '';
    warning.textContent = '';
    message.textContent = '';
    gameSection.classList.add('game-on');
    btnSubmit.removeAttribute('disabled');
    guessInput.removeAttribute('disabled');
}

function confirmRestart() {
    if (confirm('确定要开始新游戏吗？')) {
        gameSection.classList.remove('game-on');
    }
}

function validateInput() {
    guessInput.setCustomValidity('');
    if (!guessInput.checkValidity()) {
        guessInput.setCustomValidity('请输入一个有效的数字！');
    }
}

function checkGuess() {
    let guess = parseInt(guessInput.value);
    if (isNaN(guess)) {
        warning.textContent = '请输入一个有效的数字！';
        return;
    }
    if (guess < 0 || guess > maxNumber) {
        warning.textContent = '请输入一个 ' + maxNumber + ' 以内的数字！';
        return;
    }
    totalAttempts++;
    attempts.textContent = '你已经猜测了 ' + totalAttempts + ' 次。';
    if (guess === randomNumber) {
        message.textContent = '恭喜你，猜对了！正确答案是 ' + randomNumber + '。';
        btnSubmit.setAttribute('disabled', true);
        guessInput.setAttribute('disabled', true);
    } else if (guess < randomNumber) {
        message.textContent = '猜小了，请再试一次。';
    } else {
        message.textContent = '猜大了，请再试一次。';
    }
}