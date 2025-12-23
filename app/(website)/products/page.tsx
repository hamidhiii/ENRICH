'use client';

import { useState, useEffect } from 'react';
import ProductsHero from '@/components/products/ProductsHero';
import CategoryFilter from '@/components/products/CategoryFilter';
import ProductsGrid from '@/components/products/ProductsGrid';
import ProductsCTA from '@/components/products/ProductsCTA';
import { productsAPI, categoriesAPI, Product, Category } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';

interface FilterCategory {
    id: string | number;
    name: string;
    slug: string;
}

export default function Products() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [products, setProducts] = useState<Product[]>([]);
    const { t, language } = useLanguage();
    const [categories, setCategories] = useState<FilterCategory[]>([
        { id: 'all', name: t.products.all_products, slug: 'all' }
    ]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    productsAPI.getAll(),
                    categoriesAPI.getAll()
                ]);

                setProducts(productsRes.data as Product[]);

                // Format categories for the filter component
                const apiCategories: FilterCategory[] = (categoriesRes.data as Category[]).map((cat: Category) => ({
                    id: cat.id,
                    name: language === 'uz' ? cat.name_uz : (cat.name_ru || cat.name_uz),
                    slug: cat.slug
                }));

                setCategories([
                    { id: 'all', name: t.products.all_products, slug: 'all' },
                    ...apiCategories
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [language, t.products.all_products]);

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter((p: Product) => p.category?.slug === selectedCategory || p.category_id === Number(selectedCategory));

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
