from fastapi import APIRouter, Depends, HTTPException, status, Path
from typing import List
from sqlmodel import Session
from ..database import get_session
from ..models.task import Task, TaskUpdate
from ..services.task_service import TaskService
from ..middleware.auth import get_current_user, validate_user_id_match
from ..models.response import TaskListResponse, TaskSingleResponse
from ..exceptions import UserMismatchException

router = APIRouter()


@router.get("/", response_model=List[TaskSingleResponse])
async def get_tasks(
    user_id: str = Path(...),
    current_user: dict = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Get all tasks for a specific user
    Validates that the user_id in JWT matches the user_id in the path
    """
    # Validate that the authenticated user matches the requested user_id
    validate_user_id_match(current_user["user_id"], user_id)

    tasks = TaskService.get_tasks_by_user(session=session, user_id=user_id)

    # Format response to match API contract
    return [{"task": task} for task in tasks]


@router.post("/", response_model=TaskSingleResponse)
async def create_task(
    task_data: Task,
    user_id: str = Path(...),
    current_user: dict = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Create a new task for a specific user
    Validates that the user_id in JWT matches the user_id in the path
    """
    # Validate that the authenticated user matches the requested user_id
    validate_user_id_match(current_user["user_id"], user_id)

    # Ensure the task belongs to the correct user
    task_data.user_id = user_id

    created_task = TaskService.create_task(session=session, task_data=task_data)

    return {"task": created_task}


@router.get("/{id}", response_model=TaskSingleResponse)
async def get_task(
    id: int = Path(...),
    user_id: str = Path(...),
    current_user: dict = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Get a specific task by ID for a specific user
    Validates that the user_id in JWT matches the user_id in the path
    """
    # Validate that the authenticated user matches the requested user_id
    validate_user_id_match(current_user["user_id"], user_id)

    task = TaskService.get_task_by_id(session=session, task_id=id, user_id=user_id)

    return {"task": task}


@router.put("/{id}", response_model=TaskSingleResponse)
async def update_task(
    task_update: TaskUpdate,
    id: int = Path(...),
    user_id: str = Path(...),
    current_user: dict = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Update a specific task by ID for a specific user
    Validates that the user_id in JWT matches the user_id in the path
    """
    # Validate that the authenticated user matches the requested user_id
    validate_user_id_match(current_user["user_id"], user_id)

    updated_task = TaskService.update_task(
        session=session,
        task_id=id,
        user_id=user_id,
        task_update=task_update
    )

    return {"task": updated_task}


@router.delete("/{id}")
async def delete_task(
    id: int = Path(...),
    user_id: str = Path(...),
    current_user: dict = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Delete a specific task by ID for a specific user
    Validates that the user_id in JWT matches the user_id in the path
    """
    # Validate that the authenticated user matches the requested user_id
    validate_user_id_match(current_user["user_id"], user_id)

    success = TaskService.delete_task(session=session, task_id=id, user_id=user_id)

    if success:
        return {"success": True, "message": "Task deleted successfully"}
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )


@router.patch("/{id}/complete", response_model=TaskSingleResponse)
async def toggle_task_completion(
    task_update: TaskUpdate,
    id: int = Path(...),
    user_id: str = Path(...),
    current_user: dict = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Toggle the completion status of a specific task by ID for a specific user
    Validates that the user_id in JWT matches the user_id in the path
    """
    # Validate that the authenticated user matches the requested user_id
    validate_user_id_match(current_user["user_id"], user_id)

    # Extract the completed status from the request
    completed_status = task_update.completed

    if completed_status is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Completed status must be provided"
        )

    updated_task = TaskService.toggle_task_completion(
        session=session,
        task_id=id,
        user_id=user_id,
        completed=completed_status
    )

    return {"task": updated_task}