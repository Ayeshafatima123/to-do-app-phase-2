# Data Model: Todo App Phase II

## Task Entity

### Fields
- **id** (Integer, Auto-generated, Primary Key)
  - Type: Integer
  - Constraints: Auto-increment, Not Null, Unique
  - Description: Unique identifier for each task

- **title** (String, Required)
  - Type: String
  - Constraints: Not Null, Max length 255
  - Description: Title of the task

- **description** (String, Optional)
  - Type: String
  - Constraints: Nullable, Max length 1000
  - Description: Detailed description of the task

- **completed** (Boolean)
  - Type: Boolean
  - Default: False
  - Description: Whether the task is completed or not

- **user_id** (String)
  - Type: String
  - Constraints: Not Null
  - Description: ID of the user who owns this task (from JWT token)

- **created_at** (DateTime)
  - Type: DateTime
  - Constraints: Not Null
  - Default: Current timestamp
  - Description: Timestamp when the task was created

### Validation Rules
- Title must be between 1 and 255 characters
- Description, if provided, must be between 1 and 1000 characters
- user_id must match the authenticated user's ID from JWT token
- completed field must be a boolean value

### Relationships
- Each task belongs to exactly one user (user_id foreign key)
- A user can have multiple tasks

## User Entity (Managed by Better Auth)

### Fields (Defined by Better Auth)
- **id** (String, Primary Key)
  - Type: String
  - Description: Unique identifier for the user

- **email** (String)
  - Type: String
  - Description: User's email address

- **name** (String)
  - Type: String
  - Description: User's display name

- **created_at** (DateTime)
  - Type: DateTime
  - Description: When the user account was created

### Validation Rules (Defined by Better Auth)
- Email must be unique
- Email must be a valid email format
- Name is optional

## Database Schema (SQLModel)

```python
from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional

class TaskBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: bool = Field(default=False)
    user_id: str

class Task(TaskBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
```

## State Transitions

### Task State Transitions
- **Created**: Task is created with completed=False (default)
- **Completed**: Task status changes from completed=False to completed=True
- **Reopened**: Task status changes from completed=True to completed=False
- **Deleted**: Task is removed from the database

### Access Control
- A task can only be read/updated/deleted by the user identified by user_id
- Cross-user access is forbidden by backend validation