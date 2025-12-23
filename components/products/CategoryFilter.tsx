'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Category {
    id: string | number;
    name: string;
    slug: string;
}

interface CategoryFilterProps {
    categories: Category[];
    selectedCategory: string;
    onSelectCategory: (slug: string) => void;
}

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section ref={ref} className="py-12 bg-white shadow-sm">
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap justify-center gap-4">
                    {categories.map((category, index) => (
                        <button
                            key={category.id}
                            onClick={() => onSelectCategory(category.slug)}
                            className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-500 ${selectedCategory === category.slug
                                ? 'text-white shadow-lg transform scale-105 bg-lime-500'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
