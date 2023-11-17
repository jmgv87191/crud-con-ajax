<?php

    $servername = 'localhost';
    $user = 'root';
    $password = '';
    $database = 'pruebas';

    $conn = new mysqli( $servername, $user, $password, $database  );

    if ($conn->connect_error) {
        die( "error en la conexion". $conn->connect_error );
    }else{
        echo "conexion exitosa";
    }

?>