console.log('Hello');

$(document).ready(readyNow);

//start readNow
function readyNow() {
  console.log('Hello from JQ');
  //click handler for add button
  $('#addBtn').on('click', postTask);
  //click handler for delete button
  $('#taskListBody').on('click', '.deleteBtn', deleteTask);
  //click handler for completed check button
  $('#taskListBody').on('click', '.doneBtn', changeStatus);
  //call getTasks to refresh page info right away
  getTasks();
} //end readNow


//start getTasks
function getTasks() {
  console.log('in getTasks');
  // ajax call to server to get tasks
  $.ajax({
    method: 'GET',
    url: '/tasks'
  }).then(function (response) { //run renderTasks once you get okay response
    console.log(response)
    renderTasks(response);
  }).catch(function (error) {
    console.log('Error in client.js GET', error)
  });
} // end getTasks

//start renderTasks
function renderTasks(tasks) {
  //empty so no repeated table items
  $('#taskListBody').empty();
  for (let item of tasks) {
    //append to dom 
    $('#taskListBody').append(`<tr id ="row-${item.id}" data-id="${item.id}" data-status="${item.status}">
                                   <td class="crossOut">${item.tasks}</td>
                                   <td>${item.time_completed}</td>
                                   <td><button class="btn btn-outline-success doneBtn">✓</button></td>
                                   <td><button class="btn btn-outline-danger deleteBtn">X</button></td>
                                   </tr>`);
    //start conditional for completed tasks
    if (item.status === 'Completed') {
      //changes row when item is checked off 
      $(`#row-${item.id}`).addClass('completed');
      //targets the task column to cross off
      $(`#row-${item.id} td:first-child`).css({
        'text-decoration': 'line-through'
      });
    } else {
      $(`#row-${item.id}`);
    }
  } //end for loop
} //end renderTasks

//start deleteTask
function deleteTask() {
  //target desired id 
  let taskId = $(this).closest('tr').data('id');
  //sweetAlert message
  swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this task!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your task has been deleted!", {
          icon: "success",
        });
        $.ajax({
          method: 'DELETE',
          url: `/tasks/${taskId}` //send taskId as a parameter
        }).then((function (response) { //run getTasks after ok response
          getTasks();
        })).catch(function (error) {
          console.log('Error in deleting task:', error);
          alert('Something bad happened. Try again later');
        })
      } else {
        swal("Your task is safe!");
      }
    });
} //end deleteTask


//start postTask function
function postTask() {
  let taskToSend = {
    //collect input values
    tasks: $('#inputTask').val(),
  }
  $.ajax({
    type: 'POST',
    url: '/tasks',
    data: taskToSend
  }).then(function (response) { //once get an okay response from post on task.router.js run getTasks
    getTasks();
    //clear inputs 
    $('#inputTask').val('');
  }).catch(function (error) {
    console.log('Error', error);
    alert('Something bad happened. Try again later.');
  })

}

//start changeStatus function
function changeStatus() {
  //info from data-id taken from renderTasks-only want id data
  let taskId = $(this).closest('tr').data('id');
  //info from data-status taken from renderTasks
  let taskStatus = $(this).closest('tr').data('status');
  console.log(taskStatus);
  $.ajax({
    method: 'PUT',
    //isolate by id
    url: `/tasks/${taskId}`,
    data: {
      //info sent to database to change, send as an object
      taskStatus: taskStatus
    }
  }).then(function (response) { //run get tasks once get an ok response
    getTasks();

  }).catch(function (error) {
    console.log('Error:', error);
    alert('Something bad happened. Try again later');
  })
} //end changeStatus function