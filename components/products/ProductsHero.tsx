'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function ProductsHero() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section ref={ref} className="py-20 bg-gradient-to-br from-gray-50 to-white min-h-[50vh] flex items-center">
            <div className="container mx-auto px-6">
                <h1 className={`text-6xl font-bold text-center mb-8 text-slate-600 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    Bizning <span className="text-lime-500">mahsulotlarimiz</span>
                </h1>
                <p className={`text-xl text-gray-600 text-center max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    Yuqori sifatli va xavfsiz farmatsevtika mahsulotlari
                </p>
            </div>
        </section>
    );
}
