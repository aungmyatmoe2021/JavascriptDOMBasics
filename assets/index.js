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

window.onload = function() {
  loadData();
};

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
  // if (addbtn.textContent === "Add") {
  //   todos.push({ text: inputTask.value.trim(), isCompleted: false });
  // } else {
  //   todos[editIndex].text = inputTask.value;
  //   loadData();
  //   addbtn.textContent = "Add";
  // }
  // loadData();
  if(addbtn.textContent === "Add"){
    if(localStorage.getItem("todolist") === null){
      localStorage.setItem('todolist', JSON.stringify([{ text: inputTask.value.trim(), isCompleted: false }]));
    }else {
      let currentList = JSON.parse(localStorage.getItem("todolist")) || [];
      currentList.push({ text: inputTask.value.trim(), isCompleted: false });
      localStorage.setItem("todolist",JSON.stringify(currentList));
    }
  }else {
    let currentList = JSON.parse(localStorage.getItem("todolist"));
    currentList[editIndex].text = inputTask.value;
    localStorage.setItem("todolist",JSON.stringify(currentList));
    addbtn.textContent = "Add";
  }
  loadData();
}

function loadData() {
  clearField();
  JSON.parse(localStorage.getItem("todolist")).forEach((todo, index) => {
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
  // todos[index].isCompleted = !todos[index].isCompleted;
  let currentList = JSON.parse(localStorage.getItem("todolist"));
  currentList[index].isCompleted = !currentList[index].isCompleted;
  localStorage.setItem("todolist",JSON.stringify(currentList));
  loadData();
}

function editTodo(index) {
  let currentList = JSON.parse(localStorage.getItem("todolist"));
  inputTask.value = currentList[index].text;
  inputTask.focus();
  inputTask.select();
  editIndex = index;
  addbtn.textContent = "Update";
}

function deleteTodo(index) {
  let currentList = JSON.parse(localStorage.getItem("todolist"));
  currentList.splice(index, 1);
  localStorage.setItem("todolist",JSON.stringify(currentList));
  loadData();
}
