from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import models, schemas
from app.dependencies import require_role

router = APIRouter(prefix="/api/contact", tags=["Contact"])


@router.post("/", response_model=schemas.ContactMessageResponse, status_code=201)
def create_contact_message(message_data: schemas.ContactMessageCreate, db: Session = Depends(get_db)):
    """Submit a contact form message (public endpoint)"""
    new_message = models.ContactMessage(**message_data.model_dump())
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    return new_message


@router.get("/", response_model=List[schemas.ContactMessageResponse])
def get_contact_messages(
    skip: int = 0,
    limit: int = 50,
    status: str = None,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_role(models.UserRole.VIEWER))
):
    """Get all contact messages (Admin panel)"""
    query = db.query(models.ContactMessage).order_by(models.ContactMessage.created_at.desc())
    
    if status:
        query = query.filter(models.ContactMessage.status == status)
    
    return query.offset(skip).limit(limit).all()


@router.put("/{message_id}", response_model=schemas.ContactMessageResponse)
def update_contact_message(
    message_id: int,
    message_data: schemas.ContactMessageUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_role(models.UserRole.EDITOR))
):
    """Update contact message status/notes"""
    message = db.query(models.ContactMessage).filter(models.ContactMessage.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    for field, value in message_data.model_dump(exclude_unset=True).items():
        setattr(message, field, value)
    
    db.commit()
    db.refresh(message)
    return message
