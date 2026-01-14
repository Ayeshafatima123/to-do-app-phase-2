from sqlmodel import SQLModel
from alembic import command
from alembic.config import Config
from pathlib import Path
import os


def create_migration(message: str):
    """Create a new database migration"""
    alembic_cfg = Config("alembic.ini")
    command.revision(alembic_cfg, message=message, autogenerate=True)


def run_migrations():
    """Run pending database migrations"""
    alembic_cfg = Config("alembic.ini")
    command.upgrade(alembic_cfg, "head")


def create_initial_migration():
    """Create the initial migration for the task model"""
    # This would normally be called after defining models
    pass


# Initialize database tables directly as an alternative to alembic for simplicity
def initialize_database():
    """Initialize database tables"""
    from .database import create_db_and_tables
    create_db_and_tables()