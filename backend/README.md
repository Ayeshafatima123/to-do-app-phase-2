# Todo App Backend

This is the backend API for the Todo App Phase II, built with FastAPI.

## Features

- RESTful API with JWT authentication
- User isolation (users can only access their own tasks)
- CRUD operations for tasks
- Task completion toggling
- Neon PostgreSQL database integration

## Tech Stack

- Python 3.11+
- FastAPI
- SQLModel
- PostgreSQL
- JWT for authentication

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Initialize the database:
   ```bash
   python -m src.database.init
   ```

4. Run the development server:
   ```bash
   uvicorn src.main:app --reload
   ```

## API Endpoints

- `GET /api/{user_id}/tasks` - Get all tasks for a user
- `POST /api/{user_id}/tasks` - Create a new task
- `GET /api/{user_id}/tasks/{id}` - Get a specific task
- `PUT /api/{user_id}/tasks/{id}` - Update a task
- `DELETE /api/{user_id}/tasks/{id}` - Delete a task
- `PATCH /api/{user_id}/tasks/{id}/complete` - Toggle task completion
- `POST /api/auth/login` - Login and get JWT token
- `POST /api/auth/register` - Register a new user

## Authentication

All task endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <JWT_TOKEN>
```

The user_id in the JWT token must match the user_id in the URL path for security.