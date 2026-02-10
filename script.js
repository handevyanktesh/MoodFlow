let selectedMood = "happy";
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const app = document.getElementById("app");
const taskList = document.getElementById("taskList");
const progressBar = document.getElementById("progressBar");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function renderTasks() {
  taskList.innerHTML = "";
  let completed = 0;

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    if (task.done) {
      li.style.textDecoration = "line-through";
      completed++;
    }
li.innerHTML = `
      <span>${task.text} ${task.mood}</span>
      <div>
        <button class="btn btn-sm btn-success me-1">✓</button>
        <button class="btn btn-sm btn-danger">✕</button>
      </div>
    `;

    li.querySelector(".btn-success").onclick = () => {
      task.done = !task.done;
      saveTasks();
      renderTasks();
    };

    li.querySelector(".btn-danger").onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    taskList.appendChild(li);
  });

  const percent = tasks.length ? (completed / tasks.length) * 100 : 0;
  progressBar.style.width = percent + "%";
  progressBar.innerText = Math.round(percent) + "%";
}

document.querySelectorAll(".mood-btn").forEach(btn => {
  btn.onclick = () => {
    selectedMood = btn.dataset.mood;
    app.className = selectedMood;
  };
});

document.getElementById("addTaskBtn").onclick = () => {
  const input = document.getElementById("taskInput");
  if (input.value === "") return;

  tasks.push({ text: input.value, mood: selectedMood, done: false });
  input.value = "";
  saveTasks();
  renderTasks();
};

renderTasks();
