<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start();
define ('DIR', __DIR__.'/../');
define ('URL', 'https://jonaschairchess.000webhostapp.com/');
include DIR.'include/functions.php';

// DB connection initiation
$host = 'localhost';
$db   = 'id10579511_chess';
$user = 'id10579511_chess';
$pass = 'belenkas';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];
try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}

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