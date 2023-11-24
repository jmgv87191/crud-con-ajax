<?php 

include("database.php");

if (isset($_POST['id'])) {

    $task_id = $_POST['id'];
    $task_name = $_POST['name'];
    $task_description = $_POST['description'];

    $query = "UPDATE tareas SET name = '$task_name', description = '$task_description' WHERE id = '$task_id' ";

    $result = mysqli_query( $conn, $query);

    if (!$result) {
        die("hubo un error". mysqli_error($conn) );
    }

    echo "La tarea a sido actualizada";

}

?>