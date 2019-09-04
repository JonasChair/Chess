<?php

namespace chess;

class Api implements ApiInterface{
    function parse_request(String $request) : Array{
        return explode('/',$request);
    }

    function call_func(Array $parsed_request){
        switch($parsed_request[0]){
            case 'move':
                self::move(json_decode(file_get_contents("php://input")));
                break;
            case 'register':
                self::new_user(json_decode(file_get_contents("php://input")));
                break;
            case 'login':
                self::login(json_decode(file_get_contents("php://input")));
                break;
            case 'logoff':
                self::logoff(json_decode(file_get_contents("php://input")));
                break;
            case 'newgame':
                self::newgame(json_decode(file_get_contents("php://input")));
                break;
            case 'joingame':
                self::joingame(json_decode(file_get_contents("php://input")));
                break;
            case 'spectategame':
                self::spectategame(json_decode(file_get_contents("php://input")));           
                break;     
        }
    }

    static function move($parsed_request){
        echo json_encode($parsed_request);
    }

    function new_user($parsed_request){
        global $pdo;

        $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');

        $stmt->execute([
            $parsed_request->email
        ]);

        if(sizeof($stmt->fetchAll()) > 0){
            $response = new \stdClass();
            $response->status = 'error';
            $response->info = 'Email already registered';
            echo json_encode($response);
            die();
        }else{
            $stmt = $pdo->prepare('INSERT INTO users (email, password, nickname)
                VALUES (:email, :password , :username)');
            
            $stmt->execute([
                'email' => $parsed_request->email,
                'password' => $parsed_request->password,
                'username' => $parsed_request->username
            ]);
            $response = new \stdClass();
            $response->status = 'login';
            echo json_encode($response);
            die();
        }
    }

    function login($parsed_request){
        global $pdo;
        $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ? and password = ?');

        $stmt->execute([
            $parsed_request->email,
            $parsed_request->password
        ]);
        $user_info = $stmt->fetchAll()[0];
        if ($user_info['id']){
            $_SESSION['user_id'] = $user_info['id'];
            $_SESSION['username'] = $user_info['nickname'];
            $_SESSION['rating'] = $user_info['rating'];
            $_SESSION['status'] = 1; //status 1 -> logedIn

            $stmt = $pdo->prepare('SELECT * FROM games WHERE (white_id = ? OR black_id = ?) AND game_state < 4');
            $stmt->execute([
                $_SESSION['user_id'],
                $_SESSION['user_id']
            ]);
            if($game = $stmt->fetch()){
                $_SESSION['active_game'] = $game['id'];
                $response = new \stdClass();
                $response->status = 'redirect';
                $response->info = 'game';
                echo json_encode($response);
                die();
            }else{
                $response = new \stdClass();
                $response->status = 'redirect';
                $response->info = 'games';
                echo json_encode($response);
                die();
            }
        }else{
            $response = new \stdClass();
            $response->status = 'error';
            $response->info = 'Wrong information please try again.';
            echo json_encode($response);
            die();
        }
    }

    function logoff($parsed_request){
        session_destroy();
        header('Location: '.url());
        die();
    }

    function newgame(){
        global $pdo;
        if(isset($_SESSION['status']) && $_SESSION['status'] == 1){
            $stmt = $pdo->prepare('SELECT * FROM games WHERE (white_id = ? OR black_id = ?) AND game_state < 4');
            $stmt->execute([
                $_SESSION['user_id'],
                $_SESSION['user_id']
            ]);
            
            if($game = $stmt->fetch()){
                $_SESSION['active_game'] = $game['id'];
            }else{
                $stmt = $pdo->prepare('INSERT INTO games (white_id , white_rating) VALUES (:white_id , :white_rating)');
                $stmt->execute([
                    'white_id' => $_SESSION['user_id'],
                    'white_rating' => $_SESSION['rating']
                ]);
                $stmt = $pdo->prepare('SELECT * FROM games where (white_id = ? OR black_id = ?) AND game_state < 4');
                $stmt->execute([
                    $_SESSION['user_id'],
                    $_SESSION['user_id']
                ]);
                $_SESSION['active_game'] = $stmt->fetch()['id'];
            }
            $response = new \stdClass();
            $response->status = 'redirect';
            $response->info = 'game';
            echo json_encode($response);
            die();
        }else{
            $response = new \stdClass();
            $response->status = 'error';
            $response->info = 'Not logged in';
            echo json_encode($response);
            die();
        }
    }

    function joingame($parsed_request){
        global $pdo;
        $game_id = $parsed_request->game_id;
        $stmt = $pdo->prepare('UPDATE games SET black_id =:black_id, black_rating=:black_rating, game_state = 2 WHERE id = :game_id');
        $stmt->execute([
            'black_id' => $_SESSION['user_id'],
            'black_rating' => $_SESSION['rating'],
            'game_id' => $game_id
        ]);
        $_SESSION['active_game'] = $game_id;
        $response = new \stdClass();
        $response->status = 'redirect';
        $response->info = 'game';
        echo json_encode($response);
        die();
    }

    function spectategame($parsed_request){
        global $pdo;
        $game_id = $parsed_request->game_id;
        $_SESSION['spectate_game'] = $game_id;
        _d($_SESSION);
        $response = new \stdClass();
        $response->status = 'redirect';
        $response->info = 'game';
        echo json_encode($response);
        die();
    }
}