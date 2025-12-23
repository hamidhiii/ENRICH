'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';
import { categoriesAPI } from '@/lib/api';

export default function CategoriesPage() {
    interface Category {
        id: number;
        name_uz: string;
        name_ru: string;
        slug: string;
        order: number;
        is_active: boolean;
        icon: string;
    }

    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCategories = async () => {
        try {
            const response = await categoriesAPI.getAll();
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this category?')) {
            try {
                await categoriesAPI.delete(id);
                fetchCategories(); // Refresh list
            } catch (error) {
                console.error('Error deleting category:', error);
                alert('Failed to delete category');
            }
        }
    };

    const columns = [
        { key: 'id', label: 'ID' },
        {
            key: 'icon',
            label: 'Icon',
            render: (value: any) => value ? (
                <img src={value.startsWith('http') ? value : `http://localhost:8001${value}`} alt="Icon" className="w-8 h-8 object-contain" />
            ) : (
                <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">-</div>
            )
        },
        { key: 'name_uz', label: 'Name (UZ)' },
        { key: 'name_ru', label: 'Name (RU)' },
        { key: 'slug', label: 'Slug' },
        { key: 'order', label: 'Order' },
        {
            key: 'is_active',
            label: 'Status',
            render: (value: any) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {value ? 'Active' : 'Inactive'}
                </span>
            )
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Categories</h1>
                    <p className="text-gray-500 mt-1">Manage product categories</p>
                </div>
                <Link
                    href="/admin/categories/new"
                    className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                >
                    <Plus size={20} />
                    Add Category
                </Link>
            </div>

            <DataTable
                columns={columns}
                data={categories}
                isLoading={isLoading}
                onDelete={handleDelete}
                editUrl={(id) => `/admin/categories/${id}/edit`}
                searchPlaceholder="Search categories..."
            />
        </div>
    );
}
