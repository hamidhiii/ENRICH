from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app import models, schemas
from app.dependencies import get_current_user, require_role

router = APIRouter(prefix="/api/products", tags=["Products"])


@router.get("/", response_model=List[schemas.ProductResponse])
def get_products(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    category_id: Optional[int] = None,
    is_active: Optional[bool] = None,
    featured: Optional[bool] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get all products with optional filtering"""
    query = db.query(models.Product)
    
    if category_id:
        query = query.filter(models.Product.category_id == category_id)
    
    if is_active is not None:
        query = query.filter(models.Product.is_active == is_active)
    
    if featured is not None:
        query = query.filter(models.Product.featured == featured)
    
    if search:
        search_filter = f"%{search}%"
        query = query.filter(
            (models.Product.name_ru.ilike(search_filter)) |
            (models.Product.name_uz.ilike(search_filter)) |
            (models.Product.name_en.ilike(search_filter))
        )
    
    products = query.offset(skip).limit(limit).all()
    return products


@router.get("/{product_id}", response_model=schemas.ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    """Get a single product by ID"""
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    return product


@router.post("/", response_model=schemas.ProductResponse, status_code=status.HTTP_201_CREATED)
def create_product(
    product_data: schemas.ProductCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_role(models.UserRole.EDITOR))
):
    """Create a new product (Editor/Admin only)"""
    # Check if category exists
    category = db.query(models.Category).filter(models.Category.id == product_data.category_id).first()
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )
    
    new_product = models.Product(**product_data.model_dump())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    
    return new_product


@router.put("/{product_id}", response_model=schemas.ProductResponse)
def update_product(
    product_id: int,
    product_data: schemas.ProductUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_role(models.UserRole.EDITOR))
):
    """Update a product (Editor/Admin only)"""
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    # Update only provided fields
    update_data = product_data.model_dump(exclude_unset=True)
    
    # Check if category exists if being updated
    if "category_id" in update_data:
        category = db.query(models.Category).filter(models.Category.id == update_data["category_id"]).first()
        if not category:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Category not found"
            )
    
    for field, value in update_data.items():
        setattr(product, field, value)
    
    db.commit()
    db.refresh(product)
    
    return product


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_role(models.UserRole.ADMIN))
):
    """Delete a product (Admin only)"""
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    db.delete(product)
    db.commit()
    
    return None
