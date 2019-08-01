<?php

namespace chess;

interface Api {
    function parse_request(String $request) : Array;

    function call_func(Array $parsed_request);

    function move(\stdClass $move);

    function new_game(\stdClass $game_info);

    function end_game(\stdClass $game_info);

    function get_history(\stdClass $user_info);

    function new_user(\stdClass $user_info);
}