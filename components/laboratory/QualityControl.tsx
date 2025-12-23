import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { contentAPI, PageSection } from '@/lib/api';

export default function QualityControl() {
    const { t, language } = useLanguage();
    const [qualityData, setQualityData] = useState<PageSection | null>(null);

    useEffect(() => {
        const fetchQuality = async () => {
            try {
                const response = await contentAPI.getSections({ page_path: 'laboratory' });
                const sections = response.data as PageSection[];
                const quality = sections.find((s: PageSection) => s.section_key === 'quality_control');
                if (quality) setQualityData(quality);
            } catch (error) {
                console.error('Error fetching quality control data:', error);
            }
        };
        fetchQuality();
    }, []);

    const getField = (field: string, fallback: string) => {
        if (!qualityData) return fallback;
        const key = `${field}_${language}` as keyof PageSection;
        return (qualityData[key] as string) || (qualityData[`${field}_uz` as keyof PageSection] as string) || '';
    };

    const steps = getField('content', '').split('\n').filter((s: string) => s.trim());

    return (
        <section className="py-20 bg-white min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-8 text-slate-600">
                            {getField('title', 'Sifat nazorati')}
                        </h2>
                        <ul className="space-y-4">
                            {steps.length > 0 ? (
                                steps.map((item: string, index: number) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-lime-500">
                                            <span className="text-white font-bold">{index + 1}</span>
                                        </div>
                                        <span className="text-gray-700 text-lg">{item}</span>
                                    </li>
                                ))
                            ) : (
                                [
                                    'Xom ashyoni qabul qilish va tekshirish',
                                    'Ishlab chiqarish jarayonini monitoring qilish',
                                    'Tayyor mahsulotni sinovdan o&apos;tkazish',
                                    'Saqlash sharoitlarini nazorat qilish',
                                    'Yaroqlilik muddatini kuzatish',
                                ].map((item: string, index: number) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-lime-500">
                                            <span className="text-white font-bold">{index + 1}</span>
                                        </div>
                                        <span className="text-gray-700 text-lg">{item}</span>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                    <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl h-96 flex items-center justify-center">
                        <div className="text-white text-center">
                            <div className="text-9xl mb-6">✓</div>
                            <p className="text-3xl font-bold">{getField('subtitle', '100% Sifat kafolati')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
