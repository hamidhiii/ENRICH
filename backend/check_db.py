import sqlite3
import os
import json

db_path = os.path.join(os.path.dirname(__file__), "enrich.db")

def check_db():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    cursor.execute("SELECT id, page_path, section_key, title_uz FROM page_sections")
    rows = cursor.fetchall()
    
    print("Current Page Sections:")
    for row in rows:
        print(f"ID: {row[0]}, Page: {row[1]}, Key: {row[2]}, Title: {row[3]}")
    
    cursor.execute("PRAGMA table_info(page_sections)")
    columns = cursor.fetchall()
    print("\nColumns in page_sections:")
    for col in columns:
        print(col[1])
        
    conn.close()

if __name__ == "__main__":
    check_db()
