from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app import models
from app.dependencies import get_current_user, require_role

router = APIRouter(prefix="/api/audit-logs", tags=["Audit Logs"])

@router.get("")
def get_audit_logs(
    limit: int = 50,
    offset: int = 0,
    entity_type: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_role(models.UserRole.ADMIN))
):
    """Get audit logs (Admin only)"""
    query = db.query(models.AuditLog)
    
    if entity_type:
        query = query.filter(models.AuditLog.entity_type == entity_type)
        
    logs = query.order_by(models.AuditLog.created_at.desc()).offset(offset).limit(limit).all()
    total = query.count()
    
    return {
        "items": logs,
        "total": total
    }
