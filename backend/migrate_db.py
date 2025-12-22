import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), "enrich.db")

def migrate():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        cursor.execute("ALTER TABLE page_sections ADD COLUMN background_image VARCHAR(500)")
        print("Successfully added background_image column to page_sections table")
    except sqlite3.OperationalError as e:
        if "duplicate column name" in str(e):
            print("Column background_image already exists")
        else:
            print(f"Error: {e}")
    
    conn.commit()
    conn.close()

if __name__ == "__main__":
    migrate()
