let tasks = [];

document.getElementById('add-task-btn').addEventListener('click', addTask);
document.getElementById('task-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const taskInput = document.getElementById('task-input');
  const taskDescription = taskInput.value.trim();

  if (taskDescription) {
    tasks.push({ description: taskDescription, completed: false });
    taskInput.value = '';
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  const sortedTasks = [
    ...tasks.filter(task => !task.completed),
    ...tasks.filter(task => task.completed)
  ];

  sortedTasks.forEach((task, index) => {
    const taskElement = document.createElement('li');
    taskElement.className = `task ${task.completed ? 'completed' : ''}`;
    taskElement.innerHTML = `
      <span>
        <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${index})">
        ${task.description}
      </span>
      <button onclick="deleteTask(${index})">🗑️</button>
    `;
    taskList.appendChild(taskElement);
  });
}

renderTasks();
