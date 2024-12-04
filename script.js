import { v4 as uuidv4 } from './node_modules/uuid/dist/esm-browser/index.js';

function getTasks() {
    var tasks_string = localStorage.getItem("tasks");
    if (tasks_string === null) {
        localStorage.setItem("tasks", JSON.stringify([]));
    } else {
        var tasks = JSON.parse(tasks_string);
        for (let i = 0; i < tasks.length; i++) {

            let li = document.createElement("li");
            let text = document.createTextNode(tasks[i].taskName);
            li.id = tasks[i].id

            if(tasks[i].checked){
                li.className = "checked"
            }

            li.appendChild(text);
            li.appendChild(createCloseButton());
            document.getElementById("taskUl").appendChild(li);

            attachCloseHandlers();
        }
    }
}

function attachCloseHandlers() {
    var close = document.getElementsByClassName("close");
    for (var i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var taskId = this.parentElement.id;
            removeTaskFromLocalStorage(taskId);
            this.parentElement.remove()
        }
    }
}

function removeTaskFromLocalStorage(id){
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    var filteredTasks = tasks.filter(task => task.id != id)
    localStorage.setItem("tasks",JSON.stringify(filteredTasks))
}


function createCloseButton() {
    var span = document.createElement("SPAN");
    span.className = "close";
    span.innerHTML = "🗑️";
    return span;
}


var list = document.getElementById("taskUl");

list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    const wasCHecked = ev.target.classList.toggle('checked');
    var tasks = JSON.parse(localStorage.getItem("tasks"))
    tasks.forEach(task => {
        if(task.id === ev.target.id){
            task.checked = wasCHecked
            console.log(wasCHecked)
        }
    })
    localStorage.setItem("tasks",JSON.stringify(tasks))
  }
}, false);

document.getElementById('addButton').addEventListener('click', addTask);

function addTask() {
    var input = document.getElementById("taskInput").value
    if(input===''){
        alert("Can't have an empty task")
        return
    }

    var id=uuidv4()

    var newTask = document.createElement("li")

    newTask.id = id
    
    var title = document.createTextNode(input)

    newTask.appendChild(title)

    var tasks = JSON.parse(localStorage.getItem("tasks")) || []

    var cur = {id : id,taskName : input, checked : false}

    tasks.push(cur);

    localStorage.setItem("tasks",JSON.stringify(tasks));

    newTask.appendChild(createCloseButton())

    document.getElementById("taskUl").appendChild(newTask)

    document.getElementById("taskInput").value = "";

    attachCloseHandlers();
}

getTasks();