'use strict';

resetBoard();

addEventListeners(document.querySelectorAll('.row > div > i'),"click",displayMoves);