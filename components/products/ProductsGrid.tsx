'use client';

import Link from 'next/link';
import { Package, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/context/LanguageContext';
import { Product } from '@/lib/api';

interface ProductsGridProps {
    products: Product[];
}

export default function ProductsGrid({ products }: ProductsGridProps) {
    const { ref, isVisible } = useScrollAnimation();
    const { t, language } = useLanguage();

    const getProductName = (product: Product) => {
        return language === 'uz' ? product.name_uz : (product.name_ru || product.name_uz);
    };

    const getProductDescription = (product: Product) => {
        // Using instructions as a fallback for description if needed, or composition
        const desc = language === 'uz' ? product.instructions_uz : (product.instructions_ru || product.instructions_uz);
        return desc || '';
    };

    return (
        <section ref={ref} className="py-20 bg-gray-100 min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                        <Link
                            key={product.id}
                            href={`/products/${product.id}`}
                            className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-700 hover:-translate-y-2 border-2 cursor-pointer ${index === 2 ? 'border-lime-500' : 'border-gray-300'} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            {/* Product Image */}
                            <div className="h-64 bg-white flex items-center justify-center p-6 border-b-2 border-gray-100 text-lime-500 overflow-hidden">
                                <div className="transition-transform duration-500 hover:scale-110 w-full h-full flex items-center justify-center relative">
                                    {product.image ? (
                                        <Image
                                            src={product.image.startsWith('http') ? product.image : `http://localhost:8001${product.image}`}
                                            alt={getProductName(product)}
                                            fill
                                            className="object-contain"
                                        />
                                    ) : (
                                        <Package size={64} />
                                    )}
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-6 text-center">
                                <h3 className="text-2xl font-bold mb-3 text-slate-600">
                                    {getProductName(product)}
                                </h3>
                                <p className="text-gray-600 text-base leading-relaxed mb-6 line-clamp-3">
                                    {getProductDescription(product)}
                                </p>

                                <div className="inline-flex items-center gap-2 text-lime-600 font-bold hover:text-lime-700 transition-colors group">
                                    {t.products.details}
                                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* No Results */}
                {products.length === 0 && (
                    <div className={`text-center py-20 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <div className="text-8xl mb-6 flex justify-center text-gray-400">
                            <Package size={96} />
                        </div>
                        <h3 className="text-3xl font-bold mb-4 text-slate-600">
                            {t.products.no_products}
                        </h3>
                        <p className="text-gray-600 text-lg">
                            {t.products.no_products_desc}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
