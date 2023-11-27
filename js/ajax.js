$(function(){
    $("#task-result").hide();
    fetchTask();
    let edit = false;

    $('#search').keyup(()=>{
        if ($("#search").val()) {
            let search = $('#search').val();
            $.ajax({
                url: './php/buscar-tarea.php',
                data: { search },
                type: 'post',
                success: function( response ){
                    if (!response.error) {
                        let tasks = JSON.parse(response);
                        let template = ``;
                        tasks.forEach(task => {
                            template += `<li><a href="#" class="task-item" > ${task.name} </a></li> `
                        });
                        $("#task-result").show();
                        $("#container").html(template);
                    }
                }
            })
        }
    })

    $('#task-form').submit( e =>{
        e.preventDefault();
        const postData = {
            name: $("#name").val(),
            description: $("#description").val(),
            id: $("#taskId").val()
        }

        const url = edit === false ? "php/agregar-tarea.php": "php/editar-tarea.php";
        $.ajax({
            url: url,
            data:  postData ,
            type: "post",
            success: function( response ){
                if (!response.error) {
                    fetchTask();
                    $("#task-form").trigger("reset")
                    console.log(response)
                }
            }
        })
    })

    function fetchTask(){

        $.ajax({
            type: "get",
            url: "php/listar-tarea.php",
            data: { },
            success: function( response){
                const tasks = JSON.parse(response);
                let template = ``;
                tasks.forEach( task =>{
                    template += `
                    <tr  taskId = '${task.id}' >
                        <td>${task.id}</td>
                        <td>${task.name}</td>
                        <td>${task.description}</td>
                        <td> 
                            <button class = "btn btn-danger task-delete me-2">   Eliminar </buton>
                            <button class = "btn btn-warning task-item">   Editar </buton>
                        </td>
                    </tr>
                    `;
                });
                $("#tasks").html( template );
            }
        })
    }

    $(document).on("click",".task-delete",()=>{
        if (confirm("seguro que quieres eliminar esa tarea")) {
            const element = $(this)[0].activeElement.parentElement.parentElement;
            const id = $(element).attr("taskId");
            $.post("php/eliminar-tarea.php", {id}, ()=>{
                fetchTask();
            } )
        }
    })

    $(document).on("click",".task-item",()=>{
        const element = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(element).attr("taskId");
        let url = "php/obtener-una-tarea.php"
        $.ajax({
            type: "post",
            url,
            data: { id },
            success: function( response ){
                if (!response.error) {
                    const task = JSON.parse(response)
                    $("#name").val (task.name)
                    $("#description").val (task.description)
                    $("#taskId").val (task.id)
                    edit = true;
                }
            }
        })
    })

    let btn_enviar = document.querySelector('.btn_enviar');

    btn_enviar.addEventListener('click',()=>{
        setTimeout(() => {
            edit= false
        }, 100);
    })

})