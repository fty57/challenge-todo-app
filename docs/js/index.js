/*==================== TODO ====================*/
const inputBox = document.getElementById('todo-input');
const todoContainer = document.getElementById('todo-container');

function countRemainingTasks() {
  var todoList = document.getElementById("todo-container");
  var tasks = todoList.getElementsByTagName("li");
  var remainingTasks = 0;

  for (var i = 0; i < tasks.length; i++) {
    if (!tasks[i].classList.contains("checked")) {
      remainingTasks++;
    }
  }

  return remainingTasks;
}

function updateItemsLeft() {
  var itemsLeftDiv = document.querySelector(".items-left");
  var remaining = countRemainingTasks();
  itemsLeftDiv.textContent = remaining + " items restantes";
}

function addTodoItem() {
  if (inputBox.value === '') {
    alert('You must write something!');
  }
  else {
    let li = document.createElement('li');
    li.innerHTML = inputBox.value;
    todoContainer.appendChild(li);
    let span = document.createElement('span');
    span.innerHTML = '\u00d7';
    li.appendChild(span);
  }
  inputBox.value = '';
  saveData();
}

function filterTasks(filterOption) {
  var todoList = document.getElementById("todo-container");
  var tasks = todoList.getElementsByTagName("li");

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];

    if (filterOption === "active") {
      if (task.classList.contains("checked")) {
        task.classList.add("hidden");
      } else {
        task.classList.remove("hidden");
      }
    } else if (filterOption === "checked") {
      if (task.classList.contains("checked")) {
        task.classList.remove("hidden");
      } else {
        task.classList.add("hidden");
      }
    } else {
      // Mostrar todas as tarefas
      task.classList.remove("hidden");
    }
  }
}

function clearCompletedTasks() {
  var todoList = document.getElementById("todo-container");
  var tasks = todoList.getElementsByTagName("li");

  for (var i = tasks.length - 1; i >= 0; i--) {
    var task = tasks[i];

    if (task.classList.contains("checked")) {
      task.remove();
    }
  }
}

function saveData() {
  localStorage.setItem('data', todoContainer.innerHTML);
}

function showTask() {
  todoContainer.innerHTML = localStorage.getItem('data');
}

var itemsStatuses = document.querySelector(".items-statuses");

itemsStatuses.addEventListener("click", function (e) {
  if (e.target.tagName === "SPAN") {
    var filterOption = e.target.textContent.toLowerCase();
    filterTasks(filterOption);
  }
});

var itemsClear = document.querySelector(".items-clear");

itemsClear.addEventListener("click", function () {
  clearCompletedTasks();
});

todoContainer.addEventListener('click', function (e) {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
    saveData();
  }
  else if (e.target.tagName === 'SPAN') {
    e.target.parentElement.remove()
    saveData();
  }
}, false);

showTask();
updateItemsLeft();
setInterval(updateItemsLeft, 1000);

/*==================== PARALLAX SCRIPT ====================*/
window.addEventListener('scroll', e => {
  document.body.style.cssText = `--scrollTop: ${this.scrollY}px`
})