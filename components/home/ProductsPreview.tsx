'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductsGrid from '@/components/products/ProductsGrid';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { productsAPI } from '@/lib/api';

export default function ProductsPreview() {
    const { ref, isVisible } = useScrollAnimation();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch featured products or just the first 4
                const response = await productsAPI.getAll({ limit: 4 });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl font-bold mb-4 text-slate-800">
                        Bizning Mahsulotlar
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Yuqori sifatli va samarali dori vositalari
                    </p>
                </div>

                {isLoading ? (
                    <div className="min-h-[300px] flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
                    </div>
                ) : (
                    <ProductsGrid products={products} />
                )}

                <div className="text-center mt-12">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-lime-500 text-white rounded-full font-bold hover:bg-lime-600 transition-all hover:shadow-lg hover:-translate-y-1"
                    >
                        Barcha mahsulotlarni ko'rish
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
}