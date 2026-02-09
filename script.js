let selectedMood = "happy";
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const app = document.getElementById("app");
const taskList = document.getElementById("taskList");
const progressBar = document.getElementById("progressBar");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}