
console.log('Hello');

$(document).ready(readyNow);

function readyNow(){
    console.log('Hello from JQ');
    $('#addBtn').on('click', postTask);
    $('#taskListBody').on('click', '.deleteBtn', deleteTask);
    $('#taskListBody').on('click', '.doneBtn', changeStatus);
    getTasks();
    Swal.fire('Hello world!')
}


//start getTasks
function getTasks() {
    console.log('in getTasks');
    // ajax call to server to get tasks
    $.ajax({
      method: 'GET',
      url: '/tasks'
    }).then(function (response) {
      console.log(response)
      renderTasks(response);
    }).catch(function (error) {
      console.log('Error in client.js GET', error)
    });
  } // end getTasks

  //start renderTasks
function renderTasks(tasks){
    $('#taskListBody').empty();
    for (let item of tasks){
        
        $('#taskListBody').append(`<tr id ="row-${item.id}" data-id="${item.id}" data-status="${item.status}">
                                   <td class="crossOut">${item.tasks}</td>
                                   <td>${item.time_completed}</td>
                                   <td><button class="btn btn-outline-success doneBtn">✓</button></td>
                                   <td><button class="btn btn-outline-danger deleteBtn">X</button></td>
                                   </tr>`);

                                
        
        if (item.status === 'Completed') {
            $(`#row-${item.id}`).addClass('completed');
        } else {
            $(`#row-${item.id}`);
        }
                                  
    }//end for loop
} //end renderTasks

//start deleteTask
function deleteTask() {
    let taskId = $(this).closest('tr').data('id');
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this task!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary task has been deleted!", {
          icon: "success",
        });
        $.ajax({
          method: 'DELETE', 
          url: `/tasks/${taskId}`
        }).then((function (response) {
          getTasks();
        })).catch(function(error){
          console.log('Error in deleting task:', error);
          alert('Something bad happened. Try again later');
        })
      } else {
        swal("Your task is safe!");
      }
    });


  
  }//end deleteTask


//start postTask function
function postTask(){
    let taskToSend = {
        tasks: $('#inputTask').val(),
    }
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskToSend
      }).then( function(response) {
        getTasks();
        $('#inputTask').val('');
      }).catch( function(error) {
        console.log('Error', error);
        alert('Something bad happened. Try again later.');
      })

}

//start changeStatus function
function changeStatus(){
  
    let taskId = $(this).closest('tr').data('id');
    let taskStatus = $(this).closest('tr').data('status');
    console.log(taskStatus);
    $.ajax({
      method: 'PUT',
      url: `/tasks/${taskId}`, 
      data: {taskStatus: taskStatus}
  }).then( function(response) {
      getTasks();
      
  }).catch( function(error){
      console.log('Error:', error);
      alert('Something bad happened. Try again later');
  })
  }//end changeStatus function