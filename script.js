let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* DISPLAY TASKS */
function displayTask(filteredTasks = tasks) {
    const table = document.getElementById("taskTable");
    const output = document.getElementById("titlesOutput");

    table.innerHTML = "";

    filteredTasks.forEach((task, index) => {
        table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${task.name}</td>
                <td>${task.description}</td>
                <td>${task.priority}</td>
                <td>
                    <button class="btn btn-info btn-sm me-1"
                        onclick="editTask(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm"
                        onclick="deleteTask(${index})">Delete</button>
                </td>
            </tr>
        `;
    });

    const titles = tasks.map(t => t.name);
    output.innerText = titles.length
        ? "📌 Task Names: " + titles.join(", ")
        : "Task names will appear here";
}

/* ADD & UPDATE TASK */
document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("task").value.trim();
    const description = document.getElementById("description").value.trim();
    const priority = document.getElementById("priority").value;
    const editIndex = document.getElementById("editIndex").value;

    if (name.length < 3) {
        alert("Task name must be at least 3 characters");
        return;
    }

    if (description.length < 5) {
        alert("Description must be at least 5 characters");
        return;
    }

    if (priority === "") {
        alert("Please select priority");
        return;
    }

    const taskData = { name, description, priority };

    if (editIndex === "-1") {
        tasks.push(taskData);
    } else {
        tasks[editIndex] = taskData;
        document.getElementById("editIndex").value = -1;
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.reset();
    displayTask();
});

/* EDIT TASK */
function editTask(index) {
    const task = tasks[index];

    document.getElementById("task").value = task.name;
    document.getElementById("description").value = task.description;
    document.getElementById("priority").value = task.priority;
    document.getElementById("editIndex").value = index;
}

/* DELETE TASK */
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTask();
}

/* FILTER BY PRIORITY */
document.getElementById("filterPriority").addEventListener("change", function () {
    const value = this.value;

    if (value === "All") {
        displayTask();
    } else {
        const filtered = tasks.filter(task => task.priority === value);
        displayTask(filtered);
    }
});

/* INITIAL LOAD */
displayTask();
