'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Product {
    id: number;
    name: string;
    category: string;
    description: string;
    image: string;
}

interface ProductsGridProps {
    products: Product[];
}

export default function ProductsGrid({ products }: ProductsGridProps) {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section ref={ref} className="py-20 bg-gray-100 min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-700 hover:-translate-y-2 border-2 cursor-pointer ${index === 2 ? 'border-lime-500' : 'border-gray-300'} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            {/* Product Image */}
                            <div className="h-64 bg-white flex items-center justify-center p-6 border-b-2 border-gray-100">
                                <div className="text-9xl transition-transform duration-500 hover:scale-110">{product.image}</div>
                            </div>

                            {/* Product Info */}
                            <div className="p-6 text-center">
                                <h3 className="text-2xl font-bold mb-3 text-slate-600">
                                    {product.name}
                                </h3>
                                <p className="text-gray-600 text-base leading-relaxed mb-4">
                                    {product.description}
                                </p>
                                <button
                                    className="w-full py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90 bg-lime-500"
                                >
                                    Batafsil
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results */}
                {products.length === 0 && (
                    <div className={`text-center py-20 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <div className="text-8xl mb-6">📦</div>
                        <h3 className="text-3xl font-bold mb-4 text-slate-600">
                            Mahsulotlar topilmadi
                        </h3>
                        <p className="text-gray-600 text-lg">
                            Ushbu kategoriyada hozircha mahsulotlar mavjud emas
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
