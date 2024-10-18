const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const popupResetButton = document.getElementById('popup-resetButton');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let isGameOver = false;

 
const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6] 
];


function makeMove(index) {
    if (!isGameOver && cells[index].textContent === '') {
        cells[index].textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            popupMessage.textContent = `Player ${currentPlayer} wins!`;
            popup.style.display = 'flex'; 
            isGameOver = true;
        } else if (checkTie()) {
            popupMessage.textContent = "It's a tie!";
            popup.style.display = 'flex'; 
            isGameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O' && !isGameOver) {
                
                setTimeout(computerMove, 500);
            }
        }
    }
}


function checkWin(player) {
    return winCombos.some(combo => {
        const [a, b, c] = combo;
        return cells[a].textContent === player && cells[b].textContent === player && cells[c].textContent === player;
    });
}


function checkTie() {
    return [...cells].every(cell => cell.textContent !== '');
}


function computerMove() {
    if (!isGameOver) {
        let bestMove = findBestMove();
        makeMove(bestMove);
    }
}


function findBestMove() {
    
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent === '') {
            cells[i].textContent = currentPlayer;
            if (checkWin(currentPlayer)) {
                cells[i].textContent = '';
                return i;
            }
            cells[i].textContent = '';
        }
    }

   
    const opponent = currentPlayer === 'X' ? 'O' : 'X';
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent === '') {
            cells[i].textContent = opponent;
            if (checkWin(opponent)) {
                cells[i].textContent = '';
                return i;
            }
            cells[i].textContent = '';
        }
    }

    
    let emptyCells = [...cells].filter(cell => cell.textContent === '');
    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        return [...cells].indexOf(emptyCells[randomIndex]);
    }

    return -1; 
}


resetButton.addEventListener('click', resetBoard);




function resetBoard() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning-cell');
    });
    popupMessage.textContent = '';
    popup.style.display = 'none'; 
    currentPlayer = 'X';
    isGameOver = false;
}


cells.forEach(cell => cell.addEventListener('click', () => makeMove([...cells].indexOf(cell))));
