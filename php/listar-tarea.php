<?php
    include("database.php");

    $query = "SELECT * FROM tareas";

    $result = mysqli_query( $conn , $query );
    
    if ( !$result ) {
        die("hubo un error en la conexion ".mysqli_error($conn) );
    }

    $json = array();

    while( $row = mysqli_fetch_array( $result ) ){
        $json[] = array(
            "id" => $row['id'],
            "name" => $row['name'],
            "description" => $row['description']
        );
    }


    $jsonString = json_encode( $json );
    echo $jsonString;

?>