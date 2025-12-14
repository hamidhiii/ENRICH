'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function AboutSection() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section ref={ref} className="py-20 bg-white min-h-screen flex items-center">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    {/* Left - Text */}
                    <div className={`max-w-2xl text-center md:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 text-slate-600">
                            <span className="text-lime-500">«ENRICH»</span> haqida
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4 md:mb-6 text-base md:text-lg">
                            «ENRICH» kompaniyasi 2017-yilda tashkil etilgan bo'lib, O'zbekiston farmatsevtika
                            bozorida eng tez rivojlanayotgan kompaniyalardan biri hisoblanadi. Biz yuqori sifatli
                            tabiiy va sintetik dori vositatlar ishlab chiqaramiz.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-6 text-base md:text-lg">
                            Hozirgi vaqda «ENRICH» kompaniyasining turli ko'rinishdagi 32 ta farmatsevtik
                            mahsuloti bozorda mavjud. Barcha dori vositalari yordamida sog'lom hayot kechirish
                            imkoniyatiga ega bo'lasiz. Kompaniyamizning turli yo'nalishlari bo'yicha mahsulotlar
                            ishlab chiqarish imkoniyati bor.
                        </p>
                    </div>

                    {/* Right - Large ENRICH Logo */}
                    <div className={`flex justify-center items-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        <div className="relative">
                            {/* Circular Logo Background */}
                            <div className="w-64 h-64 md:w-96 md:h-96 rounded-full border-4 flex items-center justify-center border-amber-400">
                                <div className="text-center">
                                    <div className="text-5xl md:text-8xl font-bold mb-2 text-amber-400">
                                        ENRICH
                                    </div>
                                    <div className="text-lg md:text-2xl text-lime-500">
                                        LIVE HEALTHY
                                    </div>
                                </div>
                            </div>
                            {/* Decorative leaf */}
                            <div className="absolute -top-4 -right-4 text-4xl md:text-6xl">🌿</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}