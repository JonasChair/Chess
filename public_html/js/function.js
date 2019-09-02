'use strict';

function addEventListeners(data, type, funct) {
    data.forEach(x => x.addEventListener(type,funct));
}

function removeEventListeners(data, type, funct) {
    data.forEach(x => x.removeEventListener(type,funct));
}

function displayMoves() {    
    var col = this.attributes['col-index'].value,
        row = this.parentNode.attributes['row-index'].value;
    
    if (gameBoard.board[row][col].color === gameBoard.turn) {
        toggleSelect(row,col);
        getPath(row,col);
        toggleHighlight(path);
        renderBoard();
    }
}

function getPath(row, col) {
    var peace = gameBoard.board[row][col],
        maxDistance;
        path = [];
        castle = [];
    if(selectedPeace.isSelected){
        switch (peace.name) {
            case peaces.pawn:
                if(!peace.moved) {
                    maxDistance = 2;
                } else {
                    maxDistance = 1;
                }
                path = getPathPawn(row,col,maxDistance);
            break;
            case peaces.rook:
                maxDistance = 7;
                path = getPathRook(row,col,maxDistance);
            break;
            case peaces.knight:
                path = getPathKnight(row,col);
            break;
            case peaces.bishop:
                maxDistance = 7;
                path = getPathBishop(row,col,maxDistance);
            break;
            case peaces.queen:
                maxDistance = 7;
                path = getPathQueen(row,col,maxDistance);
            break;
            case peaces.king:
                maxDistance = 1;
                path = getPathKing(row,col,maxDistance);
            break;
            default:
        }
    }
    return path;
}

function getPathPawn(row, col, maxDistance) {
    var pathRow,
        pathCol,
        direction = 1,
        pathIndex = 0,
        gbRow,
        path = [];
    if(gameBoard.turn === colors.black) {
        direction = -1;
    }    
    for(var i = 1; i <= maxDistance; i++) {
        pathRow = parseInt(row) + (( i ) * direction);
        pathCol = parseInt(col);
        gbRow = gameBoard.board[pathRow];
        if(i === 1) {
            if( (pathCol - 1) >= 0 && gbRow[pathCol - 1 ].color !== '' && gbRow[pathCol - 1 ].color !== gameBoard.turn) {
                path[pathIndex] = {row: pathRow, col: pathCol -1};
                pathIndex++;
            };
            if( (pathCol + 1) <= 7 && gbRow[pathCol + 1 ].color !== '' && gbRow[pathCol + 1 ].color !== gameBoard.turn) {
                path[pathIndex] = {row: pathRow, col: pathCol + 1};
                pathIndex++;
            };
        };
        if(gbRow[pathCol].name !== peaces.empty) {
            return path;
        } else {
            path[pathIndex] = {row: pathRow, col: pathCol};
            pathIndex++;
        }
    }
    return path;
}

function getPathRook(row, col, maxDistance) {
    var pathRow,
        pathCol,
        gbPath,
        path = [],
        pathIndex = 0;
    for (var i = 1; i <= maxDistance; i++) {
        pathRow = parseInt(row) + i;
        pathCol = parseInt(col);
        if(pathRow > 7) {
            break;
        }
        gbPath = gameBoard.board[pathRow][pathCol];
        if(gbPath.color !== gameBoard.turn) {
            path[pathIndex] = {row: pathRow, col: pathCol};
            pathIndex++;
        }
        if(gbPath.name !== peaces.empty) {
            break;
        }
    }
    for (var i = 1; i <= maxDistance; i++) {
        pathRow = parseInt(row) - i;
        pathCol = parseInt(col);
        if(pathRow < 0){
            break;
        }
        gbPath = gameBoard.board[pathRow][pathCol];
        if(gbPath.color !== gameBoard.turn) {
            path[pathIndex] = {row: pathRow, col: pathCol};
            pathIndex++;
        }
        if(gbPath.name !== peaces.empty) {
            break;
        }
    }
    for (var i = 1; i <= maxDistance; i++) {
        pathRow = parseInt(row);
        pathCol = parseInt(col) + i;
        if(pathCol > 7) {
            break;
        }
        gbPath = gameBoard.board[pathRow][pathCol];
        if(gbPath.color !== gameBoard.turn) {
            path[pathIndex] = {row: pathRow, col: pathCol};
            pathIndex++;
        }
        if(gbPath.name !== peaces.empty) {
            break;
        }
    }
    for (var i = 1; i <= maxDistance; i++) {
        pathRow = parseInt(row);
        pathCol = parseInt(col) - i;
        if(pathCol < 0) {
            break;
        }
        gbPath = gameBoard.board[pathRow][pathCol];
        if(gbPath.color !== gameBoard.turn) {
            path[pathIndex] = {row: pathRow, col: pathCol};
            pathIndex++;
        }
        if(gbPath.name !== peaces.empty) {
            break;
        }
    }
    return path;
}

