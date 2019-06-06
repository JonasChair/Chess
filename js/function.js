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
                    if (x.attributes['col-index'].value === 'A' || x.attributes['col-index'].value === 'H'){
                        x.innerHTML = '<i class="fas fa-chess-rook black"></i>';
                    }
                    if (x.attributes['col-index'].value === 'B' || x.attributes['col-index'].value === 'G'){
                        x.innerHTML = '<i class="fas fa-chess-knight black"></i>';
                    }
                    if (x.attributes['col-index'].value === 'C' || x.attributes['col-index'].value === 'F'){
                        x.innerHTML = '<i class="fas fa-chess-bishop black"></i>';
                    }
                    if (x.attributes['col-index'].value === 'D'){
                        x.innerHTML = '<i class="fas fa-chess-queen black"></i>';
                    }
                    if (x.attributes['col-index'].value === 'E'){
                        x.innerHTML = '<i class="fas fa-chess-king black"></i>';
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
                columns.forEach(x => {               
                    if (x.attributes['col-index'].value === 'A' || x.attributes['col-index'].value === 'H'){
                        x.innerHTML = '<i class="fas fa-chess-rook white"></i>';
                    }
                    if (x.attributes['col-index'].value === 'B' || x.attributes['col-index'].value === 'G'){
                        x.innerHTML = '<i class="fas fa-chess-knight white"></i>';
                    }
                    if (x.attributes['col-index'].value === 'C' || x.attributes['col-index'].value === 'F'){
                        x.innerHTML = '<i class="fas fa-chess-bishop white"></i>';
                    }
                    if (x.attributes['col-index'].value === 'D'){
                        x.innerHTML = '<i class="fas fa-chess-queen white"></i>';
                    }
                    if (x.attributes['col-index'].value === 'E'){
                        x.innerHTML = '<i class="fas fa-chess-king white"></i>';
                    }
                });
                break;
            default:
                break;
        }
        
    }
    
}

resetBoard();