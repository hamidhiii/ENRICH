import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), "enrich.db")

def check_schema():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    tables = ["page_sections", "products", "categories", "users"]
    
    for table in tables:
        print(f"\n--- Table: {table} ---")
        try:
            cursor.execute(f"PRAGMA table_info({table})")
            columns = cursor.fetchall()
            for col in columns:
                print(f"Column: {col[1]} ({col[2]})")
        except Exception as e:
            print(f"Error checking table {table}: {e}")
            
    conn.close()

if __name__ == "__main__":
    check_schema()
