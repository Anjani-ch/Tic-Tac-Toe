// DOM Elements
const boardElement = document.querySelector('#board');
const outputElement = document.querySelector('#output');
const restartBtn = document.querySelector('#restart-btn');

// Canvas Context
const ctx = boardElement.getContext('2d');

const BOARD_SIZE = 450;

const PLAYER_1 = 'x';
const PLAYER_2 = 'o';

const BOARD_COLOR = 'white';
const LINE_WIDTH = 4;

const SPACE_COUNT = 3;

const human = PLAYER_1;
const ai = PLAYER_2;

let startingPlayer = human;

let currentPlayer;
let board;

let boardWidth;
let boardHeight;

let boardWidthSpaced;
let boardHeightSpaced;

const initNewGame = _ => {
    // Set Up Canvas Element
    boardElement.width = BOARD_SIZE;
    boardElement.height = BOARD_SIZE;

    // Set Up Canvas Variables
    boardWidth = boardElement.width;
    boardHeight = boardElement.height;

    boardWidthSpaced = boardWidth / SPACE_COUNT;
    boardHeightSpaced = boardHeight / SPACE_COUNT;

    ctx.fillStyle = BOARD_COLOR;
    ctx.lineWidth = LINE_WIDTH;

    // Game Variables
    currentPlayer = startingPlayer;

    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    // board = [
    //     [human, ai, human],
    //     [ai, human, ai],
    //     [human, ai, human]
    // ];

    // Hide DOM Feedback Elements
    outputElement.classList.add('hidden');
    restartBtn.classList.add('hidden');
}

const drawBoard = (board, ctx) => {
    // Horizontal Lines
    for(let i = 1; i < board.length; i++) {
        ctx.beginPath(); 
        ctx.moveTo(0, boardHeightSpaced * i);
        ctx.lineTo(boardWidth, boardHeightSpaced * i);
        ctx.stroke();
    }

    // Horizontal Lines
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
                // First Line
                ctx.moveTo(x - radius, y - radius);
                ctx.lineTo(x + radius, y + radius);
                // Second Line
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

const swapCurrentPlayer = _ => {
    if(currentPlayer === PLAYER_1) currentPlayer = PLAYER_2;
    else if(currentPlayer === PLAYER_2) currentPlayer = PLAYER_1;
}

const handleBoardClick = e => {
    const rowIndex = Math.floor(e.offsetY / boardHeightSpaced);
    const colIndex = Math.floor(e.offsetX / boardWidthSpaced);

    board[rowIndex][colIndex] = currentPlayer;

    drawBoardValues(board, ctx);
    swapCurrentPlayer();
}

window.addEventListener('DOMContentLoaded', e => {
    initNewGame();
    drawBoard(board, ctx);
});
boardElement.addEventListener('click', handleBoardClick);
restartBtn.addEventListener('click', initNewGame);