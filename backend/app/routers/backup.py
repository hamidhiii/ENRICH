from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import FileResponse
import os
import shutil
from datetime import datetime
from app.database import get_db, settings
from app import models
from app.dependencies import get_current_user, require_role

router = APIRouter(prefix="/api/backup", tags=["Backup"])

@router.get("/download")
def download_backup(
    current_user: models.User = Depends(require_role(models.UserRole.ADMIN))
):
    """Download current database file (Admin only)"""
    db_path = settings.database_url.replace("sqlite:///", "")
    if not os.path.exists(db_path):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Database file not found"
        )
    
    return FileResponse(
        path=db_path,
        filename=f"backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.db",
        media_type="application/x-sqlite3"
    )

@router.post("/create")
def create_backup(
    current_user: models.User = Depends(require_role(models.UserRole.ADMIN))
):
    """Create a manual backup of the database (Admin only)"""
    db_path = settings.database_url.replace("sqlite:///", "")
    if not os.path.exists(db_path):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Database file not found"
        )
    
    backup_dir = "backups"
    os.makedirs(backup_dir, exist_ok=True)
    
    backup_filename = f"backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.db"
    backup_path = os.path.join(backup_dir, backup_filename)
    
    shutil.copy2(db_path, backup_path)
    
    return {"message": "Backup created successfully", "filename": backup_filename}
