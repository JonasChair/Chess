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
            case 'getmovelist':
                self::getmovelist();     
                break;
            case 'awaitmove':
                self::awaitmove();
                break;
        }
    }

    static function move($parsed_request){
        global $pdo;
        
        $stmt = $pdo->prepare('SELECT COUNT(*) FROM move_list WHERE game_id = ?');
        $stmt->execute([
            $_SESSION['active_game']
        ]);
        $move_numb = $stmt->fetch()['COUNT(*)'] + 1;
        
        $stmt = $pdo->prepare('INSERT INTO move_list (game_id,move_numb,movement)  VALUES (:game_id,:move_numb,:movement)');
        $stmt->execute([
            'game_id' => $_SESSION['active_game'],
            'move_numb' => $move_numb,
            'movement' => $parsed_request->move
        ]);
    }

    function awaitmove(){
        global $pdo;
        header('Content-Type: text/event-stream');
        header('Cache-Control: no-cache');
        while(true){
            $stmt = $pdo->prepare('SELECT move_numb, movement FROM move_list WHERE game_id = ? ORDER BY move_numb DESC');
            $stmt->execute([
                $_SESSION['active_game']
            ]);
            $last_move = $stmt->fetch();
            if( ( ($last_move['move_numb'] % 2) == 0 && $_SESSION['player_color'] == 'white') || ( ($last_move['move_numb'] % 2) == 1 && $_SESSION['player_color'] == 'black') ){
                echo "data:{$last_move['movement']}\n\n";
                flush();
                die();
            }
        }
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
            $response->info = 'Registration succesfull, you can now login!';
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
        if ($user_info = $stmt->fetchAll()){
            $_SESSION['user_id'] = $user_info[0]['id'];
            $_SESSION['username'] = $user_info[0]['nickname'];
            $_SESSION['rating'] = $user_info[0]['rating'];
            $_SESSION['status'] = 1; //status 1 -> logedIn

            $stmt = $pdo->prepare('SELECT * FROM games WHERE (white_id = ?) AND game_state < 4');
            $stmt->execute([
                $_SESSION['user_id']
            ]);
            
            if($game = $stmt->fetch()){
                $_SESSION['active_game'] = $game['id'];
                $_SESSION['player_color'] = 'white';
            };
            $stmt = $pdo->prepare('SELECT * FROM games WHERE (black_id = ?) AND game_state < 4');
            $stmt->execute([
                $_SESSION['user_id']
            ]);
            if($game = $stmt->fetch()){
                $_SESSION['active_game'] = $game['id'];
                $_SESSION['player_color'] = 'black';
            };
            if($game){
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
            $stmt = $pdo->prepare('SELECT * FROM games WHERE (white_id = ?) AND game_state < 4');
            $stmt->execute([
                $_SESSION['user_id']
            ]);
            
            if($game = $stmt->fetch()){
                $_SESSION['active_game'] = $game['id'];
                $_SESSION['player_color'] = 'white';
            };
            $stmt = $pdo->prepare('SELECT * FROM games WHERE (black_id = ?) AND game_state < 4');
            $stmt->execute([
                $_SESSION['user_id']
            ]);
            if($game = $stmt->fetch()){
                $_SESSION['active_game'] = $game['id'];
                $_SESSION['player_color'] = 'black';
            };
            if(!isset($_SESSION['active_game'])){
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
                $_SESSION['player_color'] = 'white';
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
        $_SESSION['player_color'] = 'black';

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
        $_SESSION['player_color'] = 'neutral';
        _d($_SESSION);
        $response = new \stdClass();
        $response->status = 'redirect';
        $response->info = 'game';
        echo json_encode($response);
        die();
    }

    function getmovelist(){
        global $pdo;
        
        $stmt = $pdo->prepare('SELECT move_numb, movement FROM move_list WHERE game_id = ?');
        $stmt->execute([$_SESSION['active_game']]);
        $response = new \stdClass();
        $response->status = 'movelist';
        $response->info = $stmt->fetchAll();

        echo json_encode($response);
        die();
    }
}