function getPathKnight(row, col) {
    var pathRow,
        pathCol,
        gbPath,
        pathIndex = 0,
        path = [];
    pathRow = parseInt(row) + 2;
    pathCol = parseInt(col) + 1;
    if (pathRow <= 7 && pathCol <= 7){
        gbPath = gameBoard.board[pathRow][pathCol];        
        if(gbPath.color !== gameBoard.turn) {
            path[pathIndex] = {row: pathRow, col: pathCol};
            pathIndex++;
        }
    }

    pathCol = parseInt(col) -1;
    if (pathRow <= 7 && pathCol >= 0) {
        gbPath = gameBoard.board[pathRow][pathCol];        
        if(gbPath.color !== gameBoard.turn) {
            path[pathIndex] = {row: pathRow, col: pathCol};
            pathIndex++;
        }
    }
    
    pathRow = parseInt(row) -2;
    pathCol = parseInt(col) + 1;
    if (pathRow >= 0 && pathCol <= 7) {
        gbPath = gameBoard.board[pathRow][pathCol];        
        if(gbPath.color !== gameBoard.turn) {
            path[pathIndex] = {row: pathRow, col: pathCol};
            pathIndex++;
        }
    }

    pathCol = parseInt(col) -1;
    if (pathRow >= 0 && pathCol >= 0 ) {
        gbPath = gameBoard.board[pathRow][pathCol];        
        if(gbPath.color !== gameBoard.turn) {
            path[pathIndex] = {row: pathRow, col: pathCol};
            pathIndex++;
        }
    }
    
    pathCol = parseInt(col) + 2;
    pathRow = parseInt(row) + 1;
    if (pathRow <= 7 && pathCol <= 7 ) {
        gbPath = gameBoard.board[pathRow][pathCol];        
        if(gbPath.color !== gameBoard.turn) {
            path[pathIndex] = {row: pathRow, col: pathCol};
            pathIndex++;
        }
    }

    pathRow = parseInt(row) - 1;
    if (pathRow >= 0 && pathCol <= 7 ) {
        gbPath = gameBoard.board[pathRow][pathCol];        
        if(gbPath.color !== gameBoard.turn) {
            path[pathIndex] = {row: pathRow, col: pathCol};
            pathIndex++;
        }
    }

    pathCol = parseInt(col) - 2;
    pathRow = parseInt(row) + 1;
    if (pathRow <= 7 && pathCol >= 0 ) {
        gbPath = gameBoard.board[pathRow][pathCol];        
        if(gbPath.color !== gameBoard.turn) {
            path[pathIndex] = {row: pathRow, col: pathCol};
            pathIndex++;
        }
    }

    pathRow = parseInt(row) - 1;
    if (pathRow >= 0 && pathCol >= 0 ) {
        gbPath = gameBoard.board[pathRow][pathCol];        
        if(gbPath.color !== gameBoard.turn) {
            path[pathIndex] = {row: pathRow, col: pathCol};
            pathIndex++;
        }
    }
    return path;
}

function getPathBishop(row, col, maxDistance) {
    var pathRow,
        pathCol,
        pathIndex = 0,
        gbPath,
        path = [];    
    for(var i = 1; i <= maxDistance; i++) {
        pathCol = parseInt(col) + i;
        pathRow = parseInt(row) + i;
        if(pathCol > 7 || pathRow > 7) {
            break;
        }
        gbPath = gameBoard.board[pathRow][pathCol];
        if (gbPath.color !== gameBoard.turn) {
            path[pathIndex] = {row: pathRow, col: pathCol};
            pathIndex++;
        }
        if(gbPath.name !== peaces.empty) {
            break;
        }
    }
    for(var i = 1; i <= maxDistance; i++) {
        pathCol = parseInt(col) - i;
        pathRow = parseInt(row) + i;
        if(pathCol < 0 || pathRow > 7) {
            break;
        }
        gbPath = gameBoard.board[pathRow][pathCol];
        if (gbPath.color !== gameBoard.turn) {
            path[pathIndex] = {row: pathRow, col: pathCol};
            pathIndex++;
        }
        if(gbPath.name !== peaces.empty) {
            break;
        }
    }
    for(var i = 1; i <= maxDistance; i++) {
        pathCol = parseInt(col) + i;
        pathRow = parseInt(row) - i;
        if(pathCol > 7 || pathRow < 0){
            break;
        }
        gbPath = gameBoard.board[pathRow][pathCol];
        if (gbPath.color !== gameBoard.turn) {
            path[pathIndex] = {row: pathRow, col: pathCol};
            pathIndex++;
        }
        if(gbPath.name !== peaces.empty) {
            break;
        }
    }
    for(var i = 1; i <= maxDistance; i++) {
        pathCol = parseInt(col) - i;
        pathRow = parseInt(row) - i;
        if(pathCol < 0 || pathRow < 0) {
            break;
        }
        gbPath = gameBoard.board[pathRow][pathCol];
        if (gbPath.color !== gameBoard.turn) {
            path[pathIndex] = {row: pathRow, col: pathCol};
            pathIndex++;
        }
        if(gbPath.name !== peaces.empty) {
            break;
        }
    }
    return path;
}

