<?php 
session_start();
define ('DIR', __DIR__.'/../');
define ('URL', 'http://localhost/chess/front_public/');
include DIR.'include/functions.php';

$installFolder = str_replace('index.php', '', $_SERVER['SCRIPT_NAME']);
$file = str_replace($installFolder, '', $_SERVER['REQUEST_URI']);
$file = preg_replace('/\?.+$/', '', $file);

$bla = new chess\Api;

if (preg_match('/^game/', $file)){
    $game_id = preg_replace('/^game/', '', $file);
    require DIR.'templates/game.php';
}

if (preg_match('/^api/', $file)){
    $request = preg_replace('/^api/');
    
}