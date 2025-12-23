import { useState, useEffect } from 'react';
import { Target, Eye } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/context/LanguageContext';
import { contentAPI, PageSection } from '@/lib/api';

export default function MissionVision() {
    const { ref, isVisible } = useScrollAnimation();
    const { t, language } = useLanguage();
    const [missionData, setMissionData] = useState<PageSection | null>(null);
    const [visionData, setVisionData] = useState<PageSection | null>(null);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await contentAPI.getSections({ page_path: 'about' });
                const sections = response.data as PageSection[];
                const mission = sections.find((s: PageSection) => s.section_key === 'mission');
                const vision = sections.find((s: PageSection) => s.section_key === 'vision');
                if (mission) setMissionData(mission);
                if (vision) setVisionData(vision);
            } catch (error) {
                console.error('Error fetching mission/vision data:', error);
            }
        };
        fetchContent();
    }, []);

    const getField = (data: PageSection | null, field: string, fallback: string) => {
        if (!data) return fallback;
        const key = `${field}_${language}` as keyof PageSection;
        return (data[key] as string) || (data[`${field}_uz` as keyof PageSection] as string) || '';
    };

    return (
        <section ref={ref} className="py-20 bg-gray-100 min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className={`bg-white rounded-3xl p-12 shadow-lg transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                        <div className="mb-6 text-lime-500 transition-transform duration-500 hover:scale-110">
                            <Target size={64} />
                        </div>
                        <h3 className="text-3xl font-bold mb-6 text-slate-600">
                            {getField(missionData, 'title', t.about_page.mission_title)}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {getField(missionData, 'content', t.about_page.mission_desc)}
                        </p>
                    </div>
                    <div className={`bg-white rounded-3xl p-12 shadow-lg transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                        <div className="mb-6 text-lime-500 transition-transform duration-500 hover:scale-110">
                            <Eye size={64} />
                        </div>
                        <h3 className="text-3xl font-bold mb-6 text-slate-600">
                            {getField(visionData, 'title', t.about_page.vision_title)}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {getField(visionData, 'content', t.about_page.vision_desc)}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
