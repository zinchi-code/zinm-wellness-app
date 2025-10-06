// --- Affirmations ---
const affirmations = [
  "I am calm and peaceful.",
  "I am capable of achieving my goals.",
  "I choose balance and clarity.",
  "I am growing and glowing every day.",
  "I deserve peace and happiness.",
  "I am enough, just as I am."
];

function newAffirmation() {
  const randomIndex = Math.floor(Math.random() * affirmations.length);
  document.getElementById("affirmation").textContent = affirmations[randomIndex];
}

// Auto-rotate affirmations every 10 seconds
setInterval(newAffirmation, 10000);

// --- To-Do List with localStorage ---
function loadTodos() {
  const saved = JSON.parse(localStorage.getItem("todos")) || [];
  saved.forEach(todo => {
    createTodoElement(todo.text, todo.startTime, todo.endTime, todo.done);
  });
}

function saveTodos() {
  const list = document.querySelectorAll("#todo-list div");
  const todos = [];
  list.forEach(item => {
    const checkbox = item.querySelector("input[type='checkbox']");
    const text = item.querySelector("span").textContent;
    const done = checkbox.checked;
    todos.push({
      text: text.split("(")[0].trim(),
      startTime: item.dataset.start || "",
      endTime: item.dataset.end || "",
      done: done
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function createTodoElement(task, startTime, endTime, done = false) {
  const list = document.getElementById("todo-list");

  const item = document.createElement("div");
  item.dataset.start = startTime;
  item.dataset.end = endTime;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = done;
  checkbox.onchange = () => {
    text.style.textDecoration = checkbox.checked ? "line-through" : "none";
    saveTodos();
  };

  const text = document.createElement("span");
  text.textContent = `${task} ${startTime && endTime ? `(${startTime} - ${endTime})` : ""}`;
  if (done) text.style.textDecoration = "line-through";

  item.appendChild(checkbox);
  item.appendChild(text);
  list.appendChild(item);

  saveTodos();
}

function addTodo() {
  const input = document.getElementById("todo-input");
  const startTime = document.getElementById("start-time").value;
  const endTime = document.getElementById("end-time").value;
  const task = input.value.trim();

  if (task) {
    createTodoElement(task, startTime, endTime);
    input.value = "";
    document.getElementById("start-time").value = "";
    document.getElementById("end-time").value = "";
  }
}

// Load saved todos on page load
window.onload = loadTodos;

