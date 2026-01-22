import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), "enrich.db")

def migrate():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # List of columns to add to page_sections with their types and optional defaults
    page_sections_columns = [
        ("page_path", "VARCHAR(255) NOT NULL DEFAULT 'home'"),
        ("section_key", "VARCHAR(255) NOT NULL DEFAULT 'unknown'"),
        ("background_image", "VARCHAR(500)"),
        ("video_url", "VARCHAR(500)"),
        ("button_text_uz", "VARCHAR(255)"),
        ("button_text_ru", "VARCHAR(255)"),
        ("button_text_en", "VARCHAR(255)"),
        ("button_link", "VARCHAR(500)")
    ]
    
    for col_name, col_def in page_sections_columns:
        try:
            cursor.execute(f"ALTER TABLE page_sections ADD COLUMN {col_name} {col_def}")
            print(f"Successfully added {col_name} column to page_sections table")
        except sqlite3.OperationalError as e:
            if "duplicate column name" in str(e):
                print(f"Column {col_name} already exists in page_sections")
            else:
                print(f"Error adding {col_name} to page_sections: {e}")
    
    # Also check products table for slug column
    try:
        cursor.execute("ALTER TABLE products ADD COLUMN slug VARCHAR(255)")
        print("Successfully added slug column to products table")
    except sqlite3.OperationalError as e:
        if "duplicate column name" in str(e):
            print("Column slug already exists in products")
        else:
            print(f"Error adding slug to products: {e}")

    conn.commit()
    conn.close()

if __name__ == "__main__":
    migrate()
