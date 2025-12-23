from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas
from app.dependencies import get_current_user, require_role

router = APIRouter(prefix="/api/settings", tags=["Settings"])

@router.get("", response_model=schemas.SiteSettingsResponse)
def get_settings(db: Session = Depends(get_db)):
    """Get site settings"""
    settings = db.query(models.SiteSettings).first()
    if not settings:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Settings not found"
        )
    return settings

@router.put("", response_model=schemas.SiteSettingsResponse)
def update_settings(
    settings_data: schemas.SiteSettingsUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_role(models.UserRole.ADMIN))
):
    """Update site settings (Admin only)"""
    settings = db.query(models.SiteSettings).first()
    if not settings:
        # Create if not exists
        settings = models.SiteSettings(**settings_data.model_dump(exclude_unset=True))
        db.add(settings)
    else:
        # Update existing
        update_data = settings_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(settings, field, value)
    
    db.commit()
    db.refresh(settings)
    return settings