function getPathQueen(row, col, maxDistance) {
    return Array.prototype.concat(getPathBishop(row,col,maxDistance),getPathRook(row,col,maxDistance));
}

function getPathKing(row, col, maxDistance) {
    var path = getPathQueen(row,col,maxDistance);
    if(!gameBoard.board[row][col].moved) {
        switch(gameBoard.turn){
        case colors.white:
            if(gameBoard.board[0][0].name === peaces.rook && gameBoard.board[0][0].moved === false && getPathRook(0,0,7).findIndex(x => x.col === parseInt(col) - 1) !== -1){
                path.push({row: parseInt(row), col: parseInt(col) - 2});
                castle.push({row: parseInt(row), col: parseInt(col) - 2});             
            }
            if(gameBoard.board[0][7].name === peaces.rook && gameBoard.board[0][7].moved === false && getPathRook(0,7,7).findIndex(x => x.col === parseInt(col) + 1) !== -1){
                path.push({row: parseInt(row), col: parseInt(col) + 2});
                castle.push({row: parseInt(row), col: parseInt(col) + 2});         
            }
        break;
        case colors.black:
            if(gameBoard.board[7][0].name === peaces.rook && gameBoard.board[7][0].moved === false && getPathRook(7,0,7).findIndex(x => x.col === parseInt(col) - 1) !== -1){
                path.push({row: parseInt(row), col: parseInt(col) - 2});
                castle.push({row: parseInt(row), col: parseInt(col) - 2});                
            }
            if(gameBoard.board[7][7].name === peaces.rook && gameBoard.board[7][7].moved === false && getPathRook(7,7,7).findIndex(x => x.col === parseInt(col) + 1) !== -1){
                path.push({row: parseInt(row), col: parseInt(col) + 2});
                castle.push({row: parseInt(row), col: parseInt(col) + 2});         
            }
        break;
        }
    }
    return path;
}

function toggleSelect(row, col) {
    var peace = gameBoard.board[row][col];

    if (selectedPeace.isSelected) {
        gameBoard.board[selectedPeace.row][selectedPeace.col].selected = '';
        updatePeaceHTML(selectedPeace.row,selectedPeace.col);
    };
    if(selectedPeace.row == row && selectedPeace.col == col) {
        selectedPeace.row = '';
        selectedPeace.col = '';
        selectedPeace.isSelected = false;        
        return;
    } else {
        selectedPeace.row = row;
        selectedPeace.col = col;
        selectedPeace.isSelected = true;
        peace.selected = 'selected';        
    }
    updatePeaceHTML(row,col);

    return;
}

function toggleHighlight(path) {
    var highlightedIndex = 0;
    if(highlighted.length > 0){
        highlighted.forEach(x => {
            gameBoard.board[x.row][x.col].highlighted = '';
        });
        highlighted = [];
    };
    if(!selectedPeace.isSelected) {
        return;
    }
    path.forEach(x => {
        gameBoard.board[x.row][x.col].highlighted = 'highlighted';
        highlighted[highlightedIndex] = {row: x.row, col: x.col};
        highlightedIndex++;
    })
    return;
}

function initPeace(name, color, row, col) {
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
    if( newPeace.name === peaces.empty) {
        newPeace.HTML = '';
    } else {
        newPeace.HTML = '<i class="fas fa-chess-' + newPeace.name + ' ' + newPeace.color + ' ' + newPeace.selected + ' ' + newPeace.highlighted + '"></i>';
    }
    return newPeace;
}

function updatePeaceHTML(row, col) {
    var peace = gameBoard.board[row][col];
    peace.HTML = '<i class="fas fa-chess-' + peace.name + ' ' + peace.color + ' ' + peace.selected + ' ' + peace.highlighted + '"></i>';
}

