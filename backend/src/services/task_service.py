from typing import List, Optional
from sqlmodel import Session, select
from ..models.task import Task, TaskUpdate
from fastapi import HTTPException, status


class TaskService:
    """Service class for managing tasks"""

    @staticmethod
    def create_task(*, session: Session, task_data: Task) -> Task:
        """Create a new task"""
        db_task = Task.model_validate(task_data, update={"user_id": task_data.user_id})
        session.add(db_task)
        session.commit()
        session.refresh(db_task)
        return db_task

    @staticmethod
    def get_task_by_id(*, session: Session, task_id: int, user_id: str) -> Optional[Task]:
        """Get a task by ID for a specific user"""
        statement = select(Task).where(Task.id == task_id).where(Task.user_id == user_id)
        task = session.exec(statement).first()
        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found"
            )
        return task

    @staticmethod
    def get_tasks_by_user(*, session: Session, user_id: str) -> List[Task]:
        """Get all tasks for a specific user"""
        statement = select(Task).where(Task.user_id == user_id)
        tasks = session.exec(statement).all()
        return tasks

    @staticmethod
    def update_task(*, session: Session, task_id: int, user_id: str, task_update: TaskUpdate) -> Task:
        """Update a task for a specific user"""
        db_task = TaskService.get_task_by_id(session=session, task_id=task_id, user_id=user_id)

        update_data = task_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_task, field, value)

        session.add(db_task)
        session.commit()
        session.refresh(db_task)
        return db_task

    @staticmethod
    def delete_task(*, session: Session, task_id: int, user_id: str) -> bool:
        """Delete a task for a specific user"""
        db_task = TaskService.get_task_by_id(session=session, task_id=task_id, user_id=user_id)
        session.delete(db_task)
        session.commit()
        return True

    @staticmethod
    def toggle_task_completion(*, session: Session, task_id: int, user_id: str, completed: bool) -> Task:
        """Toggle the completion status of a task"""
        db_task = TaskService.get_task_by_id(session=session, task_id=task_id, user_id=user_id)
        db_task.completed = completed
        session.add(db_task)
        session.commit()
        session.refresh(db_task)
        return db_task