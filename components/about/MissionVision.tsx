'use client';

import { Target, Eye } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function MissionVision() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section ref={ref} className="py-20 bg-gray-100 min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className={`bg-white rounded-3xl p-12 shadow-lg transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                        <div className="mb-6 text-lime-500 transition-transform duration-500 hover:scale-110">
                            <Target size={64} />
                        </div>
                        <h3 className="text-3xl font-bold mb-6 text-slate-600">
                            Missiya
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Yuqori sifatli, xavfsiz va samarali farmatsevtika mahsulotlarini ishlab chiqarish orqali
                            odamlarning sog'lig'ini yaxshilash va hayot sifatini oshirish.
                        </p>
                    </div>
                    <div className={`bg-white rounded-3xl p-12 shadow-lg transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                        <div className="mb-6 text-lime-500 transition-transform duration-500 hover:scale-110">
                            <Eye size={64} />
                        </div>
                        <h3 className="text-3xl font-bold mb-6 text-slate-600">
                            Maqsad
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            O'zbekiston va mintaqa bo'ylab eng ishonchli va innovatsion farmatsevtika kompaniyasi
                            bo'lish, sog'liqni saqlash sohasida yetakchi o'rinni egallash.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
