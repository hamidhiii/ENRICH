'use client';

import { useState } from 'react';
import ProductsHero from '@/components/products/ProductsHero';
import CategoryFilter from '@/components/products/CategoryFilter';
import ProductsGrid from '@/components/products/ProductsGrid';
import ProductsCTA from '@/components/products/ProductsCTA';

const categories = [
    { id: 1, name: 'Barcha mahsulotlar', slug: 'all' },
    { id: 2, name: 'Antibiotiklar', slug: 'antibiotics' },
    { id: 3, name: 'Vitaminlar', slug: 'vitamins' },
    { id: 4, name: 'Bolalar uchun', slug: 'for-children' },
    { id: 5, name: 'Allergiya dorilar', slug: 'allergy' },
];

const products = [
    { id: 1, name: 'Parsley', category: 'vitamins', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt', image: '🌿' },
    { id: 2, name: 'Vitamin C', category: 'vitamins', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt', image: '💊' },
    { id: 3, name: 'Amoxicillin', category: 'antibiotics', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt', image: '💊' },
    { id: 4, name: 'Kids Syrup', category: 'for-children', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt', image: '🧪' },
    { id: 5, name: 'Allergy Relief', category: 'allergy', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt', image: '💊' },
    { id: 6, name: 'Multivitamin', category: 'vitamins', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt', image: '🌿' },
    { id: 7, name: 'Penicillin', category: 'antibiotics', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt', image: '💊' },
    { id: 8, name: 'Baby Drops', category: 'for-children', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt', image: '💧' },
];

export default function Products() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <div className="pt-32">
            <ProductsHero />
            <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />
            <ProductsGrid products={filteredProducts} />
            <ProductsCTA />
        </div>
    );
}
