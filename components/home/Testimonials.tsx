'use client';

import { Star, Quote } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Testimonials() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section ref={ref} className="py-20 bg-gray-100 min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <h2 className={`text-3xl md:text-5xl font-bold text-center mb-10 md:mb-16 text-slate-600 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    Mijozlarimizning fikrlari
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[1, 2].map((item, index) => (
                        <div
                            key={item}
                            className={`bg-white rounded-2xl p-8 shadow-md transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                            style={{ transitionDelay: `${index * 300}ms` }}
                        >
                            <p className="text-gray-600 mb-8 italic text-lg leading-relaxed">
                                Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's
                                standard dummy text ever since the 1500s.
                            </p>
                            <div className="flex items-center gap-6 relative">
                                {/* Client Photo */}
                                <div className="w-20 h-20 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
                                    <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-500"></div>
                                </div>

                                {/* Client Info */}
                                <div className="flex-1">
                                    <h4 className="font-bold text-xl mb-1 text-slate-600">
                                        Client Name
                                    </h4>
                                    <p className="text-gray-500 text-sm mb-2">Profession</p>
                                    <div className="flex gap-1 text-lime-500">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} size={20} fill="currentColor" />
                                        ))}
                                    </div>
                                </div>

                                {/* Large Quote Mark */}
                                <div className="absolute -right-4 -top-4 text-orange-400 opacity-20">
                                    <Quote size={80} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
