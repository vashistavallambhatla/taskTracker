import { v4 as uuidv4 } from './node_modules/uuid/dist/esm-browser/index.js';

function getTasks() {
    let tasks_string = localStorage.getItem("tasks");
    if (tasks_string === null) {
        localStorage.setItem("tasks", JSON.stringify([]));
    } else {
        let tasks = JSON.parse(tasks_string);
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
    let close = document.getElementsByClassName("close");
    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            let taskId = this.parentElement.id;
            removeTaskFromLocalStorage(taskId);
            this.parentElement.remove()
        }
    }
}

function removeTaskFromLocalStorage(id){
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let filteredTasks = tasks.filter(task => task.id != id)
    localStorage.setItem("tasks",JSON.stringify(filteredTasks))
}


function createCloseButton() {
    let span = document.createElement("SPAN");
    span.className = "close";
    span.innerHTML = "🗑️";
    return span;
}


let list = document.getElementById("taskUl");

list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    const wasCHecked = ev.target.classList.toggle('checked');
    let tasks = JSON.parse(localStorage.getItem("tasks"))
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
    let input = document.getElementById("taskInput").value
    if(input===''){
        alert("Can't have an empty task")
        return
    }

    let id=uuidv4()

    let newTask = document.createElement("li")

    newTask.id = id
    
    let title = document.createTextNode(input)

    newTask.appendChild(title)

    let tasks = JSON.parse(localStorage.getItem("tasks")) || []

    let cur = {id : id,taskName : input, checked : false}

    tasks.push(cur);

    localStorage.setItem("tasks",JSON.stringify(tasks));

    newTask.appendChild(createCloseButton())

    document.getElementById("taskUl").appendChild(newTask)

    document.getElementById("taskInput").value = "";

    attachCloseHandlers();
}

getTasks();
