<?php

include ("database.php");

if (isset($_POST["id"])) {
    $id = $_POST["id"];



    $query = "DELETE FROM tareas WHERE id = $id ";

    $result = mysqli_query( $conn, $query );

    if (!result) {
        die( "hubo un error" . mysqli_error( $conn ) );
    }

    echo " Se elimino corractamente";

}

?>