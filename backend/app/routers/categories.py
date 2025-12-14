from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import models, schemas
from app.dependencies import require_role

router = APIRouter(prefix="/api/categories", tags=["Categories"])


@router.get("/", response_model=List[schemas.CategoryResponse])
def get_categories(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    is_active: bool = None,
    db: Session = Depends(get_db)
):
    """Get all categories"""
    query = db.query(models.Category).order_by(models.Category.order)
    
    if is_active is not None:
        query = query.filter(models.Category.is_active == is_active)
    
    return query.offset(skip).limit(limit).all()


@router.get("/{category_id}", response_model=schemas.CategoryResponse)
def get_category(category_id: int, db: Session = Depends(get_db)):
    """Get a single category"""
    category = db.query(models.Category).filter(models.Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category


@router.post("/", response_model=schemas.CategoryResponse, status_code=201)
def create_category(
    category_data: schemas.CategoryCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_role(models.UserRole.EDITOR))
):
    """Create a new category"""
    new_category = models.Category(**category_data.model_dump())
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category


@router.put("/{category_id}", response_model=schemas.CategoryResponse)
def update_category(
    category_id: int,
    category_data: schemas.CategoryUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_role(models.UserRole.EDITOR))
):
    """Update a category"""
    category = db.query(models.Category).filter(models.Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    for field, value in category_data.model_dump(exclude_unset=True).items():
        setattr(category, field, value)
    
    db.commit()
    db.refresh(category)
    return category


@router.delete("/{category_id}", status_code=204)
def delete_category(
    category_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_role(models.UserRole.ADMIN))
):
    """Delete a category"""
    category = db.query(models.Category).filter(models.Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    db.delete(category)
    db.commit()
    return None
