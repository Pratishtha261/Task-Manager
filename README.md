<<<<<<< HEAD
# Personal Task Manager

A beginner-friendly full stack project using Node.js + Express for the backend and React for the frontend.

## Project Structure

- `server/` - backend code with REST APIs and in-memory task storage
- `client/` - frontend React app with task cards, filters, and responsive UI

## Backend Files

- `server/package.json` - backend dependencies and scripts
- `server/index.js` - Express server, task routes, validation, and error handling

## Frontend Files

- `client/package.json` - frontend dependencies and Vite scripts
- `client/vite.config.js` - Vite configuration for React
- `client/index.html` - HTML shell for the React app
- `client/src/main.jsx` - React entry point
- `client/src/App.jsx` - main application component with UI and API calls
- `client/src/styles.css` - simple soft color theme and responsive card layout

## Setup and Run

1. Open a terminal in `server/` and install backend dependencies:

```bash
cd "c:\Users\user\Desktop\TASK MANAGER\server"
npm install
```

2. Open another terminal in `client/` and install frontend dependencies:

```bash
cd "c:\Users\user\Desktop\TASK MANAGER\client"
npm install
```

3. Start the backend server:

```bash
npm run dev
```

4. Start the frontend app:

```bash
npm run dev
```

5. Open the browser at the address shown in the frontend terminal (usually `http://localhost:5173`).

## Features

- Add tasks with title, description, due date, and priority
- View tasks as cards with overdue highlighting
- Search tasks by title
- Edit and delete tasks with confirmation
- Filter tasks: All / Active / Completed
- Active/completed task counts
- Empty state and success messages for better UX
- Home page before the task manager interface
- Persist tasks across server restarts in `server/tasks.json`

## Notes

- The backend stores tasks in memory, so tasks reset when the server restarts.
- The REST API is easy to explain and simple to extend.

Enjoy building and explaining this project!
=======
# my-project
>>>>>>> 447b078f1a7648b474f7c651fcf820d2bbae4ee9
