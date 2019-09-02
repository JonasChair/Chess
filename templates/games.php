<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Chess 0.1</title>
    <link rel="stylesheet" href=<?= url('css/all.min.css')?>>
    <link rel="stylesheet" href=<?= url('css/games.css')?>>
    <link rel="stylesheet" href=<?= url('css/header.css')?>>
</head>
<body>
<?php
include DIR.'templates/header.php';
?>
    <div class='games'>
        <div class='game new'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>
        </div>
        <?php
            $sql = 'SELECT whites.nickname AS white_name,blacks.nickname AS black_name FROM games LEFT JOIN users AS whites ON white_id = whites.id LEFT JOIN users AS blacks ON black_id = blacks.id WHERE games.game_state = 1';
            $stmt = $pdo->query($sql);
            while($row = $stmt->fetch()){
                echo '<div class="game">
                        <div class="black player">
                            <i class="fas fa-chess-pawn black"></i><span>'. $row['black_name'] .
                        '</span></div>
                        <div class ="board"></div>
                        <div class="white player">
                            <i class="fas fa-chess-pawn white"></i><span>'. $row['white_name'] .
                        '</span></div>
                      </div>';
            }
        ?>
    </div>
</body>
<script src= <?= url('js/games_list.js')?> ></script>