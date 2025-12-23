from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import models
from app.dependencies import get_current_user

router = APIRouter(prefix="/api/stats", tags=["Statistics"])

@router.get("")
def get_stats(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    """Get dashboard statistics"""
    product_count = db.query(models.Product).count()
    category_count = db.query(models.Category).count()
    news_count = db.query(models.News).count()
    message_count = db.query(models.ContactMessage).count()
    user_count = db.query(models.User).count()
    certificate_count = db.query(models.Certificate).count()
    partner_count = db.query(models.Partner).count()

    return {
        "products": product_count,
        "categories": category_count,
        "news": news_count,
        "messages": message_count,
        "users": user_count,
        "certificates": certificate_count,
        "partners": partner_count
    }
