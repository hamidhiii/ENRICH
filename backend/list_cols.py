import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), "enrich.db")

def list_columns():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    print(f"Checking columns for page_sections in {db_path}")
    cursor.execute("PRAGMA table_info(page_sections)")
    columns = cursor.fetchall()
    for col in columns:
        print(f"Column ID: {col[0]}, Name: {col[1]}, Type: {col[2]}, NotNull: {col[3]}, Default: {col[4]}, PK: {col[5]}")
            
    conn.close()

if __name__ == "__main__":
    list_columns()
