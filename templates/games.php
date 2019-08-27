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
        <?php
            $sql = 'SELECT whites.nickname AS white_name,blacks.nickname AS black_name FROM games LEFT JOIN users AS whites ON white_id = whites.id LEFT JOIN users AS blacks ON black_id = blacks.id WHERE games.game_state = 1';
            $stmt = $pdo->query($sql);
            while($row = $stmt->fetch()){
                echo '<div class="game">
                        <div class="white player">
                            <i class="fas fa-chess-pawn white"></i>'. $row['white_name'] .
                        '</div>
                        <span>VS</span>
                        <div class="black player">
                            <i class="fas fa-chess-pawn black"></i>'. $row['black_name'] .
                        '</div>
                      </div>';
            }
        ?>
    </div>
</body>