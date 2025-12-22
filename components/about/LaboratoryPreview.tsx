import { useState, useEffect } from 'react';
import { Microscope } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/context/LanguageContext';
import { contentAPI } from '@/lib/api';

export default function LaboratoryPreview() {
    const { ref, isVisible } = useScrollAnimation();
    const { t, language } = useLanguage();
    const [labData, setLabData] = useState<any>(null);

    useEffect(() => {
        const fetchLab = async () => {
            try {
                const response = await contentAPI.getSections({ page_path: 'about' });
                const lab = response.data.find((s: any) => s.section_key === 'lab_preview');
                if (lab) setLabData(lab);
            } catch (error) {
                console.error('Error fetching lab preview data:', error);
            }
        };
        fetchLab();
    }, []);

    const getField = (field: string, fallback: any) => {
        if (!labData) return fallback;
        const key = `${field}_${language}`;
        return labData[key] || labData[`${field}_uz`] || '';
    };

    const labImage = labData?.image
        ? (labData.image.startsWith('http') ? labData.image : `http://localhost:8001${labData.image}`)
        : null;

    return (
        <section ref={ref} className="py-20 bg-gray-100 min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className={`relative rounded-3xl h-96 overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        {labImage ? (
                            <img
                                src={labImage}
                                alt="Laboratory"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="bg-gradient-to-br from-lime-500 to-lime-700 w-full h-full flex items-center justify-center">
                                <div className="text-white text-center flex flex-col items-center">
                                    <div className="mb-4 transition-transform duration-500 hover:scale-110">
                                        <Microscope size={96} />
                                    </div>
                                    <p className="text-3xl font-bold">{t.about_page.lab_preview_title}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        <h2 className="text-4xl font-bold mb-8 text-slate-600">
                            {getField('title', t.about_page.lab_title)}
                        </h2>
                        <div className="text-gray-600 leading-relaxed mb-6 text-lg whitespace-pre-line">
                            {getField('content', t.about_page.lab_desc)}
                        </div>
                        {getField('button_text', null) && (
                            <div className="mt-8">
                                <span className="inline-block px-6 py-3 bg-lime-500 text-white rounded-xl font-bold">
                                    {getField('button_text', '')}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
