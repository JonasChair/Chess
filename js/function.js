'use strict';

function addEventListeners(data,type,funct){
    data.forEach(x => x.addEventListener(type,funct));
}

function displayMoves(){
        var col = this.parentNode.attributes['col-index'].value,
            row = this.parentNode.parentNode.attributes['row-index'].value; 
    
    if (gameBoard.board[row][col].color === gameBoard.turn){
        toggleSelect(row,col);
        toggleHighlight(row,col);

        renderBoard();
    }
};

function toggleSelect(row , col){
    var peace = gameBoard.board[row][col];
        if (selectedPeace.isSelected){
            gameBoard.board[selectedPeace.row][selectedPeace.col].selected = '';
            updatePeaceHTML(selectedPeace.row,selectedPeace.col);
        };
        selectedPeace.row = row;
        selectedPeace.col = col;
        selectedPeace.isSelected = true;
        peace.selected = 'selected';
                
        updatePeaceHTML(row,col);

    return;
}

function toggleHighlight(row,col) {
    var peace = gameBoard.board[row][col],
        maxDistance,
        highlightRow,
        highlightCol,
        direction = 1;

    if(gameBoard.turn === colors.black){
        direction = -1;
    }
    if(highlighted.length > 0){
        highlighted.forEach(x => {
            gameBoard.board[x.row][x.col].highlighted = '';
        });
    };

    switch (peace.name) {
        
        case peaces.pawn:
            if(!peace.moved){
                maxDistance = 2;
            }else{
                maxDistance = 1;
            };
            for(var i = 0; i < maxDistance; i++){
                highlightRow = parseInt(row) + (( i + 1 ) * direction);
                highlightCol = parseInt(col);
                if(gameBoard.board[highlightRow][highlightCol].name !== ''){
                    return;
                }else{
                    gameBoard.board[highlightRow][highlightCol].highlighted = 'highlighted';
                    highlighted[i] = {row: highlightRow, col: highlightCol};
                }
            };
        break;
        case peaces.rook:

        break;
        case peaces.knight:

        break;
        case peaces.bishop:

        break;
        case peaces.queen:

        break;
        case peaces.king:

        break;
        default :
        return;
    }
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

function initPeace(name , color , row , col){
    var newPeace = {
        name : name,
        color : color,
        moved : false,
        selected : '',
        highlighted : '',
        coord: {
            row: row,
            col: horizontal[col]
            },
        HTML: ''
    };
    if( newPeace.name === peaces.empty){
        newPeace.HTML = '';
    }else{
        newPeace.HTML = '<i class="fas fa-chess-' + newPeace.name + ' ' + newPeace.color + ' ' + newPeace.selected + ' ' + newPeace.highlighted + '"></i>';
    }
    return newPeace;
};

function updatePeaceHTML(row,col){
    var peace = gameBoard.board[row][col];
    peace.HTML = '<i class="fas fa-chess-' + peace.name + ' ' + peace.color + ' ' + peace.selected + ' ' + peace.highlighted + '"></i>';
}

function initBoard(){
    gameBoard.turn = colors.white;
    gameBoard.state = states.start;

    for(var i = 0; i < gameBoard.board.length; i++){
        gameBoard.board[1][i] = initPeace(peaces.pawn,colors.white,1,i);
        gameBoard.board[6][i] = initPeace(peaces.pawn,colors.black,6,i);

        gameBoard.board[2][i] = initPeace(peaces.empty,colors.none,2,i);
        gameBoard.board[3][i] = initPeace(peaces.empty,colors.none,3,i);
        gameBoard.board[4][i] = initPeace(peaces.empty,colors.none,4,i);
        gameBoard.board[5][i] = initPeace(peaces.empty,colors.none,5,i);
    }
    //testing
    gameBoard.board[2][3] = initPeace(peaces.pawn,colors.white,2,3);
    gameBoard.board[3][4] = initPeace(peaces.rook,colors.black,3,4);
    //
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
        HTML += '<div class="row" row-index="' + i + '">';
        for(var j = 0; j < gameBoard.board[i].length; j++){
            HTML += '<div col-index="' + j + '" class="'+ gameBoard.board[i][j].highlighted +'">';
            HTML += gameBoard.board[i][j].HTML;
            HTML += '</div>';
        }
        HTML += '</div>';
    }
    document.querySelector('.game-board').innerHTML = HTML;
    addEventListeners(document.querySelectorAll('.game-board .row > div > i'),"click",displayMoves);
    return;
}