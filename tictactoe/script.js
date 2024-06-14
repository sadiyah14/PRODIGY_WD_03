const gameBoard = document.getElementById('game-board');
const statusMessage = document.getElementById('status-message');
const restartButton = document.getElementById('restart-button');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.style.color = currentPlayer === 'X' ? '#2196F3' : '#F44336';

    if (checkWin()) {
        gameActive = false;
        statusMessage.textContent = `${currentPlayer} has won! 🎉`;
        return;
    }

    if (!gameState.includes('')) {
        gameActive = false;
        statusMessage.textContent = `It's a tie!`;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function handleRestartButtonClick() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;

    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });
}

gameBoard.addEventListener('click', handleCellClick);
restartButton.addEventListener('click', handleRestartButtonClick);
