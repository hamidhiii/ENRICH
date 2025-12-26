import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/context/LanguageContext';
import { contentAPI, PageSection, getImageUrl } from '@/lib/api';

export default function ProductsCTA() {
    const { ref, isVisible } = useScrollAnimation();
    const { t, language } = useLanguage();
    const [ctaData, setCtaData] = useState<PageSection | null>(null);

    useEffect(() => {
        const fetchCTA = async () => {
            try {
                const response = await contentAPI.getSections({ page_path: 'products' });
                const sections = response.data as PageSection[];
                const cta = sections.find((s: PageSection) => s.section_key === 'cta');
                if (cta) setCtaData(cta);
            } catch (error) {
                console.error('Error fetching CTA data:', error);
            }
        };
        fetchCTA();
    }, []);

    const getField = (field: string) => {
        if (!ctaData) return t.products[`cta_${field}` as keyof typeof t.products] || '';
        const key = `${field}_${language}` as keyof PageSection;
        return (ctaData[key] as string) || (ctaData[`${field}_uz` as keyof PageSection] as string) || '';
    };

    const bgImage = ctaData?.background_image
        ? getImageUrl(ctaData.background_image)
        : null;

    return (
        <section ref={ref} className="py-20 bg-white min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <div
                    className={`bg-gradient-to-r from-lime-500 to-lime-700 rounded-3xl p-8 md:p-16 text-center text-white transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                    style={bgImage ? {
                        backgroundImage: `linear-gradient(rgba(101, 163, 13, 0.8), rgba(63, 98, 18, 0.8)), url(${bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    } : {}}
                >
                    <h2 className="text-2xl md:text-5xl font-bold mb-6">
                        {getField('title')}
                    </h2>
                    <p className="text-base md:text-xl mb-8 max-w-2xl mx-auto">
                        {getField('content')}
                    </p>
                    <button className="bg-white text-lime-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1">
                        {getField('button_text') || t.products.cta_button}
                    </button>
                </div>
            </div>
        </section>
    );
}
