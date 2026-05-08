const socket = io();

let editTaskId = null;

checkLogin();

async function registerUser() {

    const username =
        document.getElementById('username').value;

    const password =
        document.getElementById('password').value;

    const response = await fetch('/register', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            username,
            password
        })
    });

    const data = await response.json();

    alert(data.message);
}

async function loginUser() {

    const username =
        document.getElementById('username').value;

    const password =
        document.getElementById('password').value;

    const response = await fetch('/login', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            username,
            password
        })
    });

    const data = await response.json();

    if(response.status === 200){

        localStorage.setItem('loggedIn', 'true');

        document.getElementById('authSection')
            .style.display = 'none';

        document.getElementById('dashboardSection')
            .style.display = 'block';

        loadTasks();

        loadAnalytics();

        alert(data.message);

    } else {

        alert(data.message);
    }
}

function logoutUser(){

    localStorage.removeItem('loggedIn');

    document.getElementById('authSection')
        .style.display = 'block';

    document.getElementById('dashboardSection')
        .style.display = 'none';
}

function checkLogin(){

    if(localStorage.getItem('loggedIn')){

        document.getElementById('authSection')
            .style.display = 'none';

        document.getElementById('dashboardSection')
            .style.display = 'block';

        loadTasks();

        loadAnalytics();
    }
}

document
    .getElementById('taskForm')
    .addEventListener('submit', async function(e) {

    e.preventDefault();

    const title =
        document.getElementById('title').value;

    const description =
        document.getElementById('description').value;

    const priority =
        document.getElementById('priority').value;

    const status =
        document.getElementById('status').value;

    let url = '/add_task';

    let method = 'POST';

    if(editTaskId !== null){

        url = `/update_task/${editTaskId}`;

        method = 'PUT';
    }

    const response = await fetch(url, {

        method: method,

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            title,
            description,
            priority,
            status
        })
    });

    const data = await response.json();

    alert(data.message);

    editTaskId = null;

    document.getElementById('taskForm').reset();

    loadTasks();

    loadAnalytics();
});

async function loadTasks() {

    const response = await fetch('/get_tasks');

    const tasks = await response.json();

    let output = '';

    tasks.forEach(task => {

        output += `

            <div class="task-card">

                <h3>${task.title}</h3>

                <p>${task.description}</p>

                <p><b>Priority:</b> ${task.priority}</p>

                <p><b>Status:</b> ${task.status}</p>

                <button onclick="editTask(
                    ${task.id},
                    '${task.title}',
                    '${task.description}',
                    '${task.priority}',
                    '${task.status}'
                )">

                    Edit

                </button>

                <button onclick="deleteTask(${task.id})">

                    Delete

                </button>

            </div>
        `;
    });

    document.getElementById('taskList')
        .innerHTML = output;
}

async function loadAnalytics(){

    const response = await fetch('/analytics');

    const data = await response.json();

    document.getElementById('analyticsBox').innerHTML = `

        <div class="analytics-card">
            Total Tasks
            <h2>${data.total_tasks}</h2>
        </div>

        <div class="analytics-card">
            Completed
            <h2>${data.completed_tasks}</h2>
        </div>

        <div class="analytics-card">
            Pending
            <h2>${data.pending_tasks}</h2>
        </div>

        <div class="analytics-card">
            Completion %
            <h2>${data.completion_percentage}%</h2>
        </div>
    `;
}

function editTask(id, title, description, priority, status) {

    editTaskId = id;

    document.getElementById('title').value = title;

    document.getElementById('description').value = description;

    document.getElementById('priority').value = priority;

    document.getElementById('status').value = status;
}

async function deleteTask(id) {

    const response = await fetch(`/delete_task/${id}`, {

        method: 'DELETE'
    });

    const data = await response.json();

    alert(data.message);

    loadTasks();

    loadAnalytics();
}

socket.on('new_task', function(data) {

    alert("Real-time update: New task added -> " + data.title);

});