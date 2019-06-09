'use strict';

var peaces = {
    pawn: 'pawn',
    knight: 'knight',
    bishop: 'bishop',
    rook: 'rook',
    queen: 'queen',
    king: 'king',
};
var horizontal = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8
};

var gameBoard = {
    turn: 'white',
    state: 'start',
    board:
        [[],[],[],[],[],[],[],[]]
};