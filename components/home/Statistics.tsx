'use client';

import { FaUsers, FaAward, FaCertificate, FaBoxes } from 'react-icons/fa';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCountUp } from '@/hooks/useCountUp';

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

    return (
        <section ref={ref} className="py-20 bg-white min-h-[50vh] flex items-center">
            <div className="container mx-auto px-6">
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                    <StatItem icon={<FaUsers />} label="SATISFIED CUSTOMERS" value={1963} isVisible={isVisible} />
                    <StatItem icon={<FaAward />} label="QUALITY OF SERVICE" value={99} suffix="%" isVisible={isVisible} />
                    <StatItem icon={<FaCertificate />} label="QUALITY CERTIFICATES" value={33} isVisible={isVisible} />
                    <StatItem icon={<FaBoxes />} label="AVAILABLE PRODUCTS" value={789} isVisible={isVisible} />
                </div>
            </div>
        </section>
    );
}