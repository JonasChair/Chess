document.querySelector('#signUp').addEventListener('click',function(){
    axios.post('http://localhost/chess/front_public/api/signUp',{
        username: document.querySelector('#username').value,
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
        password2: document.querySelector('#password2').value
    })
    .then(function (response) {
    console.log(response.data);
    })
    .catch(function (error) {
    console.log(error);
    });
})