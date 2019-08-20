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
        }
    }

    static function move($parsed_request){
        echo json_encode($parsed_request);
    }

    function new_user($parsed_request){
        global $pdo;
        $stmt = $pdo->prepare('INSERT INTO users (email, password, nickname)
            VALUES (:email, :password , :username)');
        
        $stmt->execute([
            'email' => $parsed_request->email,
            'password' => $parsed_request->password,
            'username' => $parsed_request->username
        ]);
        echo json_encode($parsed_request);
    }

    function login($parsed_request){
        global $pdo;
        $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ? and password = ?');

        $stmt->execute([
            $parsed_request->email,
            $parsed_request->password
        ]);

        $stmt->fetchAll()[0]['id'];
    }
}