<?php 
session_start();
define ('DIR', __DIR__.'/../');
define ('URL', 'http://localhost/chess/front_public/');
include DIR.'include/functions.php';

// DB connection initiation
$host = '127.0.0.1';
$db   = 'chess';
$user = 'root';
$pass = '';
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


if($file == ''){
    require DIR.'templates/login.php';
}

if (preg_match('/^game/', $file)){
    $game_id = preg_replace('/^game/', '', $file);
    require DIR.'templates/game.php';
}

if (preg_match('/^api/', $file)){
    $request = preg_replace('/^api\//','',$file);
    $bla::call_func($bla::parse_request($request));
}