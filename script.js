
let tasks = [];
let editingTaskId = null;


const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("title");
const taskDesc = document.getElementById("description");
const attachmentInput = document.getElementById("image");
const taskList = document.getElementById("task-list");
const submitButton = taskForm.querySelector("button[type='submit']");


taskForm.addEventListener("submit", function(event) {


    event.preventDefault();

    const file = attachmentInput.files[0];
    if (editingTaskId !== null) {
    const taskToUpdate = tasks.find(t => t.id === editingTaskId);

    taskToUpdate.title = taskTitle.value;
    taskToUpdate.desc = taskDesc.value;
    if (file) {
        taskToUpdate.image = URL.createObjectURL(file);
    }

    editingTaskId = null;
    submitButton.textContent = "Add Task";

    renderTasks();
    taskForm.reset();
    return;
}

    const newTask = {
        id: Date.now(),
        title: taskTitle.value,
        desc: taskDesc.value,
        image: file ? URL.createObjectURL(file) : ""
    };

    tasks.push(newTask);

    renderTasks();

    taskForm.reset();
});


function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task) {

        taskList.insertAdjacentHTML("beforeend", `
            <div class="task-card">
                <div class="card-content">
                    <div class="text">
                        <h3>${task.title}</h3>
                        <p>${task.desc}</p>
                    </div>
                    <div class="right-side">

                    ${task.image ? `<img src="${task.image}" class="task-image">` : ""}
                <div class="button-group">
                <button data-id="${task.id}" onclick="editTask(event)">Edit</button>
                <button data-id="${task.id}" onclick="deleteTask(event)">Delete</button>
            </div>
            </div>
        `);

    });

}

const deleteTask = (event) => {
    const taskId = Number(event.target.dataset.id);
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}
const editTask = (event) => {
    const taskId = Number(event.target.dataset.id);

    const taskToEdit = tasks.find(t => t.id === taskId);

    taskTitle.value = taskToEdit.title;
    taskDesc.value = taskToEdit.desc;

    editingTaskId = taskId;

    submitButton.textContent = "Update Task";
};