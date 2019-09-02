<?php

namespace chess;

interface ApiInterface {
    function parse_request(String $request) : Array;

    function call_func(Array $parsed_request);
}