const socket = io();
document
    .getElementById('taskForm')
    .addEventListener('submit', async function(e) {

    e.preventDefault();

    const title = document.getElementById('title').value;

    const description = document.getElementById('description').value;

    const priority = document.getElementById('priority').value;

    const status = document.getElementById('status').value;

    const response = await fetch('/add_task', {

        method: 'POST',

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

    loadTasks();
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

            </div>
        `;
    });

    document.getElementById('taskList').innerHTML = output;
}

loadTasks();
socket.on('new_task', function(data) {

    alert("Real-time update: New task added -> " + data.title);

});