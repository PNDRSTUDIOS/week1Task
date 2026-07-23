// Store all tasks
let tasks = [];

// Select HTML elements
const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("title");
const taskDesc = document.getElementById("description");
const attachmentInput = document.getElementById("image");
const taskList = document.getElementById("task-list");

// Form submit
taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const file = attachmentInput.files[0];

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

// Render task cards
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

                    ${task.image ? `<img src="${task.image}" class="task-image">` : ""}
                </div>
            </div>
        `);

    });

}