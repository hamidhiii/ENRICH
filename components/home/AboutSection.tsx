'use client';

import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { contentAPI } from '@/lib/api';

export default function AboutSection() {
    const { ref, isVisible } = useScrollAnimation();
    const { t, language } = useLanguage();
    const [aboutData, setAboutData] = useState<any>(null);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const response = await contentAPI.getSections({ page_path: 'home' });
                const about = response.data.find((s: any) => s.section_key === 'about');
                if (about) setAboutData(about);
            } catch (error) {
                console.error('Error fetching about data:', error);
            }
        };
        fetchAbout();
    }, []);

    const getField = (field: string) => {
        if (!aboutData) return t.about[field as keyof typeof t.about] || '';
        const key = `${field}_${language}`;
        return aboutData[key] || aboutData[`${field}_uz`] || '';
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

                    {/* Right - Large ENRICH Logo or Image */}
                    <div className={`flex justify-center items-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        <div className="relative flex items-center justify-center">
                            <div className="w-64 h-64 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] rounded-full flex items-center justify-center bg-white overflow-hidden relative">
                                {aboutData?.image ? (
                                    <img
                                        src={aboutData.image.startsWith('http') ? aboutData.image : `http://localhost:8001${aboutData.image}`}
                                        alt="About Image"
                                        className="w-full h-full object-contain p-4"
                                    />
                                ) : (
                                    <Image
                                        src="/images/logo.jpg"
                                        alt="Enrich Logo"
                                        fill
                                        className="object-contain p-8"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}