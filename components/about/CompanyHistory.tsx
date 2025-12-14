'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function CompanyHistory() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section ref={ref} className="py-20 bg-white min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <h2 className="text-4xl font-bold mb-8 text-slate-600">
                            Kompaniya tarixi
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                            «ENRICH» kompaniyasi 2017-yilda tashkil etilgan bo'lib, O'zbekiston farmatsevtika
                            bozorida eng tez rivojlanayotgan kompaniyalardan biri hisoblanadi.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                            Kompaniyamiz yuqori sifatli tabiiy va sintetik dori vositalar ishlab chiqarish bilan
                            shug'ullanadi. Bizning maqsadimiz - har bir oilaga sog'lom hayot kechirish imkoniyatini
                            yaratish.
                        </p>
                    </div>
                    <div className={`bg-gradient-to-br from-lime-300 to-lime-500 rounded-3xl h-96 flex items-center justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        <div className="text-white text-center">
                            <div className="text-8xl mb-4 transition-transform duration-500 hover:scale-110">🏭</div>
                            <p className="text-2xl font-bold">2017</p>
                            <p className="text-lg">Tashkil etilgan yil</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
