from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app import models
from app.auth import get_password_hash

# Create tables
Base.metadata.create_all(bind=engine)

def seed_database():
    """Seed the database with initial data"""
    db = SessionLocal()
    
    try:
        # Check if admin user exists
        admin = db.query(models.User).filter(models.User.username == "admin").first()
        
        if not admin:
            # Create admin user
            admin = models.User(
                email="admin@enrich.uz",
                username="admin",
                full_name="Administrator",
                hashed_password=get_password_hash("admin123"),
                role=models.UserRole.ADMIN,
                is_active=True
            )
            db.add(admin)
            print("✓ Created admin user (username: admin, password: admin123)")
        
        # Create sample categories
        if db.query(models.Category).count() == 0:
            categories = [
                models.Category(
                    name_ru="Антибиотики",
                    name_uz="Antibiotiklar",
                    name_en="Antibiotics",
                    slug="antibiotics",
                    order=1,
                    is_active=True
                ),
                models.Category(
                    name_ru="Витамины",
                    name_uz="Vitaminlar",
                    name_en="Vitamins",
                    slug="vitamins",
                    order=2,
                    is_active=True
                ),
                models.Category(
                    name_ru="Для детей",
                    name_uz="Bolalar uchun",
                    name_en="For Children",
                    slug="for-children",
                    order=3,
                    is_active=True
                ),
                models.Category(
                    name_ru="Лекарства от аллергии",
                    name_uz="Allergiya dorilar",
                    name_en="Allergy Medicines",
                    slug="allergy-medicines",
                    order=4,
                    is_active=True
                ),
            ]
            db.add_all(categories)
            print("✓ Created sample categories")
        
        # Create site settings
        if db.query(models.SiteSettings).count() == 0:
            settings = models.SiteSettings(
                site_name_ru="ENRICH",
                site_name_uz="ENRICH",
                site_name_en="ENRICH",
                email="enrich@mail.com",
                phone="+998 71 200 06 03",
                address_ru="г. Ташкент, Алмазарский район, улица Сагбон, 12-й проезд, 5-й тупик, дом 5.",
                address_uz="Toshkent shahar, Olmazor tumani, Sag'bon ko'chasi, 12-proezd, 5-tupik, 5-uy.",
                address_en="Tashkent, Olmazor district, Noraztepa 5-tor street, 5 house",
                facebook_url="https://facebook.com",
                instagram_url="https://instagram.com",
                meta_title_ru="ENRICH - Фармацевтическая компания",
                meta_title_uz="ENRICH - Farmatsevtika kompaniyasi",
                meta_title_en="ENRICH - Pharmaceutical Company"
            )
            db.add(settings)
            print("✓ Created site settings")
        
        db.commit()
        print("\n✅ Database seeded successfully!")
        print("   Admin credentials: username='admin', password='admin123'")
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
