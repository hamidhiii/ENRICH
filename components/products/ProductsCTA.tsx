'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function ProductsCTA() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section ref={ref} className="py-20 bg-white min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <div className={`bg-gradient-to-r from-lime-500 to-lime-700 rounded-3xl p-16 text-center text-white transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <h2 className="text-5xl font-bold mb-6">
                        Savol-javoblar bormi?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Bizning mutaxassislarimiz sizga yordam berishga tayyor
                    </p>
                    <button className="bg-white text-lime-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1">
                        Bog'lanish
                    </button>
                </div>
            </div>
        </section>
    );
}
