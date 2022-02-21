const boardElement = document.querySelector('#board');
const outputElement = document.querySelector('#output');
const restartBtn = document.querySelector('#restart-btn');

const PLAYER_1 = 'x';
const PLAYER_2 = 'o';

let currentPlayer;
let isPlaying;
let board;

const changeOutput = text => outputElement.innerText = text;

const initNewGame = _ => {
    const spots = Array.from(document.querySelectorAll('.spot'));

    currentPlayer = PLAYER_1;
    isPlaying = true;

    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    // Reset spots
    spots.forEach(spot => {
        spot.classList.add('empty');
        spot.classList.remove(PLAYER_1);
        spot.classList.remove(PLAYER_2);
    });

    outputElement.classList.add('hidden');
    restartBtn.classList.add('hidden');
}

const makePlayerMove = spot => {
    spot.classList.remove('empty');
    spot.classList.add(currentPlayer);
}

const makeAiMove = _ => {
    const spots = Array.from(document.querySelectorAll('.spot'));

    for(let i = 0; i < 100; i++) {
        const randomIndex = Math.round(Math.random() * (spots.length - 1));

        const spot = spots[randomIndex];
        const isEmpty = spot.classList.contains('empty');

        if(isEmpty) {
            spot.classList.remove('empty');
            spot.classList.add(currentPlayer);
            break;
        }
    }
}

const swapTurns = _ => {
    const isPlayer1 = currentPlayer === PLAYER_1;
    const isPlayer2 = currentPlayer === PLAYER_2;

    if(isPlayer1) currentPlayer = PLAYER_2;
    if(isPlayer2) currentPlayer = PLAYER_1;
}


const mapBoard = _ => {
    const spots = Array.from(document.querySelectorAll('.spot'));

    spots.forEach(spot => {
        const rowIndex = parseInt(spot.getAttribute('data-row'), 10);
        const colIndex = parseInt(spot.getAttribute('data-col'), 10);

        const isPlayer1Value = spot.classList.contains(PLAYER_1);
        const isPlayer2Value = spot.classList.contains(PLAYER_2);

        if(isPlayer1Value) board[rowIndex][colIndex] = PLAYER_1;
        if(isPlayer2Value) board[rowIndex][colIndex] = PLAYER_2;
    });
}

const handleBoardClick = e => {
    const spot = e.target;
    const isSpot = spot.classList.contains('spot');

    if(isSpot) {
        const isEmpty = spot.classList.contains('empty');

        if(isEmpty) {
            if(isPlaying) {
                makePlayerMove(spot);
                mapBoard();
                checkWin();
                swapTurns();
            }

            if(isPlaying) {
                makeAiMove();
                mapBoard();
                checkWin();
                swapTurns();
            }
        }
    }
}

const isWinConditionMet = (spot1, spot2, spot3) => spot1 == spot2 && spot2 == spot3 && spot1 !== '';

const isHorizontalWin = _ => {
    for (let i = 0; i < 3; i++) if (isWinConditionMet(board[i][0], board[i][1], board[i][2])) return true;
}

const isVerticalWin = _ => {
    for (let i = 0; i < 3; i++) if (isWinConditionMet(board[0][i], board[1][i], board[2][i])) return true;
}

const isDiagonalWin = _ => {
    let result = false;

    if (isWinConditionMet(board[0][0], board[1][1], board[2][2])) result = true;
    if (isWinConditionMet(board[2][0], board[1][1], board[0][2])) result = true;

    return result;
}

const checkWin = _ => {
    const spots = Array.from(document.querySelectorAll('.spot'));

    const isDraw = spots.every(spot => !spot.classList.contains('empty')); // Check if no spots are empty

    let isWin = false;

    isWin = isHorizontalWin() || isVerticalWin() || isDiagonalWin();

    if(isWin || isDraw) {
        isPlaying = false;

        if(isWin) changeOutput(`${currentPlayer.toUpperCase()}' Wins`);
        else if(isDraw) changeOutput("It's A Draw");

        outputElement.classList.remove('hidden');
        restartBtn.classList.remove('hidden');
    }
}

window.addEventListener('DOMContentLoaded', initNewGame);
boardElement.addEventListener('click', handleBoardClick);
restartBtn.addEventListener('click', initNewGame);