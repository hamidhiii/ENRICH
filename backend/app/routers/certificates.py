from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app import models, schemas
from app.database import get_db
from app.dependencies import get_current_user, require_role

router = APIRouter(
    prefix="/api/certificates",
    tags=["certificates"]
)

@router.get("/", response_model=List[schemas.CertificateResponse])
def get_certificates(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    certificates = db.query(models.Certificate).order_by(models.Certificate.order).offset(skip).limit(limit).all()
    return certificates

@router.get("/{certificate_id}", response_model=schemas.CertificateResponse)
def get_certificate(
    certificate_id: int,
    db: Session = Depends(get_db)
):
    certificate = db.query(models.Certificate).filter(models.Certificate.id == certificate_id).first()
    if not certificate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Certificate not found"
        )
    return certificate

@router.post("/", response_model=schemas.CertificateResponse, status_code=status.HTTP_201_CREATED)
def create_certificate(
    certificate_data: schemas.CertificateCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_role(models.UserRole.EDITOR))
):
    new_certificate = models.Certificate(**certificate_data.model_dump())
    db.add(new_certificate)
    db.commit()
    db.refresh(new_certificate)
    return new_certificate

@router.put("/{certificate_id}", response_model=schemas.CertificateResponse)
def update_certificate(
    certificate_id: int,
    certificate_data: schemas.CertificateUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_role(models.UserRole.EDITOR))
):
    certificate = db.query(models.Certificate).filter(models.Certificate.id == certificate_id).first()
    if not certificate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Certificate not found"
        )
    
    update_data = certificate_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(certificate, field, value)
    
    db.commit()
    db.refresh(certificate)
    return certificate

@router.delete("/{certificate_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_certificate(
    certificate_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_role(models.UserRole.ADMIN))
):
    certificate = db.query(models.Certificate).filter(models.Certificate.id == certificate_id).first()
    if not certificate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Certificate not found"
        )
    
    db.delete(certificate)
    db.commit()
    return None
