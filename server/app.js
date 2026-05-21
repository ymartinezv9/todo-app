const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Conexión a SQLite
const db = new Database('database.db');

console.log('Conectado a SQLite');

// Crear tabla si no existe
db.prepare(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        completed INTEGER DEFAULT 0
    )
`).run();

// Ruta principal
app.get('/', (req, res) => {
    res.send('API funcionando');
});

// Obtener todas las tareas
app.get('/tasks', (req, res) => {

    try {

        const tasks = db.prepare(
            'SELECT * FROM tasks ORDER BY id DESC'
        ).all();

        res.json(tasks);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

// Crear tarea
app.post('/tasks', (req, res) => {

    try {

        const { title, description } = req.body;

        if (!title) {

            return res.status(400).json({
                error: 'El título es obligatorio'
            });
        }

        const result = db.prepare(
            'INSERT INTO tasks (title, description) VALUES (?, ?)'
        ).run(title, description);

        res.json({
            id: result.lastInsertRowid,
            title,
            description,
            completed: 0
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

// Actualizar estado de tarea
app.put('/tasks/:id', (req, res) => {

    try {

        const id = req.params.id;

        const { completed } = req.body;

        db.prepare(
            'UPDATE tasks SET completed = ? WHERE id = ?'
        ).run(completed, id);

        res.json({
            message: 'Tarea actualizada'
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

// Eliminar tarea
app.delete('/tasks/:id', (req, res) => {

    try {

        const id = req.params.id;

        db.prepare(
            'DELETE FROM tasks WHERE id = ?'
        ).run(id);

        res.json({
            message: 'Tarea eliminada'
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});