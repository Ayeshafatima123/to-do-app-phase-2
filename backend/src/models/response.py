from pydantic import BaseModel
from typing import List, Optional
from .task import TaskResponse


class ApiResponse(BaseModel):
    """Generic API response model"""
    success: bool
    message: str
    data: Optional[dict] = None


class TaskListResponse(BaseModel):
    """Response model for task list"""
    tasks: List[TaskResponse]


class TaskSingleResponse(BaseModel):
    """Response model for single task"""
    task: TaskResponse