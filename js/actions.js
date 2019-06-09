'use strict';

initBoard();

document.querySelector('.game-board').innerHTML = renderBoard();

addEventListeners(document.querySelectorAll('.row > div > i'),"click",displayMoves);
