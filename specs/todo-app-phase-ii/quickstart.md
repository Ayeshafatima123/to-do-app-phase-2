# Quickstart Guide: Todo App Phase II

## Prerequisites

- Node.js 18+ (for frontend development)
- Python 3.11+ (for backend development)
- PostgreSQL-compatible database (Neon PostgreSQL recommended)
- Git
- npm or yarn package manager

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Backend Setup

#### Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

#### Configure Environment Variables
Create a `.env` file in the backend directory:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/todo_app"
SECRET_KEY="your-super-secret-key-here"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=30
NEON_DATABASE_URL="your-neon-db-connection-string"
```

#### Run Database Migrations
```bash
# Apply initial migrations
python -m src.database.migrate
```

#### Start the Backend Server
```bash
# Development
python -m src.main

# With uvicorn
uvicorn src.main:app --reload --port 8000
```

### 3. Frontend Setup

#### Install Frontend Dependencies
```bash
cd frontend
npm install
# or
yarn install
```

#### Configure Environment Variables
Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

#### Start the Frontend Server
```bash
npm run dev
# or
yarn dev
```

## Architecture Overview

### Backend Structure
```
backend/
├── src/
│   ├── models/          # SQLModel database models
│   ├── services/        # Business logic
│   ├── api/            # API route definitions
│   └── auth/           # Authentication handlers
├── tests/              # Unit and integration tests
└── requirements.txt    # Python dependencies
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Next.js pages
│   ├── services/       # API clients and utilities
│   └── lib/            # Shared utilities
├── public/             # Static assets
├── package.json        # Node.js dependencies
└── next.config.js      # Next.js configuration
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Task Management
- `GET /api/{user_id}/tasks` - Get all tasks for a user
- `POST /api/{user_id}/tasks` - Create a new task
- `GET /api/{user_id}/tasks/{id}` - Get a specific task
- `PUT /api/{user_id}/tasks/{id}` - Update a task
- `DELETE /api/{user_id}/tasks/{id}` - Delete a task
- `PATCH /api/{user_id}/tasks/{id}/complete` - Toggle task completion

## Development Commands

### Backend
```bash
# Run tests
pytest tests/

# Format code
black src/

# Lint code
flake8 src/
```

### Frontend
```bash
# Run tests
npm test

# Build for production
npm run build

# Format code
npm run format

# Lint code
npm run lint
```

## Environment Configuration

### Local Development
For local development, use the following configurations:

**Backend `.env`:**
```env
DATABASE_URL="postgresql://localhost:5432/todo_dev"
SECRET_KEY="dev-secret-key-change-in-production"
DEBUG=true
```

**Frontend `.env.local`:**
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXTAUTH_URL="http://localhost:3000"
NODE_ENV=development
```

### Production Deployment
For production, ensure:
- Strong, randomly generated secrets
- SSL/TLS enabled
- Database connection pooling configured
- Proper CORS settings
- Logging configured for monitoring

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify your database URL is correct
   - Check that the database server is running
   - Ensure firewall rules allow connections

2. **Authentication Failures**
   - Verify JWT secret keys match between frontend and backend
   - Check that tokens are being properly passed in headers
   - Ensure user_id in token matches URL parameter

3. **CORS Errors**
   - Verify that frontend origin is allowed in backend settings
   - Check that credentials are properly configured

4. **Environment Variables Missing**
   - Ensure all required environment variables are set
   - Verify files are named correctly (.env, .env.local)
   - Check that variables are properly loaded in your deployment environment