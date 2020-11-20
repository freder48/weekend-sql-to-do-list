console.log('Hello');

$(document).ready(readyNow);

function readyNow(){
    console.log('Hello from JQ');
    $('#addBtn').on('click', postTask);
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
        $('#taskListBody').append(`<tr>
                                   <td>${item.tasks}</td>
                                   <td>${item.status}</td>
                                   </tr>`);
    }//end for loop
} //end renderTasks

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