from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import tasks, auth, health
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Todo App API",
    description="API for the Todo App Phase II",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(tasks.router, prefix="/api/{user_id}", tags=["tasks"])
app.include_router(auth.router, prefix="/api/auth", tags=["authentication"])
app.include_router(health.router, tags=["health"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo App API"}