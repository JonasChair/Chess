<?php

define ('DIR', __DIR__.'/../');
include DIR.'include/config_production.php';

$sql = "CREATE TABLE IF NOT EXISTS users (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password CHAR(32) NOT NULL,
    nickname VARCHAR(30) NOT NULL,
    rating INT(4) UNSIGNED DEFAULT '1200',
    profile_picture VARCHAR(255),
    reg_date TIMESTAMP
    )";

$stmt = $pdo->exec($sql);    

$sql = "CREATE TABLE IF NOT EXISTS game_states (
    id INT(2) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    state VARCHAR(4) UNIQUE
    )";

$stmt = $pdo->exec($sql);

$sql = "INSERT INTO game_states(state) 
        VALUES ('wait'),
               ('strt'),
               ('prgr'),
               ('wwin'),
               ('bwin'),
               ('draw')";

$stmt = $pdo->exec($sql);

$sql = "CREATE TABLE IF NOT EXISTS games (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    timecontrol CHAR(5),
    white_id INT(6) UNSIGNED,
    black_id INT(6) UNSIGNED,
    turn char(1) DEFAULT 'w',
    game_state INT(2) UNSIGNED DEFAULT 1,
    white_rating INT(4) UNSIGNED,
    black_rating INT(4) UNSIGNED,
    FOREIGN KEY (game_state) REFERENCES game_states(id), 
    FOREIGN KEY (white_id) REFERENCES users(id),
    FOREIGN KEY (black_id) REFERENCES users(id)
    )";
       
$stmt = $pdo->exec($sql);

$sql = "CREATE TABLE IF NOT EXISTs move_list(
    game_id INT(6) UNSIGNED NOT NULL,
    move_numb INT(3) UNSIGNED NOT NULL,
    movement VARCHAR(5) NOT NULL,
    PRIMARY KEY (game_id, move_numb),
    FOREIGN KEY (game_id) REFERENCES games(id)
)";

$stmt = $pdo->exec($sql);