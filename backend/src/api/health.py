from fastapi import APIRouter
from typing import Dict

router = APIRouter()


@router.get("/health")
def health_check() -> Dict[str, str]:
    """Health check endpoint to verify API is running"""
    return {"status": "healthy", "service": "todo-api"}