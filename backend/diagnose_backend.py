import sys
import os

# Add the current directory to sys.path to import app
sys.path.append(os.getcwd())

try:
    from app.database import get_settings, SessionLocal, engine
    from app import models
    from sqlalchemy import text
except ImportError as e:
    print(f"Import Error: {e}")
    sys.exit(1)

def check_health():
    print("--- Backend Diagnostic ---")
    
    # Check Settings
    try:
        settings = get_settings()
        print(f"Settings loaded successfully.")
        print(f"Allowed Origins: {settings.allowed_origins}")
    except Exception as e:
        print(f"Error loading settings: {e}")
    
    # Check Database Connection
    try:
        db = SessionLocal()
        db.execute(text("SELECT 1"))
        print("Database connection: OK")
        
        # Check if tables exist
        try:
            count = db.query(models.PageSection).count()
            print(f"PageSection table: OK (Found {count} sections)")
        except Exception as e:
            print(f"Error querying PageSection: {e}")
            
        try:
            count = db.query(models.Product).count()
            print(f"Product table: OK (Found {count} products)")
        except Exception as e:
            print(f"Error querying Product: {e}")
            
        db.close()
    except Exception as e:
        print(f"Database connection error: {e}")

if __name__ == "__main__":
    check_health()
