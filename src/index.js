//import "./styles.css";
// Get required elements
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const taskCount = document.getElementById("task-count");
const completedBtn = document.getElementById("Completed");
const clearCompleteBtn = document.getElementById("Clear-Complete");
const completeAllBtn = document.getElementById("Complete-all-task");
const uncompleteBtn = document.getElementById("Uncomplete");
const popup = document.getElementById("popup");

// Add event listener to add button
addBtn.addEventListener("click", addTodo);

// Add event listener to todo list for handling checkbox and delete button clicks
todoList.addEventListener("click", handleTodoListClick);

// Add event listener to Completed button
completedBtn.addEventListener("click", markCompletedTasks);

// Add event listener to Clear Complete button
clearCompleteBtn.addEventListener("click", clearCompletedTasks);

// Add event listener to Complete all task button
completeAllBtn.addEventListener("click", completeAllTasks);

// Add event listener to Uncomplete button
uncompleteBtn.addEventListener("click", uncompleteTasks);
// Function to add a new todo item to the list
function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText !== "") {
    const todoItem = createTodoItem(todoText);
    todoList.appendChild(todoItem);
    updateTaskCount();
    todoInput.value = "";
    todoInput.focus();
  }
}

// Function to create a new todo item
function createTodoItem(text) {
  const todoItem = document.createElement("li");
  todoItem.classList.add("todo-item");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  const todoText = document.createElement("span");
  todoText.textContent = text;
  const deleteBtn = document.createElement("span");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "X";
  todoItem.appendChild(checkbox);
  todoItem.appendChild(todoText);
  todoItem.appendChild(deleteBtn);
  return todoItem;
}

// Function to handle checkbox and delete button clicks
function handleTodoListClick(event) {
  const target = event.target;
  if (target.type === "checkbox") {
    const todoItem = target.parentNode;
    todoItem.classList.toggle("checked");
  } else if (target.classList.contains("delete-btn")) {
    const todoItem = target.parentNode;
    todoList.removeChild(todoItem);
    updateTaskCount();
  }
}

// Function to update the task count
function updateTaskCount() {
  const count = todoList.children.length;
  taskCount.textContent = `Total tasks: ${count}`;
}

// Function to mark all completed tasks
function markCompletedTasks() {
  const todoItems = Array.from(todoList.children);
  todoItems.forEach((todoItem) => {
    const checkbox = todoItem.querySelector('input[type="checkbox"]');
    const todoText = todoItem.querySelector("span");
    if (checkbox.checked) {
      todoItem.classList.add("completed");
      checkbox.disabled = true;
      todoItem.style.backgroundColor = "skyblue";
    }
  });
}

// Function to clear all completed tasks
function clearCompletedTasks() {
  const completedItems = todoList.getElementsByClassName("completed");
  while (completedItems.length > 0) {
    todoList.removeChild(completedItems[0]);
  }
  updateTaskCount();
}
// Function to mark all tasks as completed
function completeAllTasks() {
  const todoItems = Array.from(todoList.children);
  todoItems.forEach((todoItem) => {
    const checkbox = todoItem.querySelector('input[type="checkbox"]');
    const todoText = todoItem.querySelector("span");
    checkbox.checked = true;
    todoItem.classList.add("completed");
    todoItem.style.backgroundColor = "skyblue";
    checkbox.disabled = true;
  });
  showPopup();
}
// Function to show the "Great job" pop-up
function showPopup() {
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
  }, 2000);
}

// // Function to uncomplete all tasks
function uncompleteTasks() {
  const todoItems = Array.from(todoList.children);
  todoItems.forEach((todoItem) => {
    const checkbox = todoItem.querySelector('input[type="checkbox"]');
    const todoText = todoItem.querySelector("span");
    if (checkbox.checked && todoItem.style.backgroundColor != "skyblue") {
      checkbox.disabled = false;
      todoItem.classList.remove("completed");
      todoText.style.textDecoration = "none";
      todoItem.style.backgroundColor = "#e26666";
      checkbox.checked = false;
    }
  });
}
