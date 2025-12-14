from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Form
from sqlalchemy.orm import Session
from typing import Optional
import os
import shutil
from datetime import datetime
from pathlib import Path
from app.database import get_db, get_settings
from app import models
from app.dependencies import require_role

router = APIRouter(prefix="/api/upload", tags=["Upload"])
settings = get_settings()


def save_upload_file(upload_file: UploadFile, upload_dir: str) -> str:
    """Save uploaded file and return the file path"""
    # Create upload directory if it doesn't exist
    Path(upload_dir).mkdir(parents=True, exist_ok=True)
    
    # Generate unique filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{timestamp}_{upload_file.filename}"
    file_path = os.path.join(upload_dir, filename)
    
    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
    
    return file_path


@router.post("/image")
async def upload_image(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_role(models.UserRole.EDITOR))
):
    """Upload an image file"""
    # Validate file type
    allowed_types = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Invalid file type. Only images allowed.")
    
    # Check file size
    file.file.seek(0, 2)
    file_size = file.file.tell()
    file.file.seek(0)
    
    if file_size > settings.max_file_size:
        raise HTTPException(status_code=400, detail="File too large")
    
    # Save file
    upload_dir = os.path.join(settings.upload_dir, "images")
    file_path = save_upload_file(file, upload_dir)
    
    # Save to database
    media = models.Media(
        filename=os.path.basename(file_path),
        original_filename=file.filename,
        file_path=file_path,
        file_type="image",
        mime_type=file.content_type,
        file_size=file_size,
        uploaded_by=current_user.id
    )
    db.add(media)
    db.commit()
    
    return {
        "filename": os.path.basename(file_path),
        "path": file_path,
        "url": f"/uploads/images/{os.path.basename(file_path)}"
    }


@router.post("/pdf")
async def upload_pdf(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_role(models.UserRole.EDITOR))
):
    """Upload a PDF file"""
    # Validate file type
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF allowed.")
    
    # Check file size
    file.file.seek(0, 2)
    file_size = file.file.tell()
    file.file.seek(0)
    
    if file_size > settings.max_file_size:
        raise HTTPException(status_code=400, detail="File too large")
    
    # Save file
    upload_dir = os.path.join(settings.upload_dir, "pdfs")
    file_path = save_upload_file(file, upload_dir)
    
    # Save to database
    media = models.Media(
        filename=os.path.basename(file_path),
        original_filename=file.filename,
        file_path=file_path,
        file_type="pdf",
        mime_type=file.content_type,
        file_size=file_size,
        uploaded_by=current_user.id
    )
    db.add(media)
    db.commit()
    
    return {
        "filename": os.path.basename(file_path),
        "path": file_path,
        "url": f"/uploads/pdfs/{os.path.basename(file_path)}"
    }
