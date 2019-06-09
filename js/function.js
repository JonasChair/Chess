'use strict';

// var selected = null,
//     highlighted= [];

function addEventListeners(data,type,funct){
    data.forEach(x => x.addEventListener(type,funct));
}

function displayMoves(){
    
    // var peace = this.attributes['peace'].value,
    //     moved = this.getAttribute('moved'),
    //     column = this.parentNode.attributes['col-index'].value,
    //     row = this.parentNode.parentNode.attributes['row-index'].value; 
        
    // toggleHighlight(peace,moved,column,row,this);

    // this.toggleAttribute('selected');
    // this.classList.toggle('selected');
    // if(this.attributes['selected']){
    //     if(selected !== null && selected !== this){
    //         selected.toggleAttribute('selected');
    //         selected.classList.toggle('selected');
    //     }
    //     selected = this;
    // }else{
    //     selected = null;
    // }
};

function toggleHighlight(peace,moved,column,row,clicked){
//     var rows = document.querySelectorAll('.game-board .row'),
//         maxDistance,
//         direction = (clicked.classList.contains('black')? -1 : 1);

//     for(var i = 0; i < highlighted.length; i++){
//         highlighted[i].classList.remove('highlight');
//     };
//     highlighted = [];
//     if(selected === clicked){
//         return;
//     }
    
//     switch (peace) {
//         case 'pawn':            
//             if(moved === null){
//                  maxDistance = 2;
//             }else{
//                 maxDistance = 1;
//             };
//             for (var j = 0; j < maxDistance;) {
//                 for(var i = 0; i < 8; i++) {
//                     if( rows.item(i).attributes['row-index'].value === (parseInt(row) + ( (j + 1) * direction ) ).toString() ) {
//                         var element = rows.item(i).querySelectorAll('div').item(horizontal[column] -1 );
//                         if(element.attributes['col-index'].value === column) {
//                             if(element.innerHTML !== '' || j === maxDistance) {
//                                 return;
//                             }else{
//                                 element.classList.add('highlight');
//                                 highlighted[j] = element;
//                                 j++;
//                             };
//                         };
//                     };
//                 };
//             };
//             break;
//         case 'rook':
                        
//             break;
//         case 'bishop':
            
//             break;
//         case 'knight':
            
//             break;
//         case 'king':
            
//             break;
//         case 'queen':
            
//             break;
    
//         default:
//             break;
//     }  
};

function initPeace(name,color,row,col){
    var newPeace = {
        type : name,
        color : color,
        moved : false,
        selected : ' ',
        highlighted : ' ',
        coord: {
            row: row,
            col: horizontal[col]
            },
        HTML: ''
    };
    if( newPeace.name !== ''){
        newPeace.HTML = '<i class="fas fa-chess-' + newPeace.type + ' ' + newPeace.color + ' ' + newPeace.selected + ' ' + newPeace.highlighted + '"></i>';
    };
    return newPeace;
};

function initBoard(){
    gameBoard.turn = 'white';
    gameBoard.state = 'start';

    for(var i = 0; i < gameBoard.board.length; i++){
        gameBoard.board[1][i] = initPeace(peaces.pawn,colors.white,1,i);
        gameBoard.board[6][i] = initPeace(peaces.pawn,colors.black,6,i);

        gameBoard.board[2][i] = initPeace(peaces.empty,colors.none,2,i);
        gameBoard.board[3][i] = initPeace(peaces.empty,colors.none,3,i);
        gameBoard.board[4][i] = initPeace(peaces.empty,colors.none,4,i);
        gameBoard.board[5][i] = initPeace(peaces.empty,colors.none,5,i);
    }
    gameBoard.board[0][0] = initPeace(peaces.rook,colors.white,0,0);
    gameBoard.board[0][7] = initPeace(peaces.rook,colors.white,0,7);
    gameBoard.board[0][1] = initPeace(peaces.knight,colors.white,0,1);
    gameBoard.board[0][6] = initPeace(peaces.knight,colors.white,0,6);
    gameBoard.board[0][2] = initPeace(peaces.bishop,colors.white,0,2);
    gameBoard.board[0][5] = initPeace(peaces.bishop,colors.white,0,5);
    gameBoard.board[0][3] = initPeace(peaces.queen,colors.white,0,3);
    gameBoard.board[0][4] = initPeace(peaces.king,colors.white,0,4);
    
    gameBoard.board[7][0] = initPeace(peaces.rook,colors.black,7,0);
    gameBoard.board[7][7] = initPeace(peaces.rook,colors.black,7,7);
    gameBoard.board[7][1] = initPeace(peaces.knight,colors.black,7,1);
    gameBoard.board[7][6] = initPeace(peaces.knight,colors.black,7,6);
    gameBoard.board[7][2] = initPeace(peaces.bishop,colors.black,7,2);
    gameBoard.board[7][5] = initPeace(peaces.bishop,colors.black,7,5);
    gameBoard.board[7][3] = initPeace(peaces.queen,colors.black,7,3);
    gameBoard.board[7][4] = initPeace(peaces.king,colors.black,7,4);
}

function renderBoard(){
    var HTML = '';
        for(var i = 0; i < gameBoard.board.length; i++){
            HTML += '<div class="row">';
            for(var j = 0; j < gameBoard.board[i].length; j++){
                HTML += '<div>';
                HTML += gameBoard.board[i][j].HTML;
                HTML += '</div>';
            }
            HTML += '</div>';
        }
    return HTML;
}