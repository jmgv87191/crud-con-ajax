$(function(){
    
    $("#task-result").hide();

    $('#search').keyup(()=>{
        let search = $('#search').val();
        $.ajax({
            url: './php/buscar-tarea.php',
            data: { search },
            type: 'post',
            success: function( response ){
                if (!response.error) {
                    let tasks = response;
                    console.log( JSON.parse(tasks))
                }
            }
        })
    })

})