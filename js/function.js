'use strict';

var selected = null,
    highlighted= [];

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
                        x.innerHTML = '<i class="fas fa-chess-rook black" peace="rook"></i>';
                    }
                    if (x.attributes['col-index'].value === 'B' || x.attributes['col-index'].value === 'G'){
                        x.innerHTML = '<i class="fas fa-chess-knight black" peace="knight"></i>';
                    }
                    if (x.attributes['col-index'].value === 'C' || x.attributes['col-index'].value === 'F'){
                        x.innerHTML = '<i class="fas fa-chess-bishop black" peace="bishop"></i>';
                    }
                    if (x.attributes['col-index'].value === 'D'){
                        x.innerHTML = '<i class="fas fa-chess-queen black" peace="queen"></i>';
                    }
                    if (x.attributes['col-index'].value === 'E'){
                        x.innerHTML = '<i class="fas fa-chess-king black" peace="king"></i>';
                    }
                });
                break;
            case '7':
                columns.forEach(x => {x.innerHTML = '<i class="fas fa-chess-pawn black" peace="pawn"></i>'});
                break;            
            case '2':
                columns.forEach(x => {x.innerHTML = '<i class="fas fa-chess-pawn white" peace="pawn"></i>'});
                break;
            case '1':
                columns.forEach(x => {               
                    if (x.attributes['col-index'].value === 'A' || x.attributes['col-index'].value === 'H'){
                        x.innerHTML = '<i class="fas fa-chess-rook white" peace="rook"></i>';
                    }
                    if (x.attributes['col-index'].value === 'B' || x.attributes['col-index'].value === 'G'){
                        x.innerHTML = '<i class="fas fa-chess-knight white" peace="knight"></i>';
                    }
                    if (x.attributes['col-index'].value === 'C' || x.attributes['col-index'].value === 'F'){
                        x.innerHTML = '<i class="fas fa-chess-bishop white" peace="bishop"></i>';
                    }
                    if (x.attributes['col-index'].value === 'D'){
                        x.innerHTML = '<i class="fas fa-chess-queen white" peace="queen"></i>';
                    }
                    if (x.attributes['col-index'].value === 'E'){
                        x.innerHTML = '<i class="fas fa-chess-king white" peace="king"></i>';
                    }
                });
                break;
            default:
                break;
        }   
    }
}

function addEventListeners(data,type,funct){
    data.forEach(x => x.addEventListener(type,funct));
}

function displayMoves(){
    var peace = this.attributes['peace'].value,
        moved = this.getAttribute('moved'),
        column = this.parentNode.attributes['col-index'].value,
        row = this.parentNode.parentNode.attributes['row-index'].value; 
        
    toggleHighlight(peace,moved,column,row,this);

    this.toggleAttribute('selected');
    this.classList.toggle('selected');
    if(this.attributes['selected']){
        if(selected !== null && selected !== this){
            selected.toggleAttribute('selected');
            selected.classList.toggle('selected');
        }
        selected = this;
    }else{
        selected = null;
    }
};

function toggleHighlight(peace,moved,column,row,clicked){
    if(selected !== clicked){
        for(var i = 0; i < highlighted.length; i++){
        highlighted[i].classList.remove('highlight');
        };
        highlighted = [];
    };
    var rows = document.querySelectorAll('.game-board .row');
    switch (peace) {
        case 'pawn':
            if(moved === null){
                var i = 0;
                rows.forEach(x  => {
                    if(x.attributes['row-index'].value === (parseInt(row) + 1).toString() ||
                    x.attributes['row-index'].value === (parseInt(row) + 2).toString()){
                        x.querySelectorAll('div').forEach(y => {
                            if (y.attributes['col-index'].value === column){
                                y.classList.toggle('highlight');
                                highlighted[i] = y;
                                i++;
                            };
                        });
                    };
                });
            };
            break;
        case 'rook':
                        
            break;
        case 'bishop':
            
            break;
        case 'knight':
            
            break;
        case 'king':
            
            break;
        case 'queen':
            
            break;
    
        default:
            break;
    }  
};