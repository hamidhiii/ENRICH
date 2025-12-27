import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { contentAPI, PageSection, getImageUrl } from '@/lib/api';

export default function AboutHero() {
    const { ref, isVisible } = useScrollAnimation();
    const { t, language } = useLanguage();
    const [heroData, setHeroData] = useState<PageSection | null>(null);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const response = await contentAPI.getSections({ page_path: 'about' });
                const sections = response.data as PageSection[];
                const hero = sections.find((s: PageSection) => s.section_key === 'about_hero');
                if (hero) setHeroData(hero);
            } catch (error) {
                console.error('Error fetching about hero data:', error);
            }
        };
        fetchHero();
    }, []);

    const getField = (field: string) => {
        if (!heroData) return t.about_page[`hero_${field}` as keyof typeof t.about_page] || '';
        const key = `${field}_${language}` as keyof PageSection;
        return (heroData[key] as string) || (heroData[`${field}_uz` as keyof PageSection] as string) || '';
    };

    const bgImage = heroData?.background_image
        ? getImageUrl(heroData.background_image)
        : null;

    return (
        <section
            ref={ref}
            className="relative py-20 bg-gradient-to-br from-gray-50 to-white min-h-[50vh] flex items-center overflow-hidden"
        >
            {bgImage && (
                <div className="absolute inset-0 z-0">
                    <Image  
                        src={bgImage}
                        alt="Background"
                        fill
                        className="object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 to-white/80" />
                </div>
            )}
            <div className="container mx-auto px-6 relative z-10">
                <h1 className={`text-6xl font-bold text-center mb-8 text-slate-800 drop-shadow-lg transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8)' }}>
                    {getField('title')}
                </h1>
                <p className={`text-xl text-gray-700 text-center max-w-3xl mx-auto drop-shadow-md transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ textShadow: '1px 1px 3px rgba(255, 255, 255, 0.8)' }}>
                    {getField('content')}
                </p>
            </div>
        </section>
    );
}
