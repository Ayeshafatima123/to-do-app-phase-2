# Todo App Frontend

This is the frontend for the Todo App Phase II, built with Next.js.

## Features

- User authentication (login/register)
- Task management (create, read, update, delete)
- Task completion toggling
- Responsive design
- Protected routes

## Tech Stack

- Next.js 14+
- React 18+
- TypeScript
- Tailwind CSS

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Pages

- `/login` - User login page
- `/register` - User registration page
- `/tasks` - Main dashboard for task management

## Components

- `AuthProvider` - Manages authentication state
- `ProtectedRoute` - Ensures only authenticated users can access certain pages
- `TaskForm` - Component for creating new tasks
- `TaskToggle` - Component for toggling task completion status
- `TaskEditor` - Component for editing existing tasks
- `DeleteTaskModal` - Modal for confirming task deletion

## Environment Variables

- `NEXT_PUBLIC_API_BASE_URL` - The URL of the backend API