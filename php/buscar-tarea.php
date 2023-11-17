<?php

    include( "database.php" );

    $search = $_POST['search'];

    if (!empty($search)){
        $query = "SELECT * FROM tareas WHERE name LIKE '$search%'";
        $result = mysqli_query($conn, $query);

        if (!$result) {
            die('hubo un error en la consulta'.mysqli_error($conn));
        }

        $json = array();

        while($row = mysqli_fetch_array($result)){
            $json[] = array(
                "id" => $row['id'],
                "name" => $row['name'],
                "description" => $row['description']
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }

?>