document.addEventListener('DOMContentLoaded', loadTasks);  

const taskInput = document.getElementById('taskInput');  
const addTaskButton = document.getElementById('addTaskButton');  
const taskList = document.getElementById('taskList');  

// Event listener for adding tasks  
addTaskButton.addEventListener('click', addTask);  

function addTask() {  
    const taskText = taskInput.value.trim();  

    if (taskText === '') {  
        alert('Please enter a task.');  
        return;  
    }  

    const taskItem = document.createElement('li');  
    const taskContent = document.createElement('span');  
    taskContent.innerText = taskText;  

    // Create a container for the buttons  
    const taskActions = document.createElement('div');  
    taskActions.className = 'task-actions';  

    // Mark as completed button  
    const markButton = document.createElement('button');  
    markButton.innerText = 'Mark as Completed';  
    markButton.className = 'mark';  
    markButton.addEventListener('click', () => {  
        taskContent.classList.toggle('completed'); // Toggle completed state  
        saveTasks();  // Save tasks to localStorage  
    });  

    // Delete button  
    const deleteButton = document.createElement('button');  
    deleteButton.innerText = 'Delete';  
    deleteButton.className = 'delete';  
    deleteButton.addEventListener('click', () => {  
        taskItem.remove();  
        saveTasks();  
    });  

    // Append content and buttons to the list item  
    taskActions.appendChild(markButton);  
    taskActions.appendChild(deleteButton);  
    taskItem.appendChild(taskContent);  
    taskItem.appendChild(taskActions);  
    taskList.appendChild(taskItem);  
    taskInput.value = ''; // Clear the input field  
    saveTasks();  // Save tasks to localStorage  
}  

function saveTasks() {  
    const tasks = [];  
    document.querySelectorAll('li').forEach(task => {  
        const taskContent = task.querySelector('span');  
        tasks.push({  
            text: taskContent.innerText,  
            completed: taskContent.classList.contains('completed')  
        });  
    });  
    localStorage.setItem('tasks', JSON.stringify(tasks));  
}  

function loadTasks() {  
    const tasks = JSON.parse(localStorage.getItem('tasks'));  
    if (tasks) {  
        tasks.forEach(task => {  
            const taskItem = document.createElement('li');  
            const taskContent = document.createElement('span');  
            taskContent.innerText = task.text;  

            if (task.completed) {  
                taskContent.classList.add('completed');  
            }  

            // Create a container for the buttons  
            const taskActions = document.createElement('div');  
            taskActions.className = 'task-actions';  

            // Mark as completed button  
            const markButton = document.createElement('button');  
            markButton.innerText = 'Mark as Completed';  
            markButton.className = 'mark';  
            markButton.addEventListener('click', () => {  
                taskContent.classList.toggle('completed');  
                saveTasks();  
            });  

            // Delete button  
            const deleteButton = document.createElement('button');  
            deleteButton.innerText = 'Delete';  
            deleteButton.className = 'delete';  
            deleteButton.addEventListener('click', () => {  
                taskItem.remove();  
                saveTasks();  
            });  

            // Append content and buttons to the list item  
            taskActions.appendChild(markButton);  
            taskActions.appendChild(deleteButton);  
            taskItem.appendChild(taskContent);  
            taskItem.appendChild(taskActions);  
            taskList.appendChild(taskItem);  
        });  
    }  
}