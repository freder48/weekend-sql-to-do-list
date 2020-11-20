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
      renderTasks();
    }).catch(function (error) {
      console.log('Error in client.js GET', error)
    });
  } // end getTasks

function postTask(){
    console.log('Clicked');
    
}