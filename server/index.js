const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const TASKS_FILE = path.join(__dirname, 'tasks.json');

// Load tasks from file if it exists, otherwise start with an empty array
let tasks = [];
try {
  if (fs.existsSync(TASKS_FILE)) {
    const fileContent = fs.readFileSync(TASKS_FILE, 'utf8');
    tasks = JSON.parse(fileContent);
  }
} catch (error) {
  console.error('Failed to load tasks.json:', error.message);
  tasks = [];
}

function saveTasks() {
  try {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf8');
  } catch (error) {
    console.error('Failed to save tasks.json:', error.message);
  }
}

// Middlewares to parse JSON bodies and allow frontend requests
app.use(cors());
app.use(express.json());

// Helper to sort tasks newest first by createdAt timestamp
function sortTasksNewest(taskList) {
  return [...taskList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// GET /tasks - return all tasks sorted by newest first
app.get('/tasks', (req, res) => {
  const search = (req.query.search || '').toLowerCase();
  const filtered = search
    ? tasks.filter((task) => task.title.toLowerCase().includes(search))
    : tasks;
  res.json(sortTasksNewest(filtered));
});

// POST /tasks - create a new task
app.post('/tasks', (req, res) => {
  const { title, description, dueDate, priority } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Title is required.' });
  }

  const newTask = {
    id: Date.now().toString(),
    title: title.trim(),
    description: description?.trim() || '',
    dueDate: dueDate || '',
    completed: false,
    createdAt: new Date().toISOString(),
    priority: priority || 'Medium'
  };

  tasks.push(newTask);
  saveTasks();
  res.status(201).json(newTask);
});

// PUT /tasks/:id - update an existing task
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, completed, priority } = req.body;

  const task = tasks.find((item) => item.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  if (title !== undefined) {
    if (!title.trim()) {
      return res.status(400).json({ error: 'Title cannot be empty.' });
    }
    task.title = title.trim();
  }

  if (description !== undefined) {
    task.description = description.trim();
  }

  if (dueDate !== undefined) {
    task.dueDate = dueDate;
  }

  if (completed !== undefined) {
    task.completed = Boolean(completed);
  }

  if (priority !== undefined) {
    task.priority = priority;
  }

  saveTasks();
  res.json(task);
});

// DELETE /tasks/:id - remove a task by id
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  tasks.splice(index, 1);
  saveTasks();
  res.json({ message: 'Task deleted successfully.' });
});

// Serve the client build in production
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');
  app.use(express.static(clientBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// Catch-all 404 handler for unspecified routes in development
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
