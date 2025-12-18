'use client';

import { Microscope } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function LaboratoryPreview() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section ref={ref} className="py-20 bg-gray-100 min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className={`bg-gradient-to-br from-lime-500 to-lime-700 rounded-3xl h-96 flex items-center justify-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <div className="text-white text-center flex flex-col items-center">
                            <div className="mb-4 transition-transform duration-500 hover:scale-110">
                                <Microscope size={96} />
                            </div>
                            <p className="text-3xl font-bold">Zamonaviy laboratoriya</p>
                        </div>
                    </div>
                    <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        <h2 className="text-4xl font-bold mb-8 text-slate-600">
                            Laboratoriya va sifat nazorati
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                            Bizning zamonaviy laboratoriyamiz eng so'nggi texnologiyalar bilan jihozlangan.
                            Har bir mahsulot ishlab chiqarish jarayonida qat'iy sifat nazoratidan o'tadi.
                        </p>
                        <ul className="space-y-4">
                            {[
                                'Xalqaro standartlarga muvofiq sifat nazorati',
                                'Zamonaviy analitik uskunalar',
                                'Malakali mutaxassislar jamoasi',
                                'GMP standartlariga rioya qilish',
                            ].map((item, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-lime-500"></div>
                                    <span className="text-gray-700 text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
