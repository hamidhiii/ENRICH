import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), "enrich.db")

def final_check():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    cursor.execute("PRAGMA table_info(page_sections)")
    columns = [col[1] for col in cursor.fetchall()]
    
    required = ["page_path", "section_key", "background_image", "video_url"]
    
    print("--- Final Schema Check ---")
    for col in required:
        if col in columns:
            print(f"Column {col}: PRESENT")
        else:
            print(f"Column {col}: MISSING")
            
    conn.close()

if __name__ == "__main__":
    final_check()
