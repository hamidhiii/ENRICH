from app.database import SessionLocal
from app.models import PageSection

def seed():
    db = SessionLocal()
    try:
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
            },
            {
                "page_path": "home",
                "section_key": "stat",
                "title_uz": "Mijozlar",
                "title_ru": "Клиенты",
                "subtitle_uz": "1963",
                "subtitle_ru": "1963",
                "order": 3
            },
            {
                "page_path": "home",
                "section_key": "testimonial",
                "title_uz": "Mijoz ismi",
                "title_ru": "Имя клиента",
                "subtitle_uz": "Kasbi",
                "subtitle_ru": "Профессия",
                "content_uz": "Ajoyib mahsulotlar!",
                "content_ru": "Отличные продукты!",
                "order": 4
            },
            {
                "page_path": "about",
                "section_key": "capacity",
                "title_uz": "Tabletkalar",
                "title_ru": "Таблетки",
                "subtitle_uz": "10M+",
                "subtitle_ru": "10M+",
                "content_uz": "yiliga",
                "content_ru": "в год",
                "order": 1
            },
            {
                "page_path": "laboratory",
                "section_key": "trial",
                "title_uz": "Klinik sinovlar",
                "title_ru": "Клинические испытания",
                "content_uz": "Odamlarda dori vositalarining ta'sirini o'rganish",
                "content_ru": "Изучение действия лекарственных средств на людях",
                "order": 1
            },
            {
                "page_path": "products",
                "section_key": "cta",
                "title_uz": "Sifatli mahsulotlar",
                "title_ru": "Качественные продукты",
                "content_uz": "Bizning mahsulotlarimiz bilan tanishing",
                "content_ru": "Ознакомьтесь с нашими продуктами",
                "button_text_uz": "Batafsil",
                "button_text_ru": "Подробнее",
                "order": 1
            },
            {
                "page_path": "about",
                "section_key": "about_hero",
                "title_uz": "Biz haqimizda",
                "title_ru": "О нас",
                "content_uz": "ENRICH - salomatlik va hayotiylik manbai",
                "content_ru": "ENRICH - источник здоровья и жизненной силы",
                "background_image": "/images/about-hero.jpg",
                "order": 0
            },
            {
                "page_path": "about",
                "section_key": "history",
                "title_uz": "Kompaniya tarixi",
                "title_ru": "История компании",
                "content_uz": "«ENRICH» kompaniyasi 2017-yilda tashkil etilgan bo'lib, O'zbekiston farmatsevtika bozoridagi eng tez rivojlanayotgan kompaniyalardan biri hisoblanadi.\n\nKompaniyamiz yuqori sifatli tabiiy va sintetik dori vositalar ishlab chiqarish bilan shug'ullanadi. Bizning maqsadimiz - har bir oilaga sog'lom hayot kechirish imkoniyatini yaratish.",
                "content_ru": "Компания «ENRICH» была основана в 2017 году и является одной из самых быстрорастущих компаний на фармацевтическом рынке Узбекистана.\n\nНаша компания занимается производством высококачественных натуральных и синтетических лекарственных средств. Наша цель - создать возможность для каждой семьи вести здоровый образ жизни.",
                "subtitle_uz": "2017",
                "subtitle_ru": "2017",
                "button_text_uz": "Tashkil etilgan yil",
                "button_text_ru": "Год основания",
                "order": 2
            },
            {
                "page_path": "about",
                "section_key": "mission",
                "title_uz": "Missiya",
                "title_ru": "Миссия",
                "content_uz": "Yuqori sifatli, xavfsiz va samarali farmatsevtika mahsulotlarini ishlab chiqarish orqali odamlarning sog'lig'ini yaxshilash va hayot sifatini oshirish.",
                "content_ru": "Улучшение здоровья и качества жизни людей путем производства высококачественных, безопасных и эффективных фармацевтических продуктов.",
                "order": 3
            },
            {
                "page_path": "about",
                "section_key": "vision",
                "title_uz": "Maqsad",
                "title_ru": "Цель",
                "content_uz": "O'zbekiston va mintaqa bo'ylab eng ishonchli va innovatsion farmatsevtika kompaniyasi bo'lish, sog'liqni saqlash sohasida yetakchi o'rinni egallash.",
                "content_ru": "Стать самой надежной и инновационной фармацевтической компанией в Узбекистане и регионе, занять лидирующие позиции в сфере здравоохранения.",
                "order": 4
            },
            {
                "page_path": "about",
                "section_key": "lab_preview",
                "title_uz": "Laboratoriya va sifat nazorati",
                "title_ru": "Лаборатория и контроль качества",
                "content_uz": "Bizning zamonaviy laboratoriyamiz eng so'nggi texnologiyalar bilan jihozlangan. Har bir mahsulot ishlab chiqarish jarayonida qat'iy sifat nazoratidan o'tadi.",
                "content_ru": "Наша современная лаборатория оснащена по последнему слову техники. Каждое изделие проходит строгий контроль качества в процессе производства.",
                "subtitle_uz": "Zamonaviy laboratoriya",
                "subtitle_ru": "Современная лаборатория",
                "button_text_uz": "Batafsil",
                "button_text_ru": "Подробнее",
                "button_link": "/laboratory",
                "order": 6
            },
            {
                "page_path": "laboratory",
                "section_key": "quality_control",
                "title_uz": "Sifat nazorati",
                "title_ru": "Контроль качества",
                "content_uz": "Har bir mahsulot ishlab chiqarish jarayonining barcha bosqichlarida qat'iy sifat nazoratidan o'tadi.",
                "content_ru": "Каждое изделие проходит строгий контроль качества на всех этапах производственного процесса.",
                "subtitle_uz": "100% Sifat kafolati",
            }
        ]

        for section_data in sections:
            # Check if exists
            exists = db.query(PageSection).filter(
                PageSection.page_path == section_data["page_path"],
                PageSection.section_key == section_data["section_key"],
                PageSection.title_uz == section_data["title_uz"]
            ).first()
            
            if not exists:
                print(f"Seeding {section_data['section_key']}...")
                section = PageSection(**section_data)
                db.add(section)
            else:
                print(f"Section {section_data['section_key']} already exists, skipping.")
        
        db.commit()
        print("Done!")
    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed()
