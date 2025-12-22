from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app import models, schemas
from app.dependencies import get_current_user, require_role

router = APIRouter(prefix="/api/content", tags=["Content Management"])


@router.get("/sections", response_model=List[schemas.PageSectionResponse])
def get_sections(
    page_path: Optional[str] = None,
    is_active: Optional[bool] = None,
    db: Session = Depends(get_db)
):
    """Get all page sections with optional filtering"""
    print(f"DEBUG: get_sections called with page_path={page_path}, is_active={is_active}")
    query = db.query(models.PageSection)
    
    if page_path:
        query = query.filter(models.PageSection.page_path == page_path)
    
    if is_active is not None:
        query = query.filter(models.PageSection.is_active == is_active)
    
    sections = query.order_by(models.PageSection.order).all()
    print(f"DEBUG: Found {len(sections)} sections")
    return sections


@router.get("/sections/{section_id}", response_model=schemas.PageSectionResponse)
def get_section(section_id: int, db: Session = Depends(get_db)):
    """Get a single page section by ID"""
    section = db.query(models.PageSection).filter(models.PageSection.id == section_id).first()
    
    if not section:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Section not found"
        )
    
    return section


@router.post("/sections", response_model=schemas.PageSectionResponse, status_code=status.HTTP_201_CREATED)
def create_section(
    section_data: schemas.PageSectionCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_role(models.UserRole.ADMIN))
):
    """Create a new page section (Admin only)"""
    new_section = models.PageSection(**section_data.model_dump())
    db.add(new_section)
    db.commit()
    db.refresh(new_section)
    
    return new_section


@router.put("/sections/{section_id}", response_model=schemas.PageSectionResponse)
def update_section(
    section_id: int,
    section_data: schemas.PageSectionUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_role(models.UserRole.EDITOR))
):
    """Update a page section (Editor/Admin only)"""
    section = db.query(models.PageSection).filter(models.PageSection.id == section_id).first()
    
    if not section:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Section not found"
        )
    
    # Update only provided fields
    update_data = section_data.model_dump(exclude_unset=True)
    
    for field, value in update_data.items():
        setattr(section, field, value)
    
    db.commit()
    db.refresh(section)
    
    return section


@router.delete("/sections/{section_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_section(
    section_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_role(models.UserRole.ADMIN))
):
    """Delete a page section (Admin only)"""
    section = db.query(models.PageSection).filter(models.PageSection.id == section_id).first()
    
    if not section:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Section not found"
        )
    
    db.delete(section)
    db.commit()
    
    return None
