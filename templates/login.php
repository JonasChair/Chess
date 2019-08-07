<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Chess 0.1</title>
    <link rel="stylesheet" href=<?= url('css/all.min.css')?>>
    <link rel="stylesheet" href=<?= url('css/main.css')?>>
</head>
<body>
    <div class='bg-image'></div>
<main>
    <div class="left">
        <h1>
            Log in
        </h1>
        <p>
            <a href="#">Privacy policy</a>
            & 
            <a href="#">terms of service</a>
        </p>
    </div>
    <div class="right">
        <div class="x">
            X
        </div>
        <form class="form">
            <p>Username</p>
            <input id="username" type="text">
            <p>E-mail</p>
            <input id="email" type="email">
            <p>Password</p>
            <input id="password" type="password">
            <p>Repeat password</p>
            <input id="password2" type="password">
            <p>
                <div id="signUp" class="btn"> Sign up </div>
                <span>
                    or <a href="sign-in.html">Sign in</a>
                </span>
            </p>
        </form>
    </div>
</main>
</body>
<script src=<?= url('js/axios.min.js')?>></script>
<script src=<?= url('js/login.js')?>></script>
</html>