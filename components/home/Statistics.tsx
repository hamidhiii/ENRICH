'use client';

import { useState, useEffect } from 'react';
import { FaUsers, FaAward, FaCertificate, FaBoxes } from 'react-icons/fa';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCountUp } from '@/hooks/useCountUp';
import { useLanguage } from '@/context/LanguageContext';
import { contentAPI } from '@/lib/api';

function StatItem({ icon, label, value, suffix = '', isVisible }: { icon: React.ReactNode, label: string, value: number, suffix?: string, isVisible: boolean }) {
    const count = useCountUp(value, 2000, isVisible);

    return (
        <div className="text-center">
            <div className="mb-4 md:mb-6 flex justify-center text-orange-400">
                <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                    <div className="text-5xl md:text-6xl transition-transform duration-500 hover:scale-110">
                        {icon}
                    </div>
                </div>
            </div>
            <div className="text-xs md:text-sm font-bold mb-2 md:mb-3 text-lime-500 tracking-wider">
                {label}
            </div>
            <div className="text-4xl md:text-5xl font-bold text-slate-600">
                {count}{suffix}
            </div>
        </div>
    );
}

export default function Statistics() {
    const { ref, isVisible } = useScrollAnimation();
    const { t, language } = useLanguage();
    const [stats, setStats] = useState<any[]>([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await contentAPI.getSections({ page_path: 'home' });
                const items = response.data.filter((s: any) => s.section_key === 'stat');
                if (items.length > 0) {
                    setStats(items);
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };
        fetchStats();
    }, []);

    const getField = (item: any, field: string) => {
        const key = `${field}_${language}`;
        return item[key] || item[`${field}_uz`] || '';
    };

    const defaultItems = [
        { icon: <FaUsers />, label: t.products.satisfied_customers, value: 1963 },
        { icon: <FaAward />, label: t.products.quality_service, value: 99, suffix: '%' },
        { icon: <FaCertificate />, label: t.products.quality_certificates, value: 33 },
        { icon: <FaBoxes />, label: t.products.available_products, value: 789 },
    ];

    const getIcon = (index: number) => {
        const icons = [<FaUsers />, <FaAward />, <FaCertificate />, <FaBoxes />];
        return icons[index % icons.length];
    };

    return (
        <section ref={ref} className="py-20 bg-white min-h-[50vh] flex items-center">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                    {(stats.length > 0 ? stats : defaultItems).map((item: any, index: number) => (
                        <StatItem
                            key={index}
                            icon={item.icon || getIcon(index)}
                            label={item.label || getField(item, 'title')}
                            value={item.value || parseInt(getField(item, 'subtitle')) || 0}
                            suffix={item.suffix || getField(item, 'button_text')}
                            isVisible={isVisible}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}