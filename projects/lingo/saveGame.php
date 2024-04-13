<?php

use FFI\Exception;


function handlePostRequest() {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        $host = $_SERVER['HTTP_HOST'];
        $path = "/projects/lingo";
        $redirect_url = "https://$host$path";
        header("Location: $redirect_url");
        exit();
    }
    $postBody = file_get_contents('php://input');
    savePlayedGame($postBody, getGameFullFileName());

}

function savePlayedGame($gameData, $filename) {
    try {
        $directory = './playedGames';
        if (!is_dir($directory)) {
            mkdir($directory, 0777, true);
        }

        $playedGames = getPlayedGames($filename) ?? [];
        $playedGames[] = json_decode($gameData);
        $json_data = json_encode($playedGames, JSON_PRETTY_PRINT);

        file_put_contents("./playedGames/$filename", $json_data);
    } catch(Exception $ex) { }
}

function getPlayedGames($fileName) {
    $fullPath = './playedGames/'.$fileName;

    if (file_exists($fullPath)) {
        $json_data = file_get_contents($fullPath);
        return json_decode($json_data, true);
    } else {
       return null;
    }
}

function getGameFullFileName() {
    $playedGameFileName = 'playedGames';
    $currentDate = date('Y-m-d');
    $playedGameFileType = 'json';
    return $playedGameFileName.'_'.$currentDate.'.'.$playedGameFileType;
}

handlePostRequest();

?>