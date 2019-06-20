'use strict';

var states = {
    start: 'start',
    inProgress: 'in progress',
    promotion: 'promotion',
    draw: 'draw',
    blackWin: 'blackWin',
    whiteWin: 'whiteWin'
}

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
}

var horizontal = ['A','B','C','D','E','F','G','H'];

var selectedPeace = {
        row: '',
        col: '',
        isSelected: false
}
var promoted = {
        row: -1,
        col: -1
};

var highlighted = [];

var path = [];

var gameBoard = {
    turn: 'white',
    state: 'start',
    board:
        [[],[],[],[],[],[],[],[]]
}