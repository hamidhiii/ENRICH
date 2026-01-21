from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db, get_settings
from app import models, schemas
from app.dependencies import require_role
import urllib.request
import urllib.parse
import json
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/contact", tags=["Contact"])
settings = get_settings()

def send_telegram_notification(message_data: dict):
    """Send a notification to Telegram bot"""
    if not settings.telegram_bot_token or not settings.telegram_chat_id:
        logger.warning("Telegram bot token or chat ID not set. Skipping notification.")
        return

    text = (
        "🔔 *Yangi murojaat (Contact Form)*\n\n"
        f"👤 *Ism:* {message_data.get('full_name')}\n"
        f"📧 *Email:* {message_data.get('email')}\n"
        f"📞 *Tel:* {message_data.get('phone') or 'Noma''lum'}\n"
        f"📝 *Mavzu:* {message_data.get('subject') or 'Mavzu yo''q'}\n\n"
        f"💬 *Xabar:* {message_data.get('message')}"
    )

    logger.info(f"Attempting to send Telegram notification to Chat ID: {settings.telegram_chat_id}")
    logger.info(f"Bot Token present: {bool(settings.telegram_bot_token)}")
    
    url = f"https://api.telegram.org/bot{settings.telegram_bot_token}/sendMessage"
    payload = {
        "chat_id": settings.telegram_chat_id,
        "text": text,
        "parse_mode": "Markdown"
    }
    logger.info(f"Payload: {payload}")
    
    try:
        data = urllib.parse.urlencode(payload).encode("utf-8")
        req = urllib.request.Request(url, data=data)
        with urllib.request.urlopen(req, timeout=10) as response:
            logger.info(f"Telegram notification sent. Status: {response.status}")
    except Exception as e:
        logger.error(f"Failed to send Telegram notification: {e}")

@router.post("/", response_model=schemas.ContactMessageResponse, status_code=201)
def create_contact_message(
    message_data: schemas.ContactMessageCreate, 
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Submit a contact form message (public endpoint)"""
    new_message = models.ContactMessage(**message_data.model_dump())
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    
    # Send Telegram notification in background
    background_tasks.add_task(send_telegram_notification, message_data.model_dump())
    
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
