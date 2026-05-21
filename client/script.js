const API_URL = 'http://localhost:3000/tasks';

// Obtener tareas
async function fetchTasks() {

    const response = await fetch(API_URL);

    const tasks = await response.json();

    const tasksContainer = document.getElementById('tasks');

    tasksContainer.innerHTML = '';

    tasks.forEach(task => {

        const div = document.createElement('div');

        div.className = task.completed ? 'task completed' : 'task';

        div.innerHTML = `
            <h3>${task.title}</h3>

            <p>${task.description || ''}</p>

            <button onclick="toggleTask(${task.id}, ${task.completed})">
                ${task.completed ? 'Pendiente' : 'Completar'}
            </button>

            <button onclick="deleteTask(${task.id})">
                Eliminar
            </button>
        `;

        tasksContainer.appendChild(div);
    });
}

// Agregar tarea
async function addTask() {

    const title = document.getElementById('title').value;

    const description = document.getElementById('description').value;

    if (!title) {
        alert('Ingresa un título');
        return;
    }

    await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            description
        })
    });

    document.getElementById('title').value = '';
    document.getElementById('description').value = '';

    fetchTasks();
}

// Eliminar tarea
async function deleteTask(id) {

    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    fetchTasks();
}

// Completar tarea
async function toggleTask(id, completed) {

    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            completed: completed ? 0 : 1
        })
    });

    fetchTasks();
}

// Cargar tareas al iniciar
fetchTasks();