from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.database import engine, Base, get_settings
from app.routers.auth import router as auth_router
from app.routers.products import router as products_router
from app.routers.categories import router as categories_router
from app.routers.news import router as news_router
from app.routers.upload import router as upload_router
from app.routers.contact import router as contact_router
from app.routers.certificates import router as certificates_router
from app.routers.partners import router as partners_router
from app.routers.content import router as content_router
from app.routers.settings import router as settings_router
from app.routers.stats import router as stats_router
from app.routers.audit_logs import router as audit_logs_router
from app.routers.backup import router as backup_router
import os

# Create database tables
# Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="ENRICH Pharmaceutical API",
    description="Backend API for ENRICH pharmaceutical company website",
    version="1.0.0"
)

settings = get_settings()

# Configure CORS
allowed_origins = [origin.strip() for origin in settings.allowed_origins.split(",")]


app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi import Request, status
from fastapi.responses import JSONResponse
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global error handler caught: {exc}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An internal server error occurred. Please try again later."},
    )

@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Request: {request.method} {request.url}")
    logger.debug(f"Headers: {dict(request.headers)}")
    try:
        response = await call_next(request)
        logger.info(f"Response status: {response.status_code}")
        return response
    except Exception as e:
        logger.error(f"Request failed: {e}")
        raise e

# Create uploads directory
os.makedirs(settings.upload_dir, exist_ok=True)

# Mount static files for uploads
app.mount("/uploads", StaticFiles(directory=settings.upload_dir), name="uploads")

# Include routers
app.include_router(auth_router)
app.include_router(products_router)
app.include_router(categories_router)
app.include_router(news_router)
app.include_router(upload_router)
app.include_router(contact_router)
app.include_router(certificates_router)
app.include_router(partners_router)
app.include_router(content_router)
app.include_router(settings_router)
app.include_router(stats_router)
app.include_router(audit_logs_router)
app.include_router(backup_router)


@app.get("/")
def root():
    """API root endpoint"""
    return {
        "message": "ENRICH Pharmaceutical API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}
