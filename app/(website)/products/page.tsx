'use client';

import { useState, useEffect } from 'react';
import ProductsHero from '@/components/products/ProductsHero';
import CategoryFilter from '@/components/products/CategoryFilter';
import ProductsGrid from '@/components/products/ProductsGrid';
import ProductsCTA from '@/components/products/ProductsCTA';
import { productsAPI, categoriesAPI } from '@/lib/api';

export default function Products() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState<any[]>([
        { id: 'all', name_uz: 'Barcha mahsulotlar', slug: 'all' }
    ]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    productsAPI.getAll(),
                    categoriesAPI.getAll()
                ]);

                setProducts(productsRes.data);

                // Format categories for the filter component
                const apiCategories = categoriesRes.data.map((cat: any) => ({
                    id: cat.id,
                    name: cat.name_uz, // Map name_uz to name for the component
                    slug: cat.slug
                }));

                setCategories([
                    { id: 'all', name: 'Barcha mahsulotlar', slug: 'all' },
                    ...apiCategories
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter((p: any) => p.category?.slug === selectedCategory || p.category_id === Number(selectedCategory));

    return (
        <div className="pt-32">
            <ProductsHero />
            <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />
            {isLoading ? (
                <div className="min-h-[400px] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
                </div>
            ) : (
                <ProductsGrid products={filteredProducts} />
            )}
            <ProductsCTA />
        </div>
    );
}
