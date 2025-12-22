import requests

API_URL = "http://localhost:8001/api/content/sections"

# Initial sections for Home Page
sections = [
    {
        "page_path": "home",
        "section_key": "hero",
        "title_uz": "Salomatlik va hayotiylik manbai",
        "title_ru": "Источник здоровья и жизненной силы",
        "subtitle_uz": "Tabiiy va sifatli farmatsevtika mahsulotlari",
        "subtitle_ru": "Натуральные и качественные фармацевтические продукты",
        "content_uz": "ENRICH - bu dorivor o'tlardan vitaminlar, minerallar, tabiiy preparatlar ishlab chiqarishga ixtisoslashgan farmatsevtika kompaniyasi.",
        "content_ru": "ENRICH - фармацевтическая компания, специализирующаяся на производстве витаминов, минералов и натуральных препаратов из лекарственных трав.",
        "button_text_uz": "Batafsil",
        "button_text_ru": "Подробнее",
        "button_link": "/about",
        "order": 1
    },
    {
        "page_path": "home",
        "section_key": "about",
        "title_uz": "«ENRICH» haqida",
        "title_ru": "О компании «ENRICH»",
        "content_uz": "«ENRICH» kompaniyasi 2017-yilda tashkil etilgan bo'lib, O'zbekiston farmatsevtika bozoridagi eng tez rivojlanayotgan kompaniyalardan biri hisoblanadi.",
        "content_ru": "Компания «ENRICH» была основана в 2017 году и является одной из самых быстрорастущих компаний на фармацевтическом рынке Узбекистана.",
        "image": "/images/about-home.jpg",
        "button_text_uz": "Batafsil",
        "button_text_ru": "Подробнее",
        "button_link": "/about",
        "order": 2
    }
]

def seed():
    for section in sections:
        try:
            # We use a simple post, but in a real scenario we'd need auth
            # For seeding, we can temporarily disable auth or use a direct DB insert
            # But since this is a local dev, let's assume the user can run this
            print(f"Seeding {section['section_key']}...")
            response = requests.post(API_URL, json=section)
            if response.status_code == 201:
                print(f"Successfully seeded {section['section_key']}")
            else:
                print(f"Failed to seed {section['section_key']}: {response.text}")
        except Exception as e:
            print(f"Error seeding {section['section_key']}: {e}")

if __name__ == "__main__":
    seed()
