"""
Database initialization script
"""
from .database import create_db_and_tables


def init_db():
    """Initialize the database and create tables"""
    print("Initializing database...")
    create_db_and_tables()
    print("Database initialized successfully!")


if __name__ == "__main__":
    init_db()