'use strict';

function resetBoard(){
    var row,
        row_index,
        columns;
    for(var i = 0; i < 8; i++){
        row = document.querySelectorAll('.game-board > .row').item(i);
        row_index = row.attributes['row-index'].value;
        columns = row.querySelectorAll('div');
        switch (row_index) {
            case '8':                
                columns.forEach(x => {                    
                    if (x.attributes['col-index'] === 'A' || x.attributes['col-index'] === 'H'){
                        x.innerHTML = '<i class="fas fa-chess-rook black"></i>';
                    }
                });
                break;
            case '7':
                columns.forEach(x => {x.innerHTML = '<i class="fas fa-chess-pawn black"></i>'});
                break;            
            case '2':
                columns.forEach(x => {x.innerHTML = '<i class="fas fa-chess-pawn white"></i>'});
                break;
            case '1':

                break;
            default:
                break;
        }
        
    }
    
}

resetBoard();