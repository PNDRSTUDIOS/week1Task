let tasks = [];
let editID = null;

const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-input");
const taskDesc = document.getElementById("description");
const attachmentInput = document.getElementById("attachment-input");
const taskList = document.getElementById("task-list");
const submitButton = document.querySelector('button[type="submit"]');

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const file = attachmentInput.files[0];

    if (editID !== null) {
    const taskToUpdate = tasks.find(t => t.id === editID);

    taskToUpdate.title = taskTitle.value;
    taskToUpdate.desc = taskDesc.value;

    if (file) {
        taskToUpdate.image = URL.createObjectURL(file);
    }

    editID = null;
    submitButton.textContent = "Add Task";
} else {

    const newTask = {
        id: Date.now(),
        title: taskTitle.value,
        desc: taskDesc.value,
        image: file ? URL.createObjectURL(file) : ""
    };

    tasks.push(newTask);
}

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

                    <div class="button-group mt-2">

                       <button type="button" class="btn btn-primary btn-sm edit-btn" onclick="editTask(${task.id})">Edit</button>

                        <button type="button" class="btn btn-danger btn-sm delete-btn" onclick="deleteTask(${task.id})">Delete</button>

                    </div>

                </div>

            </div>
        </div>
         `);

    });
}

// Edit Task
function editTask(id) {

    const taskToEdit = tasks.find(t => t.id === id);

    taskTitle.value = taskToEdit.title;
    taskDesc.value = taskToEdit.desc;

    editID = id;

    submitButton.textContent = "Update Task";
}
// Delete Task
function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    renderTasks();

    }
