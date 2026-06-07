# Personal Task Manager

This is a full-stack task manager I built using React on the frontend and Express on the backend.

I wanted something lightweight where I could:
- create and edit tasks,
- set priorities and due dates,
- mark tasks complete,
- and keep task data saved in a JSON file.

## Project Structure

- `server/` - backend code with REST APIs and JSON storage
- `client/` - frontend React app with responsive UI and task management features

## What I Built

- Task creation with `title`, `description`, `dueDate`, and `priority`
- Task cards with overdue and completed states
- Filters for All / Active / Completed tasks
- Search by title
- A dashboard overview with total, active, completed, and due-today counts
- Due Today and Upcoming (7 days) sections on the home panel
- Persistent task storage in `server/tasks.json`

## How to Run Locally

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

3. Open the app in your browser at:

```bash
http://localhost:5173
```

## Tech Stack

- Frontend: React, Vite, plain CSS
- Backend: Node.js, Express
- Storage: JSON file (`server/tasks.json`)

## API Endpoints

- `GET /tasks` – fetch all tasks
- `POST /tasks` – add a new task
- `PUT /tasks/:id` – update a task
- `DELETE /tasks/:id` – remove a task

## Notes

- Tasks persist in `server/tasks.json` so the data remains after restarting the server.
- The app is intentionally simple and beginner-friendly.
- I kept the architecture straightforward so the project is easy to explain and maintain.

## What I Would Improve Next

- add authentication,
- make task order draggable,
- add tests,
- replace JSON storage with a proper database.

If you want, I can also add a short section on the main design choices or include a few `curl` examples for the backend API.
