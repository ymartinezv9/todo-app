const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Conexión SQLite
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Conectado a SQLite');
    }
});

// Crear tabla
db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        completed INTEGER DEFAULT 0
    )
`);

// Ruta principal
app.get('/', (req, res) => {
    res.send('API funcionando');
});

// Obtener tareas
app.get('/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(rows);
        }
    });
});

// Crear tarea
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;

    db.run(
        'INSERT INTO tasks (title, description) VALUES (?, ?)',
        [title, description],
        function(err) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json({
                    id: this.lastID,
                    title,
                    description,
                    completed: 0
                });
            }
        }
    );
});

// Actualizar tarea
app.put('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const { completed } = req.body;

    db.run(
        'UPDATE tasks SET completed = ? WHERE id = ?',
        [completed, id],
        function(err) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json({
                    message: 'Tarea actualizada'
                });
            }
        }
    );
});

// Eliminar tarea
app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;

    db.run(
        'DELETE FROM tasks WHERE id = ?',
        [id],
        function(err) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json({
                    message: 'Tarea eliminada'
                });
            }
        }
    );
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});