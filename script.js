
let tasks = [];
let editingTaskId = null;

const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");
const taskDesc = document.getElementById("task-desc");
const taskList = document.getElementById("task-list");
const taskImage = document.getElementById("image");

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task) {
        const taskHTML = `<div class="task-item">
            ${
                task.image
                    ? `
                <div class="image-container">
                    <img src="${task.image}" class="task-image">
                </div>
                `
                    : ""
            }
            <h3>${task.title}</h3>
            <p>${task.desc}</p>

            <button
                data-id="${task.id}"
                onclick="editTask(event)">
                Edit
           </button>

            <button
                data-id="${task.id}"
                onclick="deleteTask(event)">
                Delete
            </button>
        </div>`;

        taskList.insertAdjacentHTML("beforeend", taskHTML);
    });
}

function deleteTask(event){

    const taskId = Number(event.target.dataset.id);

    tasks = tasks.filter(function(task){
        return task.id !== taskId;
    });

    renderTasks();
}

function editTask(event){

    const taskId = Number(event.target.dataset.id);

    const taskToEdit = tasks.find(function(task){
        return task.id === taskId;
    });

    taskTitle.value = taskToEdit.title;
    taskDesc.value = taskToEdit.desc;

    editingTaskId = taskId;

    document.querySelector("button[type='submit']").textContent = "Update Task";

}

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if(editingTaskId !== null){

    const task = tasks.find(function(task){
        return task.id === editingTaskId;
    });

    task.title = taskTitle.value;
    task.desc = taskDesc.value;

    editingTaskId = null;

    document.querySelector("button[type='submit']").textContent = "Add Task";

    renderTasks();

    taskForm.reset();

    return;
    }
    const imageFile = taskImage.files[0];
    const newTask = {
        id: Date.now(),
        title: taskTitle.value,
        desc: taskDesc.value,
        image: ""
    };

    function addTask(imageData) {
        newTask.image = imageData || "";
        tasks.push(newTask);
        renderTasks();
        taskForm.reset();
    }

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function () {
            addTask(reader.result);
        };
        reader.readAsDataURL(imageFile);
    } else {
        addTask("");
    }
});

