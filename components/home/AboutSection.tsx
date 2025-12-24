'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/context/LanguageContext';
import { contentAPI, PageSection } from '@/lib/api';

export default function AboutSection() {
    const { ref, isVisible } = useScrollAnimation();
    const { t, language } = useLanguage();
    const [aboutData, setAboutData] = useState<PageSection | null>(null);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const response = await contentAPI.getSections({ page_path: 'home' });
                console.log('AboutSection API Response:', response.data);
                const about = response.data.find((s: PageSection) => s.section_key === 'about');
                console.log('Found about section:', about);
                if (about) setAboutData(about);
            } catch (error) {
                console.error('Error fetching about data:', error);
            }
        };
        fetchAbout();
    }, []);

    const getField = (field: 'title' | 'content') => {
        if (!aboutData) return t.about[field as keyof typeof t.about] || '';
        const key = `${field}_${language}` as keyof PageSection;
        return (aboutData[key] as string) || (aboutData[`${field}_uz` as keyof PageSection] as string) || '';
    };

    const getImageUrl = () => {
        if (!aboutData?.image) return '/images/about-placeholder.jpg';
        const url = aboutData.image.startsWith('http')
            ? aboutData.image
            : `http://localhost:8001${aboutData.image}`;
        console.log('AboutSection Image URL:', url);
        return url;
    };

    return (
        <section ref={ref} className="py-20 bg-white min-h-screen flex items-center">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                    {/* Left - Text */}
                    <div className={`max-w-2xl text-center md:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 text-slate-600">
                            {getField('title')}
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4 md:mb-6 text-base md:text-lg whitespace-pre-line">
                            {getField('content')}
                        </p>
                    </div>
                    {/* Right - Image */}
                    <div className={`relative h-auto md:h-[400px] w-full transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <Image
                            src={getImageUrl()}
                            alt={getField('title')}
                            fill
                            className="object-contain "
                            onLoadingComplete={() => console.log('About image loaded')}
                            onError={() => console.error('About image failed to load')}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}