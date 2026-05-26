let inputTask = document.getElementById("todo-input");
let addbtn = document.getElementById("add-btn");
let lsTodo = document.getElementById("todo-list");
let taskHeader = document.getElementById("task-header");

let todos = [];
let editIndex = null;

setInterval(() => {
  let date = new Date();
  taskHeader.innerHTML = `My Tasks ${date.getDate()}-${date.getMonth()}-${date.getFullYear()} (${date.getHours().toString().length === 1 ? "0" + date.getHours() : date.getHours()}:${date.getMinutes().toString().length === 1 ? "0" + date.getMinutes() : date.getMinutes()}:${date.getSeconds().toString().length === 1 ? "0" + date.getSeconds() : date.getSeconds()})`;
}, 1000);

inputTask.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    if (inputTask.value.trim() === "") {
      return;
    } else {
      addList();
    }
  }
});

addbtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (inputTask.value.trim() === "") {
    return;
  } else {
    addList();
  }
});

function addList() {
  if (addbtn.textContent === "Add") {
    todos.push({ text: inputTask.value.trim(), isCompleted: false });
  } else {
    todos[editIndex].text = inputTask.value;
    renderLists();
    addbtn.textContent = "Add";
  }
  renderLists();
}

function renderLists() {
  clearField();
  todos.forEach((todo, index) => {
    let liElement = document.createElement("li");
    liElement.className = `todo-item ${todo.isCompleted ? "completed" : ""}`;

    liElement.innerHTML = `
                    <span class="todo-text">${todo.text}</span>
                    <div class="action-btns">
                        <button class="btn complete-btn" onclick="toggleComplete(${index})">
                            ${todo.isCompleted ? "Undo" : "Done"}
                        </button>
                        <button class="btn edit-btn" onclick="${todo.isCompleted} ? '' : editTodo(${index})">Edit</button>
                        <button class="btn delete-btn" onclick="${todo.isCompleted} ? '' : deleteTodo(${index})">Delete</button>
                    </div>
                `;
    lsTodo.appendChild(liElement);
  });
}

function clearField() {
  inputTask.value = "";
  lsTodo.innerHTML = "";
}

function toggleComplete(index) {
  todos[index].isCompleted = !todos[index].isCompleted;
  renderLists();
}

function editTodo(index) {
  inputTask.value = todos[index].text;
  inputTask.focus();
  inputTask.select();
  editIndex = index;
  addbtn.textContent = "Update";
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderLists();
}
