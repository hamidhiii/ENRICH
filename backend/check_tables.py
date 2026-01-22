import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), "enrich.db")

def check_tables():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    print(f"Checking tables in {db_path}")
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    print(f"Tables found: {[t[0] for t in tables]}")
    
    conn.close()

if __name__ == "__main__":
    check_tables()
