import { useState, useEffect } from 'react';
import { Factory } from 'lucide-react';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/context/LanguageContext';
import { contentAPI, PageSection, getImageUrl } from '@/lib/api';

export default function CompanyHistory() {
    const { ref, isVisible } = useScrollAnimation();
    const { t, language } = useLanguage();
    const [historyData, setHistoryData] = useState<PageSection | null>(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await contentAPI.getSections({ page_path: 'about' });
                const sections = response.data as PageSection[];
                const history = sections.find((s: PageSection) => s.section_key === 'history');
                if (history) setHistoryData(history);
            } catch (error) {
                console.error('Error fetching company history data:', error);
            }
        };
        fetchHistory();
    }, []);

    const getField = (field: string) => {
        if (!historyData) {
            if (field === 'title') return t.about_page.history_title;
            if (field === 'content') return `${t.about_page.history_desc1}\n\n${t.about_page.history_desc2}`;
            if (field === 'subtitle') return '2017';
            if (field === 'button_text') return t.about_page.founded;
            return '';
        }
        const key = `${field}_${language}` as keyof PageSection;
        return (historyData[key] as string) || (historyData[`${field}_uz` as keyof PageSection] as string) || '';
    };

    const historyImage = historyData?.image
        ? getImageUrl(historyData.image)
        : null;

    return (
        <section ref={ref} className="py-20 bg-white min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <h2 className="text-4xl font-bold mb-8 text-slate-600">
                            {getField('title')}
                        </h2>
                        <div className="text-gray-600 leading-relaxed mb-6 text-lg whitespace-pre-line">
                            {getField('content')}
                        </div>
                    </div>
                    <div className={`relative rounded-3xl h-96 overflow-hidden transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {historyImage ? (
                            <Image
                                src={historyImage}
                                alt="Company History"
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="bg-gradient-to-br from-lime-300 to-lime-500 w-full h-full flex items-center justify-center">
                                <div className="text-white text-center flex flex-col items-center">
                                    <div className="mb-4 transition-transform duration-500 hover:scale-110">
                                        <div className="p-6 bg-white/20 rounded-full backdrop-blur-sm">
                                            <Factory size={64} />
                                        </div>
                                    </div>
                                    <p className="text-4xl font-bold mb-2">{getField('subtitle')}</p>
                                    <p className="text-xl opacity-90">{getField('button_text')}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
