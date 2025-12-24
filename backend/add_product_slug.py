"""Add slug field to products table

This migration adds a slug field to the products table for SEO-friendly URLs.
"""

import sqlite3
import re
from pathlib import Path

def slugify(text):
    """Convert text to URL-friendly slug"""
    # Convert to lowercase
    text = text.lower()
    # Replace spaces and special characters with hyphens
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text.strip('-')

def migrate():
    # Path to database
    db_path = Path(__file__).parent / 'enrich.db'
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Check if slug column already exists
        cursor.execute("PRAGMA table_info(products)")
        columns = [column[1] for column in cursor.fetchall()]
        
        if 'slug' in columns:
            print("✓ Slug column already exists")
            return
        
        # Add slug column
        print("Adding slug column to products table...")
        cursor.execute("ALTER TABLE products ADD COLUMN slug VARCHAR(255)")
        
        # Create unique index on slug
        print("Creating unique index on slug...")
        cursor.execute("CREATE UNIQUE INDEX idx_products_slug ON products(slug)")
        
        # Generate slugs for existing products
        print("Generating slugs for existing products...")
        cursor.execute("SELECT id, name_uz, name_ru FROM products")
        products = cursor.fetchall()
        
        for product_id, name_uz, name_ru in products:
            # Use Uzbek name for slug, fallback to Russian
            base_slug = slugify(name_uz or name_ru)
            slug = base_slug
            counter = 1
            
            # Ensure uniqueness
            while True:
                cursor.execute("SELECT id FROM products WHERE slug = ?", (slug,))
                if not cursor.fetchone():
                    break
                slug = f"{base_slug}-{counter}"
                counter += 1
            
            cursor.execute("UPDATE products SET slug = ? WHERE id = ?", (slug, product_id))
            print(f"  - Product {product_id}: {slug}")
        
        conn.commit()
        print("✓ Migration completed successfully!")
        
    except Exception as e:
        conn.rollback()
        print(f"✗ Migration failed: {e}")
        raise
    finally:
        conn.close()

if __name__ == "__main__":
    migrate()
