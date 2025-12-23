import { useState, useEffect } from 'react';
import { Pill, FlaskConical, Syringe } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/context/LanguageContext';
import { contentAPI, PageSection } from '@/lib/api';

interface CapacityItem {
    icon?: React.ReactNode;
    title?: string;
    value?: string;
    subtitle?: string;
    section_key?: string;
    id?: number;
}

export default function ProductionCapacity() {
    const { ref, isVisible } = useScrollAnimation();
    const { t, language } = useLanguage();
    const [capacities, setCapacities] = useState<PageSection[]>([]);

    useEffect(() => {
        const fetchCapacities = async () => {
            try {
                const response = await contentAPI.getSections({ page_path: 'about' });
                const sections = response.data as PageSection[];
                const items = sections.filter((s: PageSection) => s.section_key === 'capacity');
                if (items.length > 0) {
                    setCapacities(items);
                }
            } catch (error) {
                console.error('Error fetching capacities:', error);
            }
        };
        fetchCapacities();
    }, []);

    const getField = (item: PageSection, field: string) => {
        const key = `${field}_${language}` as keyof PageSection;
        return (item[key] as string) || (item[`${field}_uz` as keyof PageSection] as string) || '';
    };

    const defaultItems: CapacityItem[] = [
        { icon: <Pill size={64} />, title: t.about_page.tablets, value: '10M+', subtitle: t.about_page.per_year },
        { icon: <FlaskConical size={64} />, title: t.about_page.syrups, value: '5M+', subtitle: t.about_page.per_year },
        { icon: <Syringe size={64} />, title: t.about_page.ampoules, value: '3M+', subtitle: t.about_page.per_year },
    ];

    const displayItems: (CapacityItem | PageSection)[] = capacities.length > 0 ? capacities : defaultItems;

    return (
        <section ref={ref} className="py-20 bg-white min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <h2 className={`text-5xl font-bold text-center mb-16 text-slate-600 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {t.about_page.production_title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {displayItems.map((item, index) => (
                        <div
                            key={index}
                            className={`text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-md transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                            style={{ transitionDelay: `${index * 300}ms` }}
                        >
                            <div className="mb-4 text-lime-500 flex justify-center transition-transform duration-500 hover:scale-110">
                                {'icon' in item ? item.icon : (
                                    <div className="text-6xl">
                                        {item.section_key === 'capacity' ? '📦' : '💊'}
                                    </div>
                                )}
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-slate-600">
                                {'title' in item && typeof item.title === 'string' ? item.title : getField(item as PageSection, 'title')}
                            </h3>
                            <div className="text-5xl font-bold mb-2 text-lime-500">
                                {'value' in item ? item.value : getField(item as PageSection, 'subtitle')}
                            </div>
                            <p className="text-gray-600 text-lg">
                                {'subtitle' in item ? item.subtitle : getField(item as PageSection, 'content')}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
