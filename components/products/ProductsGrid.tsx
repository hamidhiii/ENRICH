'use client';

import Link from 'next/link';
import { Leaf, Pill, FlaskConical, Droplets, Package, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/context/LanguageContext';

interface Product {
    id: number;
    name_uz: string;
    name_ru?: string;
    category: {
        name_uz: string;
    };
    description_uz?: string;
    description_ru?: string;
    image?: string;
    // Fallback for static data if needed, but we aim to replace it
    icon?: React.ReactNode;
}

interface ProductsGridProps {
    products: any[]; // Using any[] temporarily to allow mixed types during transition, or strict Product[]
}

export default function ProductsGrid({ products }: ProductsGridProps) {
    const { ref, isVisible } = useScrollAnimation();
    const { t, language } = useLanguage();

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
                                <div className="transition-transform duration-500 hover:scale-110 w-full h-full flex items-center justify-center">
                                    {product.image ? (
                                        <img
                                            src={product.image.startsWith('http') ? product.image : `http://localhost:8001${product.image}`}
                                            alt={language === 'uz' ? product.name_uz : (product.name_ru || product.name_uz)}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        product.icon || <Package size={64} />
                                    )}
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-6 text-center">
                                <h3 className="text-2xl font-bold mb-3 text-slate-600">
                                    {language === 'uz' ? product.name_uz : (product.name_ru || product.name_uz)}
                                </h3>
                                <p className="text-gray-600 text-base leading-relaxed mb-6 line-clamp-3">
                                    {language === 'uz' ? product.description_uz : (product.description_ru || product.description_uz)}
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
