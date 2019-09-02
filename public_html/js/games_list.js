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
function joinGame(){};

document.querySelector('.game.new').addEventListener('click',newGame);