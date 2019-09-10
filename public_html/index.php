<?php 
define ('DIR', __DIR__.'/../');
include DIR.'include/config_production.php';
include DIR.'include/functions.php';

$installFolder = str_replace('index.php', '', $_SERVER['SCRIPT_NAME']);
$file = str_replace($installFolder, '', $_SERVER['REQUEST_URI']);
$file = preg_replace('/\?.+$/', '', $file);

$api = new chess\Api;


if (preg_match('/^api/', $file)){
    $request = preg_replace('/^api\//','',$file);
    $api->call_func($api->parse_request($request));
    die();
}

if (preg_match('/^games/', $file)){
    if( isset($_SESSION['active_game']) || isset($_SESSION['spectate_game']) ) {
        header('Location: '.URL.'game');
        die();
    }else{
        require DIR.'templates/games.php';
        die();
    }
}

if (preg_match('/^game/', $file)){
    preg_replace('/^game/', '', $file);
    if( !isset($_SESSION['active_game']) && !isset($_SESSION['spectate_game']) ) {
        header('Location: '.URL.'games');
        die();
    }else{
        require DIR.'templates/game.php';
        die();
    }
}

if( isset($_SESSION['status']) && $_SESSION['status'] == 1){
    header('Location: '.URL.'games');
    die();
}else{
    require DIR.'templates/login.php';
    die();
}