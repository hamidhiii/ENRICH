import sys
import os

# Add the current directory to sys.path to import app
sys.path.append(os.getcwd())

from app.database import engine, Base
from app import models

def create_tables():
    print("Creating all missing tables...")
    try:
        Base.metadata.create_all(bind=engine)
        print("Successfully created all missing tables.")
    except Exception as e:
        print(f"Error creating tables: {e}")

if __name__ == "__main__":
    create_tables()
