'use client';

import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/context/LanguageContext';
import { contentAPI, PageSection } from '@/lib/api';
import Link from 'next/link';

interface SlideContent {
    id: number;
    color: string;
    imageColor: string;
    title?: {
        uz: string;
        ru: string;
    };
    subtitle?: {
        uz: string;
        ru: string;
    };
    description?: {
        uz: string;
        ru: string;
    };
    buttonText?: {
        uz: string;
        ru: string;
    };
}

const slides: SlideContent[] = [
    {
        id: 1,
        color: 'text-lime-500',
        imageColor: 'fill-lime-300 stroke-lime-600',
        title: {
            uz: 'Salomatlik va hayotiylik manbai',
            ru: 'Источник здоровья и жизненной силы'
        },
        subtitle: {
            uz: 'Tabiiy va sifatli farmatsevtika mahsulotlari',
            ru: 'Натуральная и качественная фармацевтическая продукция'
        },
        description: {
            uz: 'ENRICH - bu dorivor o\'tlardan vitaminlar, minerallar, tabiiy preparatlar ishlab chiqarishga ixtisoslashgan farmatsevtika kompaniyasi.',
            ru: 'ENRICH - это фармацевтическая компания, специализирующаяся на производстве витаминов, минералов и натуральных препаратов из лекарственных трав.'
        },
        buttonText: {
            uz: 'Batafsil',
            ru: 'Подробнее'
        }
    },
    {
        id: 2,
        color: 'text-sky-500',
        imageColor: 'fill-sky-300 stroke-sky-600',
        title: {
            uz: 'Yuqori sifat standartlari',
            ru: 'Высокие стандарты качества'
        },
        subtitle: {
            uz: 'Xalqaro sertifikatlarga ega',
            ru: 'Международные сертификаты'
        },
        description: {
            uz: 'Barcha mahsulotlarimiz qat\'iy sifat nazoratidan o\'tadi va xalqaro standartlarga javob beradi.',
            ru: 'Вся наша продукция проходит строгий контроль качества и соответствует международным стандартам.'
        },
        buttonText: {
            uz: 'Sertifikatlar',
            ru: 'Сертификаты'
        }
    },
    {
        id: 3,
        color: 'text-amber-500',
        imageColor: 'fill-amber-300 stroke-amber-600',
        title: {
            uz: '12 xil mahsulot turi',
            ru: '12 видов продукции'
        },
        subtitle: {
            uz: 'Keng assortiment',
            ru: 'Широкий ассортимент'
        },
        description: {
            uz: 'Turli shakllarda taqdim etiladigan 12 ta dori turi - tabletkalar, siroplar va boshqalar.',
            ru: 'Представлены 12 видов лекарственных средств в различных формах - таблетки, сиропы и другие.'
        },
        buttonText: {
            uz: 'Mahsulotlar',
            ru: 'Продукция'
        }
    },
    {
        id: 4,
        color: 'text-emerald-500',
        imageColor: 'fill-emerald-300 stroke-emerald-600',
        title: {
            uz: 'Tabiiy xom ashyo',
            ru: 'Натуральное сырье'
        },
        subtitle: {
            uz: 'O\'simlik va mineral kelib chiqishi',
            ru: 'Растительного и минерального происхождения'
        },
        description: {
            uz: 'Barcha mahsulotlar tabiiy xom ashyo asosida ishlab chiqariladi va ekologik toza.',
            ru: 'Вся продукция производится на основе натурального сырья и экологически чиста.'
        },
        buttonText: {
            uz: 'Biz haqimizda',
            ru: 'О нас'
        }
    },
    {
        id: 5,
        color: 'text-violet-500',
        imageColor: 'fill-violet-300 stroke-violet-600',
        title: {
            uz: 'Ishonchli hamkorlar',
            ru: 'Надежные партнеры'
        },
        subtitle: {
            uz: 'Mintaqadagi yetakchi kompaniyalar',
            ru: 'Ведущие компании региона'
        },
        description: {
            uz: 'Biz O\'zbekiston va mintaqadagi eng yaxshi kompaniyalar bilan hamkorlik qilamiz.',
            ru: 'Мы сотрудничаем с лучшими компаниями Узбекистана и региона.'
        },
        buttonText: {
            uz: 'Hamkorlar',
            ru: 'Партнеры'
        }
    },
    {
        id: 6,
        color: 'text-rose-500',
        imageColor: 'fill-rose-300 stroke-rose-600',
        title: {
            uz: 'Sog\'lom hayot uchun',
            ru: 'Для здоровой жизни'
        },
        subtitle: {
            uz: '2017 yildan beri bozorda',
            ru: 'На рынке с 2017 года'
        },
        description: {
            uz: 'Har bir oilaga sog\'lom hayot kechirish imkoniyatini yaratish - bizning maqsadimiz.',
            ru: 'Создать возможность для каждой семьи вести здоровый образ жизни - наша цель.'
        },
        buttonText: {
            uz: 'Bog\'lanish',
            ru: 'Связаться'
        }
    },
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { ref, isVisible } = useScrollAnimation();
    const { t, language } = useLanguage();
    const [heroSlides, setHeroSlides] = useState<PageSection[]>([]);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const response = await contentAPI.getSections({ page_path: 'home' });
                const heroItems = response.data.filter((s: PageSection) => s.section_key === 'hero');
                if (heroItems.length > 0) {
                    setHeroSlides(heroItems);
                }
            } catch (error) {
                console.error('Error fetching hero data:', error);
            }
        };
        fetchHero();
    }, []);

    const totalSlides = heroSlides.length > 0 ? heroSlides.length : slides.length;

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalSlides]);

    // Helper to get localized field
    const getField = (field: 'title' | 'subtitle' | 'content' | 'button_text', slideData: PageSection | null) => {
        if (!slideData) {
            // Use static slides content as fallback
            const staticSlide = slides[currentSlide];
            if (field === 'title' && staticSlide.title) {
                return staticSlide.title[language as 'uz' | 'ru'];
            }
            if (field === 'subtitle' && staticSlide.subtitle) {
                return staticSlide.subtitle[language as 'uz' | 'ru'];
            }
            if (field === 'content' && staticSlide.description) {
                return staticSlide.description[language as 'uz' | 'ru'];
            }
            if (field === 'button_text' && staticSlide.buttonText) {
                return staticSlide.buttonText[language as 'uz' | 'ru'];
            }
            // Final fallback to translations
            if (field === 'title') return t.hero.title;
            if (field === 'subtitle') return t.hero.title;
            if (field === 'content') return t.hero.description;
            return '';
        }
        const key = `${field}_${language}` as keyof PageSection;
        return (slideData[key] as string) || (slideData[`${field}_uz` as keyof PageSection] as string) || '';
    };

    const currentHeroData = heroSlides.length > 0 ? heroSlides[currentSlide] : null;
    const currentStaticSlide = slides[currentSlide % slides.length];

    const bgImage = currentHeroData?.background_image
        ? (currentHeroData.background_image.startsWith('http') ? currentHeroData.background_image : `http://localhost:8001${currentHeroData.background_image}`)
        : null;

    return (
        <section
            ref={ref}
            className="relative min-h-[60vh] md:min-h-[80vh] flex items-center overflow-hidden py-20 md:py-0"
            style={{
                background: bgImage ? `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${bgImage})` : 'linear-gradient(to bottom right, #f9fafb, #ffffff)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div className={`z-10 transition-all duration-1000 transform md:pl-12 lg:pl-24 text-center md:text-left order-2 md:order-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className={`text-xl md:text-2xl font-bold mb-2 ${currentStaticSlide.color}`}>
                            {getField('subtitle', currentHeroData)}
                        </h2>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-slate-800 leading-tight">
                            {getField('title', currentHeroData)}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-lg mx-auto md:mx-0 whitespace-pre-line">
                            {getField('content', currentHeroData)}
                        </p>

                        {currentHeroData?.button_link ? (
                            <Link
                                href={currentHeroData.button_link}
                                className="inline-block bg-lime-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-lime-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                            >
                                {getField('button_text', currentHeroData) || 'Batafsil'}
                            </Link>
                        ) : (
                            <button className="bg-lime-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-lime-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                                {getField('button_text', currentHeroData) || 'Batafsil'}
                            </button>
                        )}
                    </div>

                    {/* Right Side - Medicine Bottle Icon or Image */}
                    <div className={`flex justify-center items-center order-1 md:order-2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                        <div className="relative transition-all duration-500 transform scale-75 md:scale-100">
                            {currentHeroData?.image ? (
                                <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px]">
                                    <img
                                        src={currentHeroData.image.startsWith('http') ? currentHeroData.image : `http://localhost:8001${currentHeroData.image}`}
                                        alt="Hero"
                                        className="w-full h-full object-contain drop-shadow-2xl"
                                    />
                                </div>
                            ) : (
                                <svg width="400" height="400" viewBox="0 0 300 300" fill="none" className="drop-shadow-2xl">
                                    {/* Medicine Bottle */}
                                    <rect x="80" y="80" width="140" height="180" rx="20" className={`${currentStaticSlide.imageColor} transition-colors duration-500`} strokeWidth="4" />
                                    <rect x="100" y="50" width="100" height="40" rx="10" className={`${currentStaticSlide.imageColor} transition-colors duration-500`} strokeWidth="4" />
                                    <circle cx="150" cy="150" r="40" fill="white" />
                                    <path d="M130 150 L150 170 L170 130" className={`stroke-current ${currentStaticSlide.color} transition-colors duration-500`} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                                    {/* Cap lines */}
                                    <line x1="110" y1="60" x2="190" y2="60" className="stroke-white opacity-50" strokeWidth="2" />
                                    <line x1="110" y1="70" x2="190" y2="70" className="stroke-white opacity-50" strokeWidth="2" />

                                    {/* Decorative Elements */}
                                    <circle cx="250" cy="50" r="20" className={`fill-current ${currentStaticSlide.color} opacity-20`} />
                                    <circle cx="50" cy="250" r="15" className={`fill-current ${currentStaticSlide.color} opacity-20`} />
                                </svg>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-2 md:left-12 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all shadow-lg bg-white hover:bg-lime-500 text-lime-500 hover:text-white z-20 border-2 border-lime-500"
            >
                <FaChevronLeft size={20} className="md:w-6 md:h-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-2 md:right-12 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all shadow-lg bg-white hover:bg-lime-500 text-lime-500 hover:text-white z-20 border-2 border-lime-500"
            >
                <FaChevronRight size={20} className="md:w-6 md:h-6" />
            </button>

            {/* Dots Navigation */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-lime-500 w-8' : 'bg-gray-300 hover:bg-lime-300'
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
