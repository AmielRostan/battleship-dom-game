// import { table } from "console";
import Board from "./board.js";

let board = new Board(); // creates a new game board

// Examine the grid of the game board in the browser console.
// Create the UI of the game using HTML elements based on this grid.
console.log(board.grid);

// Your code here
const grid = document.createElement('table');
grid.classList.add('grid');

const resetButton = document.createElement('button');
resetButton.innerText = "Reset Game";
resetButton.addEventListener('click', reset);
resetButton.classList.add('resetButton');
document.body.appendChild(resetButton);

const gameOver = document.createElement('h2');
gameOver.innerText = "YOU WIN!!";
gameOver.classList.add('gameOver');
gameOver.classList.add('invisible');
document.body.appendChild(gameOver);

function clickHandler(row, col) {
    return () => {
        const attack = board.makeHit(row, col);

        if(attack !== null) {
            const cell = grid.rows[row].cells[col];

            cell.classList.add('hit');
            cell.textContent = attack;

            cell.removeEventListener('click', clickHandlers[row * 9 + col]);

            if(board.isGameOver()) {
                removeAllClickListeners();
                gameOver.classList.remove('invisible');
            }
        } else {
            const cell = grid.rows[row].cells[col];
            cell.classList.add('missed');
        }
    }
}

// removeListeners method
function removeAllClickListeners() {
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            const cell = grid.rows[i].cells[j];
            cell.removeEventListener('click', clickHandlers[i * 9 + j]);
        }
    }
    clickHandlers = [];
}



// array of functions
let clickHandlers = [];

function reset() {
    gameOver.classList.add('invisible');
    board = new Board();
    console.log(board.grid);
    removeAllClickListeners();
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            const cell = grid.rows[i].cells[j];
            cell.classList.remove('missed');
            cell.classList.remove('hit');
            cell.innerText = '';
            const handler = clickHandler(i, j);
            clickHandlers.push(handler);
            cell.addEventListener('click', handler);
        }
    }
}

// create the entire grid
for(let i = 0; i < 9; i++) {
    const row = document.createElement('tr');
    for(let j = 0; j < 9; j++) {
        const cell = document.createElement('td');
        cell.classList.add('cell');

        const handler = clickHandler(i, j);
        clickHandlers.push(handler);

        cell.addEventListener('click', handler);

        row.appendChild(cell);
    }
    grid.appendChild(row);
}

document.body.appendChild(grid);
