const input = document.querySelector(".todo-input");
const addBtn = document.querySelector(".todo-meta");
const todoList = document.querySelector(".todo-list");
const form = document.querySelector(".form");

let todos = [];

// stored in localStorage
if (localStorage.getItem("ITEMS")) {
  todos = JSON.parse(localStorage.getItem("ITEMS"));
  renderTodos();
}

form.addEventListener("submit", handleSubmit);
addBtn.addEventListener("click", handleAdd);

// submit todo
function handleSubmit(e) {
  e.preventDefault();
  handleAdd();
  renderTodos();
  input.value = "";
}

// render todos
function renderTodos() {
  const todoItem = document.querySelectorAll(".todo-item");
  todoItem.forEach((item) => item.remove());
  todos.forEach((item) => {
    const template = `<li class="todo-item">
                        <div class="todo-left">
                            <input onChange="toggleTodo(${
                              item.id
                            })" class="todo-checkbox" type="checkbox" ${
      item.completed ? "checked" : ""
    } />
                            <span class="todo-text">${item.text}</span>
                        </div>

                          <span onClick="deleteTodo(${
                            item.id
                          })" class="todo-delete">
                              <i class="fa-solid fa-trash"></i>
                          </span>
                    </li>`;
    todoList.insertAdjacentHTML("beforeend", template);
  });
}

// toggle todo
function toggleTodo(todoId) {
  todos = todos.map((item) =>
    item.id === todoId ? { ...item, completed: !item.completed } : item
  );
  localStorage.setItem("ITEMS", JSON.stringify(todos));
}

// delete todo
function deleteTodo(todoId) {
  todos = todos.filter((item) => item.id !== todoId);
  localStorage.setItem("ITEMS", JSON.stringify(todos));
  renderTodos();
}

// Add todo
function handleAdd() {
  const inputVal = input.value;
  if (!inputVal.trim()) return;
  todos.push({ id: Math.random(), text: inputVal, completed: false });
  localStorage.setItem("ITEMS", JSON.stringify(todos));
  renderTodos();
  input.value = "";
  console.log(todos);
}
