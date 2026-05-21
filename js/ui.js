function renderTasks(tasks, filter){

  const taskList = document.getElementById("taskList");
  const search = document.getElementById("searchInput").value.toLowerCase();

  let filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(search)
  );

  if(filter === "active"){
    filteredTasks = filteredTasks.filter(task => !task.completed);
  }

  if(filter === "completed"){
    filteredTasks = filteredTasks.filter(task => task.completed);
  }

  taskList.innerHTML = filteredTasks.map(task => `

    <div class="task">

      <div class="task-left">

        <input type="checkbox"
        ${task.completed ? "checked" : ""}
        onchange="toggleTask(${task.id})">

        <div>

          <p class="${task.completed ? "completed" : ""}">
            ${task.text}
          </p>

          <small>📅 ${task.dueDate || "No Date"}</small>

        </div>

        <span class="priority ${task.priority.toLowerCase()}">
          ${task.priority}
        </span>

      </div>

      <div class="task-actions">

        <button class="edit-btn"
        onclick="editTask(${task.id})">
          Edit
        </button>

        <button class="delete-btn"
        onclick="deleteTask(${task.id})">
          Delete
        </button>

      </div>

    </div>

  `).join("");

  updateStats(tasks);
}

function updateStats(tasks){

  document.getElementById("totalTasks").textContent =
    tasks.length;

  document.getElementById("completedTasks").textContent =
    tasks.filter(task => task.completed).length;

  document.getElementById("activeTasks").textContent =
    tasks.filter(task => !task.completed).length;
}