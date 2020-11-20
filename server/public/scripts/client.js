console.log('Hello');

$(document).ready(readyNow);

function readyNow(){
    console.log('Hello from JQ');
    $('#addBtn').on('click', postTask);
    $('#taskListBody').on('click', '.deleteBtn', deleteTask);
    $('#taskListBody').on('click', '.doneBtn', changeStatus);
    getTasks();
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
        $('#taskListBody').append(`<tr data-id="${item.id}">
                                   <td>${item.tasks}</td>
                                   <td>${item.status}</td>
                                   <td><button class="doneBtn">Done!</button></td>
                                   <td><button class="deleteBtn">Delete</button></td>
                                   </tr>`);
    }//end for loop
} //end renderTasks

//start deleteTask
function deleteTask() {
    let taskId = $(this).closest('tr').data('id');
    $.ajax({
      method: 'DELETE', 
      url: `/tasks/${taskId}`
    }).then((function (resposne) {
      getTasks();
    })).catch(function(error){
      console.log('Error in deleting task:', error);
      alert('Something bad happened. Try again later');
    })
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
        // emptyKoalas();
      }).catch( function(error) {
        console.log('Error', error);
        alert('Something bad happened. Try again later.');
      })

}

//start changeStatus function
function changeStatus(){
    let taskId = $(this).closest('tr').data('id');
    console.log(taskId);
    $.ajax({
      method: 'PUT',
      url: `/tasks/${taskId}`, 
      data: taskId
  }).then( function(response) {
      getTasks();
  }).catch( function(error){
      console.log('Error:', error);
      alert('Something bad happened. Try again later');
  })
  }//end changeStatus function