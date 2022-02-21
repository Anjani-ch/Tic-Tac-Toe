// DOM elements
const boardElement = document.querySelector('#board');
const outputElement = document.querySelector('#output');
const restartBtn = document.querySelector('#restart-btn');

// Canvas context
const ctx = boardElement.getContext('2d');

const BOARD_SIZE = 450;

const PLAYER_1 = 'X';
const PLAYER_2 = 'O';

const BOARD_COLOR = 'white';
const LINE_WIDTH = 4;

const SPACE_COUNT = 3;

const human = PLAYER_1;
const ai = PLAYER_2;

const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

let boardWidth;
let boardHeight;

let boardWidthSpaced;
let boardHeightSpaced;

let isPlaying;
let currentPlayer;

let startingPlayer = human;

const initNewGame = _ => {
    // Set Up Canvas Element
    boardElement.width = BOARD_SIZE;
    boardElement.height = BOARD_SIZE;

    // Initialize canvas variables
    boardWidth = boardElement.width;
    boardHeight = boardElement.height;

    boardWidthSpaced = boardWidth / SPACE_COUNT;
    boardHeightSpaced = boardHeight / SPACE_COUNT;

    ctx.fillStyle = BOARD_COLOR;
    ctx.lineWidth = LINE_WIDTH;

    // Initialize game variables
    isPlaying = true;
    currentPlayer = startingPlayer;
    
    // Reset board
    for(let rowIndex = 0; rowIndex < 3; rowIndex++) {
        for(let colIndex = 0; colIndex < 3; colIndex++) {
            board[rowIndex][colIndex] = '';
        }
    }

    // Hide DOM feedback elements
    outputElement.classList.add('hidden');
    restartBtn.classList.add('hidden');
}

const terminateGame = msg => {
    // Show DOM feedback elements
    outputElement.classList.remove('hidden');
    restartBtn.classList.remove('hidden');

    // Announce winner
    outputElement.innerText = msg;

    // Stop Game
    isPlaying = false;
}

const swapCurrentPlayer = _ => {
    if(currentPlayer === PLAYER_1) currentPlayer = PLAYER_2;
    else if(currentPlayer === PLAYER_2) currentPlayer = PLAYER_1;
}

const makePlayerMove = (board, { rowIndex, colIndex }) => {
    if(isPlaying) {
        const isCellEmpty = !board[rowIndex][colIndex];

        if(isCellEmpty) {
            board[rowIndex][colIndex] = currentPlayer;

            checkResult(board, currentPlayer);
            swapCurrentPlayer();
            makeAiMove(board);
        }
    }
}

const makeAiMove = board => {
    if(isPlaying) {
        let randomIndexes;

        while(!randomIndexes) {
            const randomRowIndex = Math.round(Math.random() * (board.length - 1));
            const randomColIndex = Math.round(Math.random() * (board.length - 1));

            const isCellEmpty = !board[randomRowIndex][randomColIndex];

            if(isCellEmpty) randomIndexes = { rowIndex: randomRowIndex, colIndex: randomColIndex };
        }

        board[randomIndexes.rowIndex][randomIndexes.colIndex] = currentPlayer;

        checkResult(board, currentPlayer);
        swapCurrentPlayer();
    }
}

const isConditionMet = (cell1, cell2, cell3) => cell1 == cell2 && cell2 == cell3 && cell1 != '';

// Win conditions
const isHorizontalWin = board => {
    for (let i = 0; i < board.length; i++) {
        const cell1 = board[i][0];
        const cell2 = board[i][1];
        const cell3 = board[i][2];

        if (isConditionMet(cell1, cell2, cell3)) return true;
    }
}

const isVerticalWin = board => {
    for (let i = 0; i < board.length; i++) {
        const cell1 = board[0][i];
        const cell2 = board[1][i];
        const cell3 = board[2][i];

        if (isConditionMet(cell1, cell2, cell3)) return true;
      }
}

const isDiagonalWin = board => {
    let result;

    let cell1;
    let cell2;
    let cell3;

    // Left diagonal
    cell1 = board[0][0];
    cell2 = board[1][1];
    cell3 = board[2][2];

    if (isConditionMet(cell1, cell2, cell3)) result = true;

    // Right diagonal
    cell1 = board[2][0];
    cell2 = board[1][1];
    cell3 = board[0][2];

    if (isConditionMet(cell1, cell2, cell3)) result = true;

    return result;
}

const checkResult = (board, player) => {
    const isWin = isHorizontalWin(board) || isVerticalWin(board) || isDiagonalWin(board);

    const tempBoard = [];

    let isDraw;

    // Add row to temp array
    board.forEach(row => {
        row.forEach(cell => tempBoard.push(cell));
    });

    isDraw = tempBoard.every(cell => cell); // Return if all cells are filles

    if(isWin) terminateGame(`${player}' Wins`);
    else if(isDraw) terminateGame(`It's A Draw`);
}

const drawBoard = (board, ctx) => {
    // Horizontal lines
    for(let i = 1; i < board.length; i++) {
        ctx.beginPath(); 
        ctx.moveTo(0, boardHeightSpaced * i);
        ctx.lineTo(boardWidth, boardHeightSpaced * i);
        ctx.stroke();
    }

    // Horizontal lines
    for(let i = 1; i < board.length; i++) {
        ctx.beginPath(); 
        ctx.moveTo(boardWidthSpaced * i, 0);
        ctx.lineTo(boardWidthSpaced * i, boardHeight);
        ctx.stroke();
    }
}

const drawBoardValues = (board, ctx) => {
    board.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            const x = (boardWidthSpaced * cellIndex) + boardWidthSpaced / 2;
            const y = (boardHeightSpaced * rowIndex) + boardHeightSpaced / 2;

            const radius = boardWidthSpaced / 3;

            if(cell === PLAYER_1) {
                ctx.beginPath();
                // First line
                ctx.moveTo(x - radius, y - radius);
                ctx.lineTo(x + radius, y + radius);
                // Second line
                ctx.moveTo(x + radius, y - radius);
                ctx.lineTo(x - radius, y + radius);
                ctx.stroke();
            } else if(cell === PLAYER_2) {
                const startAngle = 0;
                const endAngle = Math.PI * 2;

                ctx.beginPath();
                ctx.arc(x, y, radius, startAngle, endAngle);
                ctx.stroke();
            }
        });
    });
}

const update = (board, ctx) => {
    // Clear canvas before update
    ctx.clearRect(0, 0, boardWidth, boardHeight);

    drawBoard(board, ctx);
    drawBoardValues(board, ctx);

    requestAnimationFrame(() => update(board, ctx));
}

const handleBoardClick = (e, board) => {
    const rowIndex = Math.floor(e.offsetY / boardHeightSpaced);
    const colIndex = Math.floor(e.offsetX / boardWidthSpaced);

    makePlayerMove(board, { rowIndex,colIndex });
}

window.addEventListener('DOMContentLoaded', e => {
    initNewGame();
    update(board, ctx);
});

boardElement.addEventListener('click', e => handleBoardClick(e, board));
restartBtn.addEventListener('click', initNewGame);