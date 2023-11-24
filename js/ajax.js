$(function(){
    $("#task-result").hide();
    fetchTask();

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
        }
        $.ajax({
            url: "php/agregar-tarea.php",
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
                    <tr>
                        <td>${task.id}</td>
                        <td>${task.name}</td>
                        <td>${task.description}</td>
                    </tr>
                    `;
                });
                $("#tasks").html( template );
            }
        })
    }

})