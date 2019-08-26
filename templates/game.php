<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Chess 0.1</title>
    <link rel="stylesheet" href=<?= url('css/all.min.css')?>>
    <link rel="stylesheet" href=<?= url('css/game.css')?>>
    <link rel="stylesheet" href=<?= url('css/header.css')?>>
</head>
<body>
<?php
include DIR.'templates/header.php';
?>
    <div class="game">
        <section class="board">
            <div class="coord north horizontal">
                <div>A</div>
                <div>B</div>
                <div>C</div>
                <div>D</div>
                <div>E</div>
                <div>F</div>
                <div>G</div>
                <div>H</div>
            </div>
            <div class="coord south horizontal">
                <div>H</div>
                <div>G</div>
                <div>F</div>
                <div>E</div>
                <div>D</div>
                <div>C</div>
                <div>B</div>
                <div>A</div>
            </div>
            <div class="coord west vertical">
                <div>8</div>
                <div>7</div>
                <div>6</div>
                <div>5</div>
                <div>4</div>
                <div>3</div>
                <div>2</div>
                <div>1</div>
            </div>
            <div class="coord east vertical">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
            </div>
            <div class="game-board">
            </div>
        </section>
        <section class="info">
            
        </section>
    </div>
</body>
<script src=<?= url('js/axios.min.js')?>></script>
<script src=<?= url('js/data.js')?>></script>
<script src=<?= url('js/function.js')?>></script>
<script src=<?= url('js/actions.js')?>></script>
</html>