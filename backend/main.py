from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.database import engine, Base, get_settings
from app.routers import auth, products, categories, news, upload, contact
import os

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="ENRICH Pharmaceutical API",
    description="Backend API for ENRICH pharmaceutical company website",
    version="1.0.0"
)

settings = get_settings()

# Configure CORS
origins = settings.allowed_origins.split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads directory
os.makedirs(settings.upload_dir, exist_ok=True)

# Mount static files for uploads
app.mount("/uploads", StaticFiles(directory=settings.upload_dir), name="uploads")

# Include routers
app.include_router(auth.router)
app.include_router(products.router)
app.include_router(categories.router)
app.include_router(news.router)
app.include_router(upload.router)
app.include_router(contact.router)


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
