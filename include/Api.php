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
        }
    }
    static function move($parsed_request){
        echo json_encode($parsed_request);
    }
}