from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app import models, schemas
from app.dependencies import require_role

router = APIRouter(prefix="/api/news", tags=["News"])


@router.get("/", response_model=List[schemas.NewsResponse])
def get_news(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    is_published: Optional[bool] = None,
    db: Session = Depends(get_db)
):
    """Get all news articles"""
    query = db.query(models.News).order_by(models.News.published_date.desc())
    
    if is_published is not None:
        query = query.filter(models.News.is_published == is_published)
    
    return query.offset(skip).limit(limit).all()


@router.get("/{news_id}", response_model=schemas.NewsResponse)
def get_news_item(news_id: int, db: Session = Depends(get_db)):
    """Get a single news article"""
    news = db.query(models.News).filter(models.News.id == news_id).first()
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    
    # Increment views
    news.views += 1
    db.commit()
    
    return news


@router.post("/", response_model=schemas.NewsResponse, status_code=201)
def create_news(
    news_data: schemas.NewsCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_role(models.UserRole.EDITOR))
):
    """Create a new news article"""
    new_news = models.News(**news_data.model_dump())
    db.add(new_news)
    db.commit()
    db.refresh(new_news)
    return new_news


@router.put("/{news_id}", response_model=schemas.NewsResponse)
def update_news(
    news_id: int,
    news_data: schemas.NewsUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_role(models.UserRole.EDITOR))
):
    """Update a news article"""
    news = db.query(models.News).filter(models.News.id == news_id).first()
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    
    for field, value in news_data.model_dump(exclude_unset=True).items():
        setattr(news, field, value)
    
    db.commit()
    db.refresh(news)
    return news


@router.delete("/{news_id}", status_code=204)
def delete_news(
    news_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_role(models.UserRole.ADMIN))
):
    """Delete a news article"""
    news = db.query(models.News).filter(models.News.id == news_id).first()
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    
    db.delete(news)
    db.commit()
    return None
