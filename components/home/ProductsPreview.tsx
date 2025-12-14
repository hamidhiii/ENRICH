'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function ProductsPreview() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section ref={ref} className="py-20 bg-gray-100 min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <h2 className={`text-3xl md:text-5xl font-bold text-center mb-10 md:mb-16 text-slate-600 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    Bizning mahsulotlarimiz
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map((item, index) => (
                        <div
                            key={item}
                            className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-700 border-2 ${item === 3 ? 'border-lime-500' : 'border-gray-300'} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                            style={{ transitionDelay: `${index * 200}ms` }}
                        >
                            {/* Product Image */}
                            <div className="h-64 bg-white flex items-center justify-center p-6">
                                <div className="text-9xl transition-transform duration-500 hover:scale-110">🌿</div>
                            </div>
                            {/* Product Info */}
                            <div className="p-6 text-center">
                                <h3 className="text-2xl font-bold mb-3 text-slate-600">
                                    Parsley
                                </h3>
                                <p className="text-gray-600 text-base leading-relaxed">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}