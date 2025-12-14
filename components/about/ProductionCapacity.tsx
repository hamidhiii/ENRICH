'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function ProductionCapacity() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section ref={ref} className="py-20 bg-white min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <h2 className={`text-5xl font-bold text-center mb-16 text-slate-600 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    Ishlab chiqarish quvvati
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: '💊', title: 'Tabletkalar', value: '10M+', subtitle: 'yiliga' },
                        { icon: '🧪', title: 'Siroplar', value: '5M+', subtitle: 'yiliga' },
                        { icon: '💉', title: 'Ampulalar', value: '3M+', subtitle: 'yiliga' },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className={`text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-md transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                            style={{ transitionDelay: `${index * 300}ms` }}
                        >
                            <div className="text-7xl mb-4 transition-transform duration-500 hover:scale-110">{item.icon}</div>
                            <h3 className="text-2xl font-bold mb-2 text-slate-600">
                                {item.title}
                            </h3>
                            <div className="text-5xl font-bold mb-2 text-lime-500">
                                {item.value}
                            </div>
                            <p className="text-gray-600 text-lg">{item.subtitle}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
