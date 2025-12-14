'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function CertificatesPreview() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section ref={ref} className="py-20 bg-white min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <h2 className={`text-5xl font-bold text-center mb-16 text-slate-600 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    Sertifikatlar
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {['ISO 9001', 'GMP', 'Halal'].map((cert, index) => (
                        <div
                            key={index}
                            className={`bg-gradient-to-br from-gray-50 to-white rounded-2xl p-12 text-center shadow-md hover:shadow-xl transition-all duration-1000 border-2 border-lime-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                            style={{ transitionDelay: `${index * 300}ms` }}
                        >
                            <div className="text-7xl mb-6 transition-transform duration-500 hover:scale-110">🏆</div>
                            <h3 className="text-3xl font-bold text-slate-600">
                                {cert}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
