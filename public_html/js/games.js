function newGame(){
    axios.post(variables.url + 'api/newgame',{
        
    })
    .then(function (response) {
        switch (response.data.status){
            case 'error':
                document.querySelector('#message').innerHTML = response.data.info;
                break;
            case 'redirect':
                window.location.replace(variables.url + response.data.info);
                break;
        }
    })
    .catch(function (error) {
    console.log(error);
    });
}
function joinGame(){
    game_id = this.dataset.id;
    axios.post(variables.url + 'api/joingame',{
        game_id
    })
    .then(function (response){
        switch (response.data.status){
            case 'error':
                document.querySelector('#message').innerHTML = response.data.info;
                break;
            case 'redirect':
                window.location.replace(variables.url + response.data.info);
                break;
        }
    })
    .catch(function (error) {
    console.log(error);
    });
};

function spectateGame(){
    game_id = this.dataset.id;
    axios.post(variables.url + 'api/spectategame',{
        game_id
    })
    .then(function (response){
        switch (response.data.status){
            case 'error':
                document.querySelector('#message').innerHTML = response.data.info;
                break;
            case 'redirect':
                window.location.replace(variables.url + response.data.info);
                break;
        }
    })
    .catch(function (error) {
    console.log(error);
    });
};

document.querySelector('.game.new').addEventListener('click',newGame);
document.querySelectorAll('.game.wait').forEach(x => x.addEventListener('click',joinGame));
document.querySelectorAll('.game.progress').forEach(x => x.addEventListener('click',spectateGame));