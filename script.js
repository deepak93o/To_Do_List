document.addEventListener("DOMContentLoaded", function () {
    setInterval(updateTime, 1000);
    loadTasks();
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
});

function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleString();
    document.getElementById('time').textContent = timeString;
}

let editMode = false;
let currentTask;

function ad() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const taskList = document.getElementById('taskList');

        if (editMode) {
            currentTask.firstChild.nodeValue = taskText;
            editMode = false;
            currentTask = null;
        } else {
            const listItem = document.createElement('li');
            listItem.textContent = taskText;

            const buttonsDiv = document.createElement('div');
            buttonsDiv.classList.add('buttons');

            const completeButton = document.createElement('button');
            completeButton.innerHTML = '<i class="fas fa-check"></i>';
            completeButton.onclick = function () {
                listItem.classList.toggle('completed');
                saveTasks();
            };

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
            deleteButton.onclick = function () {
                taskList.removeChild(listItem);
                clearReminder(listItem.reminderId);
                saveTasks();
            };

            listItem.ondblclick = function () {
                editTask(listItem);
            };

            buttonsDiv.appendChild(completeButton);
            buttonsDiv.appendChild(deleteButton);
            listItem.appendChild(buttonsDiv);
            taskList.appendChild(listItem);

          
            listItem.reminderId = setReminder(taskText);
        }

        taskInput.value = '';
        saveTasks();
    }
}


function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}


function editTask(listItem) {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = listItem.firstChild.nodeValue.trim();
    editMode = true;
    currentTask = listItem;
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push({
            text: li.childNodes[0].nodeValue.trim(),
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.textContent = task.text;

        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons');

        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.onclick = function () {
            listItem.classList.toggle('completed');
            saveTasks();
        };

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.onclick = function () {
            taskList.removeChild(listItem);
            clearReminder(listItem.reminderId);
            saveTasks();
        };

        listItem.ondblclick = function () {
            editTask(listItem);
        };

        if (task.completed) {
            listItem.classList.add('completed');
        }

        buttonsDiv.appendChild(completeButton);
        buttonsDiv.appendChild(deleteButton);
        listItem.appendChild(buttonsDiv);
        taskList.appendChild(listItem);
    });
}

const taskInput = document.getElementById('taskInput');
taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        ad();
    }
});

function setReminder(taskText) {
    const reminderSound = document.getElementById('reminderSound');
    const reminderId = setTimeout(function () {
        reminderSound.play();
        reminderSound.loop = true; // Loop the sound

        alert(`Reminder: ${taskText}`);

        reminderSound.pause();
        reminderSound.currentTime = 0; 
        reminderSound.loop = false; 
    }, 3600000); 
    return reminderId;
}

function clearReminder(reminderId) {
    clearTimeout(reminderId);
}



function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    setInterval(updateTime, 1000);
    loadTasks();

   
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
});
