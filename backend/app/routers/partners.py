from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app import models, schemas
from app.database import get_db
from app.dependencies import get_current_user, require_role

router = APIRouter(
    prefix="/api/partners",
    tags=["partners"]
)

@router.get("/", response_model=List[schemas.PartnerResponse])
def get_partners(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    partners = db.query(models.Partner).offset(skip).limit(limit).all()
    return partners

@router.get("/{partner_id}", response_model=schemas.PartnerResponse)
def get_partner(
    partner_id: int,
    db: Session = Depends(get_db)
):
    partner = db.query(models.Partner).filter(models.Partner.id == partner_id).first()
    if not partner:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Partner not found"
        )
    return partner

@router.post("/", response_model=schemas.PartnerResponse, status_code=status.HTTP_201_CREATED)
def create_partner(
    partner_data: schemas.PartnerCreate,
    db: Session = Depends(get_db),
    # Allow public creation for "Become a partner" requests? 
    # Or restrict to admin? 
    # Given the context of "making it work", usually means admin management + public display.
    # If it's a request form, it should be public. If it's a list of partners, it's admin.
    # I'll make it admin-only for now to be safe, as public requests usually go to a different endpoint or have different validation (e.g. captcha).
    current_user: models.User = Depends(require_role(models.UserRole.EDITOR))
):
    new_partner = models.Partner(**partner_data.model_dump())
    db.add(new_partner)
    db.commit()
    db.refresh(new_partner)
    return new_partner

@router.put("/{partner_id}", response_model=schemas.PartnerResponse)
def update_partner(
    partner_id: int,
    partner_data: schemas.PartnerUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_role(models.UserRole.EDITOR))
):
    partner = db.query(models.Partner).filter(models.Partner.id == partner_id).first()
    if not partner:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Partner not found"
        )
    
    update_data = partner_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(partner, field, value)
    
    db.commit()
    db.refresh(partner)
    return partner

@router.delete("/{partner_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_partner(
    partner_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_role(models.UserRole.ADMIN))
):
    partner = db.query(models.Partner).filter(models.Partner.id == partner_id).first()
    if not partner:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Partner not found"
        )
    
    db.delete(partner)
    db.commit()
    return None
