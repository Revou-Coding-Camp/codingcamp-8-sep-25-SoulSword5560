const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const filterSelect = document.getElementById("filterButton");
const todoList = document.getElementById("todoList");

let todos = [];

function renderTodos() {
    const filter = filterSelect.value;
    let filteredTodos = todos;
    
    if (filter === "pending") {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (filter === "completed") {
        filteredTodos = todos.filter(todo => todo.completed);
    }
    
    todoList.innerHTML = "";
    if (filteredTodos.length === 0) {
        todoList.innerHTML = `<tr><td colspan="4" style="text-align:center;">No task found</td></tr>`;
        return;
    }
    
    filteredTodos.forEach((todo, index) => {
        const row = document.createElement("tr");
        
        row.innerHTML = `
        <td class="${todo.completed ? 'status-done' : ''}">${todo.task}</td>
        <td>${todo.date}</td>
        <td>${todo.completed ? "Done" : "Pending"}</td>
        <td>
        <button class="action-btn complete-btn" onclick="toggleComplete(${index})">✓</button>
        <button class="action-btn delete-btn" onclick="deleteTask(${index})">🗑</button>
        </td>
        `;
        
        todoList.appendChild(row);
    });
}

const addBtn = document.getElementById("addTaskButton");

addBtn.addEventListener("click", () => {
    const task = taskInput.value.trim();
    const date = dateInput.value;
    
    if (!task || !date) {
        alert("Please enter both task and due date!");
        return;
  }
  
  todos.push({ task, date, completed: false });
  taskInput.value = "";
  dateInput.value = "";
  renderTodos();
});

// Toggle complete
function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

// Delete task
function deleteTask(index) {
    todos.splice(index, 1);
    renderTodos();
}

// Delete all
const deleteAllBtn = document.getElementById("deleteAllButton");
deleteAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure to delete all tasks?")) {
    todos = [];
    renderTodos();
  }
});

// Re-render ketika filter berubah
filterSelect.addEventListener("change", renderTodos);

// Initial render
renderTodos();
