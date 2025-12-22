from app.database import SessionLocal
from app.models import News
from datetime import datetime

def seed_news():
    db = SessionLocal()
    try:
        # Initial news
        news_items = [
            {
                "title_uz": "Yangi mahsulotimiz sotuvda",
                "title_ru": "Наш новый продукт в продаже",
                "slug": "new-product-sale",
                "excerpt_uz": "Bizning yangi farmatsevtika mahsulotimiz endi barcha dorixonalarda mavjud.",
                "excerpt_ru": "Наш новый фармацевтический продукт теперь доступен во всех аптеках.",
                "content_uz": "Bizning yangi farmatsevtika mahsulotimiz endi barcha dorixonalarda mavjud. Bu mahsulot yuqori sifatli va samarali.",
                "content_ru": "Наш новый фармацевтический продукт теперь доступен во всех аптеках. Этот продукт отличается высоким качеством и эффективностью.",
                "image": "/images/news-1.jpg",
                "published_date": datetime.now(),
                "is_published": True
            },
            {
                "title_uz": "Xalqaro ko'rgazmada ishtirok etdik",
                "title_ru": "Мы приняли участие в международной выставке",
                "slug": "international-exhibition",
                "excerpt_uz": "Kompaniyamiz Toshkentda bo'lib o'tgan xalqaro farmatsevtika ko'rgazmasida o'z mahsulotlarini namoyish etdi.",
                "excerpt_ru": "Наша компания представила свою продукцию на международной фармацевтической выставке в Ташкенте.",
                "content_uz": "Kompaniyamiz Toshkentda bo'lib o'tgan xalqaro farmatsevtika ko'rgazmasida o'z mahsulotlarini namoyish etdi. Ko'rgazma juda muvaffaqiyatli o'tdi.",
                "content_ru": "Наша компания представила свою продукцию на международной фармацевтической выставке в Ташкенте. Выставка прошла очень успешно.",
                "image": "/images/news-2.jpg",
                "published_date": datetime.now(),
                "is_published": True
            }
        ]

        for news_data in news_items:
            # Check if exists
            exists = db.query(News).filter(News.slug == news_data["slug"]).first()
            
            if not exists:
                print(f"Seeding news: {news_data['title_uz']}...")
                news = News(**news_data)
                db.add(news)
            else:
                print(f"News {news_data['slug']} already exists, skipping.")
        
        db.commit()
        print("Done!")
    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_news()
