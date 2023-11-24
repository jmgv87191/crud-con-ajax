<?php

    include("database.php");

    if (isset($_POST["name"])) {
        $task_name = $_POST["name"];
        $task_description = $_POST["description"];

        $query = "INSERT INTO tareas (name, description) VALUES ('$task_name', '$task_description')";
        $result = mysqli_query($conn, $query);

        if (!$result) {
            die("Hubo un error en la consulta".mysqli_error($conn));
        }

        echo "Tarea agregada";


    }

?>