const chessboardEl = document.querySelector('.chessboard');
// 定义棋盘大小及棋子大小
const boardSize = 15;
const chessSize = 30;
// 游戏数据，记录棋子位置及玩家回合
const gameData = {
    player: 1,
    board: [],
    result: null
};

// 初始化游戏数据和棋盘
function init() {
    const board = Array.from({ length: boardSize }, () => Array.from({ length: boardSize }, () => 0));
    gameData.board = board;
    gameData.result = null;
    renderChessboard();
}

// 渲染棋盘
function renderChessboard() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const el = document.createElement('div');
            el.className = 'chess';
            el.style.left = (i * chessSize + chessSize) + 'px';
            el.style.top = (j * chessSize + chessSize) + 'px';
            el.dataset.x = i.toString();
            el.dataset.y = j.toString();
            chessboardEl.appendChild(el);
        }
    }
}

// 处理点击事件，下棋并判断胜负
function handleClick(event) {
    const target = event.target;
    if (target.classList.contains('chess')) {
        const x = parseInt(target.dataset.x);
        const y = parseInt(target.dataset.y);
        if (gameData.board[x][y] === 0) {
            target.classList.add('opacity');
            const player = gameData.player;
            gameData.board[x][y] = player;
            gameData.player = 3 - player;
            const result = checkWin(x, y);
            if (result) {
                gameData.result = player;
                alert(`玩家 ${player} 获胜！`);
            }
        }
    }
}

// 判断胜负
function checkWin(x, y) {
    const player = gameData.board[x][y];
    let count;
    // 判断横向是否连成五子
    count = 1;
    for (let i = x - 1; i >= 0 && gameData.board[i][y] === player; i--) {
        count++;
    }
    for (let i = x + 1; i < boardSize && gameData.board[i][y] === player; i++) {
        count++;
    }
    if (count >= 5) {
        return true;
    }
    // 判断纵向是否连成五子
    count = 1;
    for (let i = y - 1; i >= 0 && gameData.board[x][i] === player; i--) {
        count++;
    }
    for (let i = y + 1; i < boardSize && gameData.board[x][i] === player; i++) {
        count++;
    }
    if (count >= 5) {
        return true;
    }
    // 判断左上到右下是否连成五子
    count = 1;
    for (let i = x - 1, j = y - 1; i >= 0 && j >= 0 && gameData.board[i][j] === player; i--, j--) {
        count++;
    }
    for (let i = x + 1, j = y + 1; i < boardSize && j < boardSize && gameData.board[i][j] === player; i++, j++) {
        count++;
    }
    if (count >= 5) {
        return true;
    }
    // 判断左下到右上是否连成五子
    count = 1;
    for (let i = x - 1, j = y + 1; i >= 0 && j < boardSize && gameData.board[i][j] === player; i--, j++) {
        count++;
    }
    for (let i = x + 1, j = y - 1; i < boardSize && j >= 0 && gameData.board[i][j] === player; i++, j--) {
        count++;
    }
    if (count >= 5) {
        return true;
    }
    return false;
}

// 初始化游戏
init();
// 监听点击事件
chessboardEl.addEventListener('click', handleClick);
