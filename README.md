# Personal Task Manager

A beginner-friendly full stack project using Node.js + Express for the backend and React for the frontend.

## Project Structure

- `server/` - backend code with REST APIs and JSON file storage
- `client/` - frontend React app with task cards, filters, and responsive UI

## Backend Files

- `server/package.json` - backend dependencies and scripts
- `server/index.js` - Express server, task routes, validation, and error handling
- `server/tasks.json` - persisted tasks (created automatically)

## Frontend Files

- `client/package.json` - frontend dependencies and Vite scripts
- `client/vite.config.js` - Vite configuration for React
- `client/index.html` - HTML shell for the React app
- `client/src/main.jsx` - React entry point
- `client/src/App.jsx` - main application component with UI and API calls
- `client/src/styles.css` - app styling and layout

## Setup and Run

1. Start the backend:

```bash
cd "c:\Users\user\Desktop\TASK MANAGER\server"
npm install
npm run dev
```

2. Start the frontend:

```bash
cd "c:\Users\user\Desktop\TASK MANAGER\client"
npm install
npm run dev
```

3. Open your browser at `http://localhost:5173`.

## Features

- Add tasks with `title`, `description`, `dueDate`, and `priority` (Low/Medium/High)
- View tasks as cards with overdue highlighting
- Mark tasks complete/incomplete
- Edit and delete tasks with confirmation
- Filter tasks: All / Active / Completed
- Search tasks by title
- Show `Due Today` and `Upcoming (7 days)` sections
- Tasks persisted in `server/tasks.json`

## Additional Information

### Tech Stack

Frontend:
- React
- Vite
- Plain CSS

Backend:
- Node.js
- Express

Storage:
- JSON file (`server/tasks.json`)

### Live Demo Links

- Frontend: Not deployed yet
- Backend: Not deployed yet

### API Documentation

- `GET /tasks` → Fetch all tasks. Supports optional `?search=` query to filter by title.
- `POST /tasks` → Create a new task. Body: `{ title, description, dueDate, priority }`.
- `PUT /tasks/:id` → Update an existing task. Body may include `title`, `description`, `dueDate`, `completed`, `priority`.
- `DELETE /tasks/:id` → Delete a task.
- `PATCH /tasks/:id` → (Suggested) Toggle complete/incomplete. Current implementation uses `PUT` to update `completed`.

### Next Steps (if given more time)

- Add user authentication
- Add drag-and-drop task ordering
- Add automated testing (unit and integration tests)
- Improve accessibility and mobile responsiveness
- Use a real database (e.g., MongoDB) instead of JSON storage

### Notes

- Tasks are stored in `server/tasks.json` and persist across server restarts.
- The application follows a simple full-stack CRUD architecture with a clear separation between frontend and backend.
- The backend validates required fields (title) and returns meaningful HTTP status codes for errors.

---

If you'd like, I can add a small `curl` examples section showing how to call the API endpoints, or prepare a Postman collection for quick testing.
