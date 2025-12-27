import sqlite3
import os

def fix_gibberish():
    db_path = os.path.join(os.path.dirname(__file__), "enrich.db")
    if not os.path.exists(db_path):
        print(f"Database not found at {db_path}")
        return

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Check PageSections (Testimonials)
    print("Checking PageSections...")
    cursor.execute("SELECT id, section_key, page_path, content_uz, content_ru, content_en FROM page_sections WHERE section_key = 'testimonial'")
    rows = cursor.fetchall()
    for row in rows:
        id, key, path, uz, ru, en = row
        print(f"Testimonial {id}: Path='{path}', UZ='{uz[:50]}...', RU='{ru[:50]}...'")
        if uz and ("Lorem Ipsum" in uz or "asdasd" in uz.lower()):
            print(f"Found gibberish in PageSection {id} ({key})")
            # Clear or replace with meaningful text
            cursor.execute("UPDATE page_sections SET content_uz = NULL, content_ru = NULL, content_en = NULL WHERE id = ?", (id,))
    
    # Check Products
    print("Checking Products...")
    cursor.execute("SELECT COUNT(*) FROM products")
    count = cursor.fetchone()[0]
    print(f"Total products: {count}")
    cursor.execute("SELECT id, name_uz, instructions_uz FROM products")
    rows = cursor.fetchall()
    for row in rows:
        id, name, instr = row
        print(f"PRODUCT_ID: {id}")
        print(f"PRODUCT_NAME: {name}")
        print(f"PRODUCT_INSTR: {instr[:100] if instr else 'None'}")
        print("-" * 20)
        if name == "sdf" or (instr and ("Lorem Ipsum" in instr or "asdasd" in instr.lower())):
            print(f"Deleting gibberish Product {id} ({name})")
            cursor.execute("DELETE FROM products WHERE id = ?", (id,))

    conn.commit()
    conn.close()
    print("Cleanup complete.")

if __name__ == "__main__":
    fix_gibberish()
