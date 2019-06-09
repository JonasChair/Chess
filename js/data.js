'use strict';

var colors = {
    white : 'white',
    black : 'black',
    none : ''
}
var peaces = {
    pawn : 'pawn',
    knight : 'knight',
    bishop : 'bishop',
    rook : 'rook',
    queen : 'queen',
    king : 'king',
    empty : ''
};

var horizontal = ['A','B','C','D','E','F','G','H'];

var gameBoard = {
    turn: 'white',
    state: 'start',
    board:
        [[],[],[],[],[],[],[],[]]
};