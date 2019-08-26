<?php 
define ('DIR', __DIR__.'/../');
include DIR.'include/config_production.php';
include DIR.'include/functions.php';

$installFolder = str_replace('index.php', '', $_SERVER['SCRIPT_NAME']);
$file = str_replace($installFolder, '', $_SERVER['REQUEST_URI']);
$file = preg_replace('/\?.+$/', '', $file);

$bla = new chess\Api;

if (preg_match('/^game/', $file)){
    $game_id = preg_replace('/^game/', '', $file);
    require DIR.'templates/game.php';
    die();
}

if (preg_match('/^api/', $file)){
    $request = preg_replace('/^api\//','',$file);
    $bla::call_func($bla::parse_request($request));
    die();
}

if( isset($_SESSION['status']) && $_SESSION['status'] == 1){
    header('Location: '.URL.'game');
    die();
}else{
    if($file == ''){
        require DIR.'templates/login.php';
    }
}