from fastapi import HTTPException, status, Request
from fastapi.security.http import HTTPBearer, HTTPAuthorizationCredentials
from ..utils.jwt import verify_token
from typing import Dict


security = HTTPBearer()


def get_current_user(request: Request) -> Dict:
    """
    Get current user from JWT token in Authorization header
    Extracts user_id from the 'sub' field of the JWT token
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = auth_header.split(" ")[1]
    payload = verify_token(token)

    # Extract user_id from the 'sub' field as per constitution
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return {"user_id": user_id}


def validate_user_id_match(request_user_id: str, path_user_id: str) -> bool:
    """
    Validate that the user_id from JWT token matches the user_id in the URL path
    This enforces the constitution rule that users can only access their own data
    """
    if request_user_id != path_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: User ID mismatch"
        )
    return True