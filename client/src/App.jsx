import { useEffect, useState, useRef } from 'react';

const BACKEND_URL = 'http://localhost:4000';
const priorities = ['Low', 'Medium', 'High'];

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showHome, setShowHome] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  function showNotification(text) {
    setMessage(text);
    setTimeout(() => setMessage(''), 3000);
  }

  async function fetchTasks() {
    try {
      const response = await fetch(`${BACKEND_URL}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError('Unable to load tasks.');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Task title is required.');
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      dueDate,
      priority
    };

    try {
      if (editingTask) {
        await fetch(`${BACKEND_URL}/tasks/${editingTask.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        showNotification('Task updated successfully.');
      } else {
        await fetch(`${BACKEND_URL}/tasks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        showNotification('Task added successfully.');
      }

      resetForm();
      fetchTasks();
    } catch (err) {
      setError('Unable to save task.');
    }
  }

  function resetForm() {
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('Medium');
    setEditingTask(null);
  }

  function startEdit(task) {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate || '');
    setPriority(task.priority || 'Medium');
  }

  async function handleDelete(taskId) {
    const confirmed = window.confirm('Delete this task?');
    if (!confirmed) return;

    try {
      await fetch(`${BACKEND_URL}/tasks/${taskId}`, { method: 'DELETE' });
      showNotification('Task deleted successfully.');
      fetchTasks();
    } catch (err) {
      setError('Unable to delete task.');
    }
  }

  async function toggleCompleted(task) {
    try {
      await fetch(`${BACKEND_URL}/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed })
      });
      fetchTasks();
      showNotification(task.completed ? 'Marked incomplete.' : 'Marked complete.');
    } catch (err) {
      setError('Unable to update task.');
    }
  }

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'Active') return !task.completed;
      if (filter === 'Completed') return task.completed;
      return true;
    })
    .filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const activeCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.filter((task) => task.completed).length;
  function isOverdue(task) {
    if (!task.dueDate || task.completed) return false;
    return new Date(task.dueDate) < new Date();
  }

  const dueTodayTasks = tasks.filter((task) => {
    if (!task.dueDate || task.completed) return false;
    const due = new Date(task.dueDate);
    const today = new Date();
    return (
      due.getFullYear() === today.getFullYear() &&
      due.getMonth() === today.getMonth() &&
      due.getDate() === today.getDate()
    );
  });

  const upcomingTasks = tasks.filter((task) => {
    if (!task.dueDate || task.completed) return false;
    const due = new Date(task.dueDate);
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7, 23, 59, 59);
    return due >= start && due <= end;
  });

  const tasksRef = useRef(null);

  function handleSeeAllTasks() {
    setShowHome(false);
    setFilter('All');
    setSearchTerm('');
    setTimeout(() => {
      if (tasksRef.current) tasksRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  }

  if (showHome) {
    return (
      <div className="page-shell home-screen">
        <header className="home-nav">
          <div className="brand">TaskManager</div>
        </header>

        <section className="home-hero card">
          <div className="hero-icon">📋</div>
          <h1>Welcome to TaskManager</h1>
          <p className="subtitle">
            A simple task manager to help you plan your day, keep track of tasks, and get things done.
          </p>
          <div className="hero-badges">
            <span className="hero-badge">Add Tasks</span>
            <span className="hero-badge">Set Priorities</span>
            <span className="hero-badge">Track Progress</span>
          </div>
          <button className="hero-button" onClick={() => setShowHome(false)}>
            Open Task Manager
          </button>
        </section>
        
        {/* New: Due Today and Upcoming sections (minimal, non-intrusive) */}
        <section className="due-section">
          <div className="due-card card">
            <h3>Due Today</h3>
            {dueTodayTasks.length === 0 ? (
              <p className="small-muted">No tasks due today.</p>
            ) : (
              <ul className="due-list">
                {dueTodayTasks.map((t) => (
                  <li key={t.id} className="due-item">{t.title} <span className="muted">{t.dueDate}</span></li>
                ))}
              </ul>
            )}
          </div>

          <div className="due-card card">
            <h3>Upcoming (7 days)</h3>
            {upcomingTasks.length === 0 ? (
              <p className="small-muted">No upcoming tasks.</p>
            ) : (
              <ul className="due-list">
                {upcomingTasks.map((t) => (
                  <li key={t.id} className="due-item">{t.title} <span className="muted">{t.dueDate}</span></li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <header className="top-bar">
        <div>
          <h1>Task Manager Dashboard</h1>
          <p className="subtitle">Welcome back! Manage your tasks efficiently.</p>
        </div>
        <div className="header-actions">
          <button className="see-all-btn" onClick={handleSeeAllTasks}>See All Tasks</button>
        </div>
      </header>

      {/* Dashboard Overview Section */}
      <section className="dashboard-overview">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <p className="stat-label">Total Tasks</p>
            <p className="stat-value">{tasks.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <p className="stat-label">Active</p>
            <p className="stat-value">{activeCount}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <p className="stat-label">Completed</p>
            <p className="stat-value">{completedCount}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔔</div>
          <div className="stat-content">
            <p className="stat-label">Due Today</p>
            <p className="stat-value">{dueTodayTasks.length}</p>
          </div>
        </div>
      </section>

      <main>
        <section className="form-panel card">
          <h2>{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
          {message && <div className="message success">{message}</div>}
          {error && <div className="message error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <label>
              Title <span className="required">*</span>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Task title"
              />
            </label>

            <label>
              Description
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Short description"
              />
            </label>

            <div className="row-gap">
              <label>
                Due Date
                <input
                  type="date"
                  value={dueDate}
                  onChange={(event) => setDueDate(event.target.value)}
                />
              </label>

              <label>
                Priority
                <select value={priority} onChange={(event) => setPriority(event.target.value)}>
                  {priorities.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="button-row">
              <button type="submit">{editingTask ? 'Update Task' : 'Add Task'}</button>
              {editingTask && (
                <button type="button" className="secondary" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="filter-panel card" ref={tasksRef}>
          <div className="filter-row">
            <h2>Tasks</h2>
            <div className="filter-buttons">
              {['All', 'Active', 'Completed'].map((item) => (
                <button
                  key={item}
                  className={filter === item ? 'active' : ''}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <label className="search-label">
            Search by title
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search tasks..."
            />
          </label>

          {filteredTasks.length === 0 ? (
            <div className="empty-state card-soft">
              {tasks.length === 0
                ? 'No tasks yet. Add your first task to stay organized.'
                : 'No tasks match this filter.'}
            </div>
          ) : (
            <div className="task-grid">
              {filteredTasks.map((task) => (
                <article key={task.id} className={`task-card ${task.completed ? 'task-complete' : ''} ${isOverdue(task) ? 'task-overdue' : ''}`}>
                  <div className="task-header">
                    <div>
                      <div className="task-title-row">
                        <h3>{task.title}</h3>
                        {isOverdue(task) && <span className="overdue-badge">Overdue</span>}
                      </div>
                      <span className={`priority-pill priority-${task.priority.toLowerCase()}`}>
                        {task.priority}
                      </span>
                    </div>
                    <button className="small-button" onClick={() => toggleCompleted(task)}>
                      {task.completed ? 'Undo' : 'Done'}
                    </button>
                  </div>

                  <p>{task.description || 'No description added.'}</p>

                  <div className="task-meta">
                    <span>{task.dueDate ? `Due ${task.dueDate}` : 'No due date'}</span>
                    <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="card-actions">
                    <button onClick={() => startEdit(task)}>Edit</button>
                    <button className="danger" onClick={() => handleDelete(task.id)}>
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
