from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.database import engine, Base, get_settings
from app.routers import auth, products, categories, news, upload, contact, certificates, partners
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
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
]
print(f"DEBUG: Hardcoded CORS origins: {origins}")

from fastapi import Request

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    print(f"DEBUG: Request: {request.method} {request.url}")
    print(f"DEBUG: Origin: {request.headers.get('origin')}")
    try:
        response = await call_next(request)
        return response
    except Exception as e:
        print(f"DEBUG: Request failed: {e}")
        raise e

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
app.include_router(certificates.router)
app.include_router(partners.router)


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
