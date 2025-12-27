import sqlite3
import os

def seed_settings():
    db_path = os.path.join(os.path.dirname(__file__), "enrich.db")
    if not os.path.exists(db_path):
        print(f"Database not found at {db_path}")
        return

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Update settings with values from the admin panel
    cursor.execute("""
        UPDATE site_settings SET
            email = 'enrich@mail.com',
            phone = '+998 98 305-25-35',
            address_uz = 'Toshkent, Olmazor tumani, Noraztepa 5-tor ko''cha, 5 uy',
            address_ru = 'Ташкент, Олмазарский район, Норазтепа 5-тор улица, дом 5',
            facebook_url = 'https://facebook.com',
            instagram_url = 'https://instagram.com',
            telegram_url = '',
            linkedin_url = ''
        WHERE id = 1
    """)

    conn.commit()
    conn.close()
    print("Settings seeded successfully!")

if __name__ == "__main__":
    seed_settings()
