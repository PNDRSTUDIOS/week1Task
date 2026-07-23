const taskForm = document.getElementById("task-form");

taskForm.addEventListener("submit", function(event){

    event.preventDefault();

    console.log("Task Form Submitted Successfully!");

});