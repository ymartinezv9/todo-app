# To-Do App

Aplicación web sencilla de gestión de tareas desarrollada como proyecto académico utilizando arquitectura de dos capas.

## Características

- Crear tareas
- Listar tareas
- Marcar tareas como completadas
- Eliminar tareas
- Persistencia de datos con SQLite
- API REST con Node.js y Express

---

# Tecnologías Utilizadas

## Frontend
- HTML5
- CSS3
- JavaScript

## Backend
- Node.js
- Express.js

## Base de Datos
- SQLite

---

# Arquitectura

La aplicación utiliza una arquitectura de dos capas:

```text
Frontend (Cliente)
↓
Backend API REST
↓
Base de Datos SQLite
```

---

# Estructura del Proyecto

```text
todo-app/
│
├── client/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server/
│   ├── app.js
│   ├── package.json
│   ├── database.db
│   └── node_modules/
│
└── README.md
```

---

# Instalación

## 1. Clonar repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

---

## 2. Entrar al proyecto

```bash
cd todo-app
```

---

## 3. Entrar al servidor

```bash
cd server
```

---

## 4. Instalar dependencias

```bash
npm install
```

---

## 5. Ejecutar servidor

```bash
npm run dev
```

---

# Acceso

## Backend

```text
http://localhost:3000
```

## Frontend

Abrir el archivo:

```text
client/index.html
```

---

# Endpoints API

## Obtener tareas

```http
GET /tasks
```

## Crear tarea

```http
POST /tasks
```

## Actualizar tarea

```http
PUT /tasks/:id
```

## Eliminar tarea

```http
DELETE /tasks/:id
```

---

# Funcionalidades CRUD

- Create
- Read
- Update
- Delete

---

# Autor

Lutwing Martinez

---

# Licencia

Proyecto académico con fines educativos.