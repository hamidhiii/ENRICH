import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), "enrich.db")

def migrate():
    print(f"Starting migration on {db_path}")
    if not os.access(db_path, os.W_OK):
        print(f"CRITICAL: Database file {db_path} is not writable!")
        return

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Check current columns
    cursor.execute("PRAGMA table_info(page_sections)")
    existing_cols = [col[1] for col in cursor.fetchall()]
    print(f"Existing columns in page_sections: {existing_cols}")
    
    # List of columns to add
    to_add = [
        ("page_path", "VARCHAR(255) NOT NULL DEFAULT 'home'"),
        ("section_key", "VARCHAR(255) NOT NULL DEFAULT 'unknown'"),
        ("background_image", "VARCHAR(500)"),
        ("video_url", "VARCHAR(500)"),
        ("button_text_uz", "VARCHAR(255)"),
        ("button_text_ru", "VARCHAR(255)"),
        ("button_text_en", "VARCHAR(255)"),
        ("button_link", "VARCHAR(500)")
    ]
    
    for col_name, col_def in to_add:
        if col_name in existing_cols:
            print(f"Column {col_name} already exists.")
            continue
            
        try:
            sql = f"ALTER TABLE page_sections ADD COLUMN {col_name} {col_def}"
            print(f"Executing: {sql}")
            cursor.execute(sql)
            print(f"Successfully added {col_name}")
        except Exception as e:
            print(f"Error adding {col_name}: {e}")
    
    conn.commit()
    
    # Verify after commit
    cursor.execute("PRAGMA table_info(page_sections)")
    final_cols = [col[1] for col in cursor.fetchall()]
    print(f"Final columns in page_sections: {final_cols}")
    
    conn.close()

if __name__ == "__main__":
    migrate()
