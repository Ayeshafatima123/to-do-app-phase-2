from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer
from pydantic import BaseModel
from datetime import timedelta
from ..utils.jwt import create_access_token, get_password_hash
from ..middleware.auth import security

router = APIRouter()


class UserLoginRequest(BaseModel):
    username: str
    password: str


class UserRegisterRequest(BaseModel):
    username: str
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str


@router.post("/login", response_model=TokenResponse)
async def login(user_login: UserLoginRequest):
    """
    Login endpoint - creates JWT token for authenticated users
    NOTE: In a real implementation, this would verify credentials against a user database
    For this implementation, we'll simulate successful authentication
    """
    # In a real app, this would validate credentials against the database
    # For this demo, we'll just create a token for any user
    user_id = user_login.username  # In real app, this would come from DB lookup

    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user_id, "username": user_login.username},
        expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/register", response_model=TokenResponse)
async def register(user_register: UserRegisterRequest):
    """
    Register endpoint - registers a new user and returns JWT token
    NOTE: In a real implementation, this would create a user in the database
    For this implementation, we'll simulate successful registration
    """
    # In a real app, this would create a user in the database
    # For this demo, we'll just create a token for the new user
    user_id = user_register.username  # In real app, this would be generated

    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user_id, "username": user_register.username},
        expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}