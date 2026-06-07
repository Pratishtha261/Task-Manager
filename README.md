# Task Manager

## Project Title & Brief Description

**Task Manager** is a lightweight task tracking app that allows users to add tasks with a title, description, due date, and priority. It includes a dashboard summary, task cards, filters, search, and sections for tasks due today and upcoming tasks. This is a full-stack Task Manager I built using React on the frontend and Express on the backend. The app is designed to be beginner-friendly, and easy to use, while still supporting task creation, editing, filtering, and persistent storage.

## Live Demo Links

- Frontend URL: https://task-manager-seven-swart-19.vercel.app/
- Backend URL: https://task-manager-backend-x1gh.onrender.com

## Tech Stack

- Frontend: React and Vite. 
    - React is used for component-based UI and state management, and Vite provides fast development and build tooling.
- Styling: plain CSS to keep the interface simple.
- Backend: Node.js and Express. 
    - Express provides lightweight REST API routing, and Node.js is used to run the server and read/write JSON storage.
- Storage: JSON file (`server/tasks.json`) so task state persists without adding a database dependency.

## Project Structure

```
TASK-MANAGER/
├── server/
│   ├── index.js          
│   ├── tasks.json        
│   └── package.json      
│
├── client/
│   ├── src/
│   │   ├── App.jsx       
│   │   ├── styles.css   
│   │   └── main.jsx      
│   │
│   ├── index.html        
│   ├── package.json     
│   └── vite.config.js   
│
└── README.md
```

## How to Run Locally

1. Start the backend:

```bash
cd backend
npm install
npm run dev
```

2. Start the frontend:

```bash
cd frontend
npm install
npm run dev
```

3. Open the app in your browser:

```bash
http://localhost:5173
```

> Note: The frontend now supports GitHub Pages deployment and can fall back to browser storage if the backend is not available in a static hosting environment.

## API Documentation

### `GET /tasks`
- Method: `GET`
- Path: `/tasks`
- Request body: none
- Response:
  ```json
  [
    {
      "id": 1,
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "dueDate": "2026-06-08",
      "priority": "Medium",
      "completed": false,
      "createdAt": "2026-06-06T12:34:56.789Z"
    }
  ]
  ```

### `POST /tasks`
- Method: `POST`
- Path: `/tasks`
- Request body:
  ```json
  {
    "title": "Task title",
    "description": "Task details",
    "dueDate": "2026-06-08",
    "priority": "Medium"
  }
  ```
- Response: the created task object, including `id`, `completed`, and `createdAt`

### `PUT /tasks/:id`
- Method: `PUT`
- Path: `/tasks/:id`
- Request body:
  ```json
  {
    "title": "Updated title",
    "description": "Updated description",
    "dueDate": "2026-06-09",
    "priority": "High",
    "completed": true
  }
  ```
- Response: the updated task object

### `DELETE /tasks/:id`
- Method: `DELETE`
- Path: `/tasks/:id`
- Request body: none
- Response:
  ```json
  {
    "message": "Task deleted"
  }
  ```

## Next Steps

### What I chose not to do yet
- Add user authentication and login
- Replace JSON storage with a database
- Add drag-and-drop task ordering
- Add automated tests
- Add a hosted backend service for the live demo

### What I would build next
- Add a simple auth flow and user sessions
- Use SQLite or MongoDB instead of JSON storage
- Add drag-and-drop task ordering
- Add test coverage for the backend and frontend
- Improve mobile layout and accessibility

