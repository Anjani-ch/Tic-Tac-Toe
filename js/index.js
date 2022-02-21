const boardElement = document.querySelector('#board');
const outputElement = document.querySelector('#output');
const restartBtn = document.querySelector('#restart-btn');

const ctx = boardElement.getContext('2d');

const PLAYER_1 = 'x';
const PLAYER_2 = 'o';

const BOARD_COLOR = 'white';
const LINE_WIDTH = 4;

const human = PLAYER_1;
const ai = PLAYER_2;

const boardWidth = boardElement.width;
const boardHeight = boardElement.height;

const boardWidthSpaced = boardWidth / 3;
const boardHeightSpaced = boardHeight / 3;

let startingPlayer = human;

let currentPlayer;
let board = [
    [human, ai, human],
    [ai, human, ai],
    [human, ai, human]
];

const initNewGame = _ => {
    currentPlayer = startingPlayer;

    board = [
        [human, ai, human],
        [ai, human, ai],
        [human, ai, human]
    ];

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
            const x = boardWidthSpaced * cellIndex + boardWidthSpaced / 2;
            const y = boardHeightSpaced * rowIndex + boardHeightSpaced / 2;

            if(cell === PLAYER_1) {
                
            } else if(cell === PLAYER_2) {
                const radius = boardWidthSpaced / 3;
                const startAngle = 0;
                const endAngle = 2 * Math.PI;

                ctx.beginPath();
                ctx.arc(x, y, radius, startAngle, endAngle);
                ctx.stroke();
            }
        });
    });
}

const update = (board, ctx) => {
    ctx.clearRect(0, 0, boardWidth, boardHeight);

    ctx.fillStyle = BOARD_COLOR;
    ctx.lineWidth = LINE_WIDTH;

    drawBoard(board, ctx);
    drawBoardValues(board, ctx);

    requestAnimationFrame(() => update(board, ctx))
}

const handleBoardClick = e => {

}

window.addEventListener('DOMContentLoaded', () => {
    initNewGame();
    update(board, ctx);
});
boardElement.addEventListener('click', handleBoardClick);
restartBtn.addEventListener('click', initNewGame);