function initBoard() {
    gameBoard.turn = colors.white;
    gameBoard.state = states.start;

    for(var i = 0; i < gameBoard.board.length; i++) {
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

function move() {
    var col = this.attributes['col-index'].value,
        row = this.parentNode.attributes['row-index'].value;
    axios.post(variables.url + 'api/move',{
        ...selectedPeace
        // move_start: {row: selectedPeace.row, col: selectedPeace.col},
        // move_end: {row: row, col: col}
        })
        .then(function (response) {
        console.log(response.data);
        })
        .catch(function (error) {
        console.log(error);
    });
    if(highlighted.length > 0) {
        highlighted.forEach(x => {
            gameBoard.board[x.row][x.col].highlighted = '';
        });
    }
    gameBoard.board[row][col].name = gameBoard.board[selectedPeace.row][selectedPeace.col].name;
    gameBoard.board[row][col].color = gameBoard.board[selectedPeace.row][selectedPeace.col].color;
    gameBoard.board[row][col].moved = true;
    updatePeaceHTML(row,col);
    gameBoard.board[selectedPeace.row][selectedPeace.col].selected = '';
    gameBoard.board[selectedPeace.row][selectedPeace.col].name = peaces.empty;
    gameBoard.board[selectedPeace.row][selectedPeace.col].color = colors.none;
    gameBoard.board[selectedPeace.row][selectedPeace.col].moved = true;
    updatePeaceHTML(selectedPeace.row,selectedPeace.col);

    if(castle.findIndex(x => x.col === parseInt(col)) != -1){
        switch(col){
            case "6":
                gameBoard.board[row][5].name = gameBoard.board[row][7].name;
                gameBoard.board[row][5].color = gameBoard.board[row][7].color;
                gameBoard.board[row][5].moved = true;
                updatePeaceHTML(row,5);
                gameBoard.board[row][7].name = peaces.empty;
                gameBoard.board[row][7].color = colors.none;
                gameBoard.board[row][7].moved = true;
                updatePeaceHTML(row,7);
            break;
            case "2":
                gameBoard.board[row][3].name = gameBoard.board[row][0].name;
                gameBoard.board[row][3].color = gameBoard.board[row][0].color;
                gameBoard.board[row][3].moved = true;
                updatePeaceHTML(row,3);
                gameBoard.board[row][0].name = peaces.empty;
                gameBoard.board[row][0].color = colors.none;
                gameBoard.board[row][0].moved = true;
                updatePeaceHTML(row,0);
            break;
        }
        castle = [];
    }
    selectedPeace.row = '';
    selectedPeace.col = '';
    selectedPeace.isSelected = false;
    if( (row == 7 || row == 0) && gameBoard.board[row][col].name === peaces.pawn) {
        gameBoard.state = states.promotion;
        promoted.row = row;
        promoted.col = col;
        var peace = gameBoard.board[row][col];
        peace.HTML += '<div id="promotion">\
                        <div>\
                            <i class="fas fa-chess-queen"></i>\
                        </div>\
                        <div>\
                            <i class="fas fa-chess-rook"></i>\
                        </div>\
                        <div>\
                            <i class="fas fa-chess-bishop"></i>\
                        </div>\
                        <div>\
                            <i class="fas fa-chess-knight"></i>\
                        </div>\
                    </div>';
        renderBoard();
        return;
    } 
    toggleTurn();
    renderBoard();
}

function promote() {
    gameBoard.board[promoted.row][promoted.col].name = this.children[0].classList[1].split("-")[2];
    document.querySelector('#promotion').classList.remove("display");
    document.querySelectorAll('#promotion i').forEach(x => x.classList.remove(gameBoard.turn));
    removeEventListeners(document.querySelectorAll('#promotion .div'),'click',promote);
    updatePeaceHTML(promoted.row,promoted.col);
    gameBoard.state = states.inProgress;
    promoted.row = -1;
    promoted.col = -1;
    toggleTurn();
    renderBoard();
}

function toggleTurn() {
    gameBoard.turn = (gameBoard.turn === colors.white) ? colors.black : colors.white;
}

function renderBoard() {
    var HTML = '';
    removeEventListeners(document.querySelectorAll('.game-board .row > div'),'click',displayMoves);
    removeEventListeners(document.querySelectorAll('.game-board .row > div.highlighted'),'click',move);
    for(var i = 0; i < gameBoard.board.length; i++){
        HTML += '<div class="row" row-index="' + i + '">';
        for(var j = 0; j < gameBoard.board[i].length; j++) {
            HTML += '<div col-index="' + j + '" class="'+ gameBoard.board[i][j].highlighted +'">';
            HTML += gameBoard.board[i][j].HTML;
            HTML += '</div>';
        }
        HTML += '</div>';
    }
    document.querySelector('.game-board').innerHTML = HTML;
    if(gameBoard.state == states.promotion) {
        document.querySelector('#promotion').classList.add('display');
        document.querySelectorAll('#promotion i').forEach(x => x.classList.add(gameBoard.turn));
        addEventListeners(document.querySelectorAll('#promotion div'),'click',promote);
        return;
    }
    addEventListeners(document.querySelectorAll('.game-board .row > div'),'click',displayMoves);
    addEventListeners(document.querySelectorAll('.game-board .row > div.highlighted'),'click',move);
    
    return;
}