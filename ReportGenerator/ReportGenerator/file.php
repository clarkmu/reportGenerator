<?php
header('Content-Type: application/json');

try {

    //  /home/clarkmu/Downloads/text.txt

    $file = fopen($_POST['path'], 'r') or die("Unable to open file");

    $lines = [];

    while(!feof($file))
        array_push($lines, fgetcsv($file));

    fclose($file);

    echo json_encode($lines);

}catch(Exception $e){ }