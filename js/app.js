let tasks = loadTasks();
let currentFilter = "all";

// ELEMENTS
const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priority");
const dueDateInput = document.getElementById("dueDate");
const addTaskBtn = document.getElementById("addTaskBtn");

const filterButtons = document.querySelectorAll(".filter-btn");

// INITIAL RENDER
renderTasks(tasks, currentFilter);

// ADD TASK
addTaskBtn.addEventListener("click", addTask);

function addTask(){

  const text = taskInput.value.trim();

  if(text === ""){
    alert("Please enter a task");
    return;
  }

  const task = {
    id: generateId(),
    text,
    priority: priorityInput.value,
    dueDate: dueDateInput.value,
    completed: false
  };

  tasks.push(task);

  saveTasks(tasks);

  renderTasks(tasks, currentFilter);

  taskInput.value = "";
  dueDateInput.value = "";
}

// DELETE
function deleteTask(id){

  tasks = tasks.filter(task => task.id !== id);

  saveTasks(tasks);

  renderTasks(tasks, currentFilter);
}

// TOGGLE
function toggleTask(id){

  tasks = tasks.map(task =>
    task.id === id
      ? { ...task, completed: !task.completed }
      : task
  );

  saveTasks(tasks);

  renderTasks(tasks, currentFilter);
}

// EDIT
function editTask(id){

  const task = tasks.find(task => task.id === id);

  const updatedText = prompt("Edit Task", task.text);

  if(updatedText === null) return;

  task.text = updatedText;

  saveTasks(tasks);

  renderTasks(tasks, currentFilter);
}

// FILTER
filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    document
      .querySelector(".filter-btn.active")
      .classList.remove("active");

    button.classList.add("active");

    currentFilter = button.dataset.filter;

    renderTasks(tasks, currentFilter);
  });

});

// SEARCH
document
  .getElementById("searchInput")
  .addEventListener("keyup", () => {
    renderTasks(tasks, currentFilter);
  });

// CLEAR COMPLETED
document
  .getElementById("clearCompleted")
  .addEventListener("click", () => {

    tasks = tasks.filter(task => !task.completed);

    saveTasks(tasks);

    renderTasks(tasks, currentFilter);
  });

// DARK MODE
document
  .getElementById("themeToggle")
  .addEventListener("click", () => {

    document.body.classList.toggle("light-mode");
  });

// ENTER KEY
taskInput.addEventListener("keypress", e => {

  if(e.key === "Enter"){
    addTask();
  }

});