function openRegistry(){ 
    document.querySelector('#password2').addEventListener('input',checkPassword);
    document.querySelector('#password').addEventListener('input',checkPassword);
    document.querySelector('#username').addEventListener('input',checkUsername);
    document.querySelector('#email').addEventListener('input',checkEmail);    
    document.querySelectorAll('.register').forEach(x => x.classList.remove('displayNone'));
    document.querySelector('#register').removeEventListener('click',openRegistry);
    document.querySelector('#register').addEventListener('click',register);
    document.querySelector('#logIn').removeEventListener('click',login);
    document.querySelector('#logIn').addEventListener('click',openLogin);
    state = 'register';
}

function openLogin(){
    document.querySelector('#message').innerHTML = "";
    document.querySelector('#register').removeEventListener('click',register);
    document.querySelector('#register').addEventListener('click',openRegistry);   
    document.querySelectorAll('.register').forEach(x => x.classList.add('displayNone'));
    document.querySelector('#logIn').addEventListener('click',login);
    state = 'login';
}
var state = 'login';
var states = {
    username: false,
    email: false,
    password: false
}

function register(){
    if (states.username && states.email && states.password){
        axios.post(variables.url + 'api/register',{
            username: document.querySelector('#username').value,
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value,
            password2: document.querySelector('#password2').value
        })
        .then(function (response) {
            switch (response.data.status){
                case 'error':
                    document.querySelector('#message').innerHTML = response.data.info;
                    break;
                case 'login':
                    document.querySelector('#message').innerHTML = response.data.info;
                    openLogin();
                    break;
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }else{
        document.querySelector('#message').innerHTML = "Bad: "
        if(!states.username){
            document.querySelector('#message').innerHTML += " Username "
        }
        if(!states.email){
            document.querySelector('#message').innerHTML += " Email "
        }
        if(!states.password){
            document.querySelector('#message').innerHTML += " Passwords "
        }
    }
}

function checkPassword(){
    password = document.getElementById('password');
    password2 = document.getElementById('password2');
    if(password.value !== password2.value && password.value.length > 0 && password2.value.length > 0){
        password.classList.add('badInput');
        password2.classList.add('badInput');
        states.password = false;
    }else{
        password.classList.remove('badInput');
        password2.classList.remove('badInput');
        states.password = true;
    }
}

function checkUsername(){
    var regex = /[\w]{5,}/;    
    if (!regex.test(this.value)){
        this.classList.add('badInput');
        states.username = false;
    }else{
        this.classList.remove('badInput');
        states.username = true;
    }
}

function checkEmail(){
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(!regex.test(this.value)){
        this.classList.add('badInput');
        states.email = false;
    }else{
        this.classList.remove('badInput');
        states.email = true;
    }
}

function login(){
    axios.post(variables.url + 'api/login',{
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
    })
    .then(function (response) {
        switch (response.data.status){
            case 'error':
                document.querySelector('#message').innerHTML = response.data.info;
                break;
            case 'redirect':
                window.location.replace(variables.url + response.data.info);
                break;
            default:
                break;
        }
    })
    .catch(function (error) {
    console.log(error);
    });
}

document.querySelector('#logIn').addEventListener('click',login);
document.querySelector('#register').addEventListener('click',openRegistry);

document.addEventListener('keypress', function (e){
    if (e.key === 'Enter'){
        switch (state) {
            case 'login':                
                login();
                break;
            case 'register':
                register();
                break;
            default:
                break;
        }
    }
});