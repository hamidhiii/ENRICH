'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { categoriesAPI, Category } from '@/lib/api';
import FileUpload from '@/components/admin/FileUpload';
import { AxiosError } from 'axios';

type Params = Promise<{ id: string }>;

export default function EditCategoryPage({ params }: { params: Params }) {
    const { id } = use(params);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [formData, setFormData] = useState<Partial<Category>>({
        name_ru: '',
        name_uz: '',
        name_en: '',
        slug: '',
        description_ru: '',
        description_uz: '',
        description_en: '',
        icon: '',
        order: 0,
        is_active: true
    });

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await categoriesAPI.getById(parseInt(id));
                const category = response.data as Category;

                setFormData({
                    name_ru: category.name_ru,
                    name_uz: category.name_uz,
                    name_en: category.name_en || '',
                    slug: category.slug,
                    description_ru: category.description_ru || '',
                    description_uz: category.description_uz || '',
                    description_en: category.description_en || '',
                    icon: category.icon || '',
                    order: category.order,
                    is_active: category.is_active
                });
            } catch (error) {
                console.error('Error fetching category:', error);
                alert('Failed to load category data');
                router.push('/admin/categories');
            } finally {
                setIsFetching(false);
            }
        };
        fetchCategory();
    }, [id, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            // Auto-generate slug from English name if slug is empty
            if (name === 'name_en' && !prev.slug) {
                newData.slug = generateSlug(value);
            }
            return newData;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const categoryData = {
                ...formData,
                order: parseInt(formData.order?.toString() || '0') || 0
            };

            await categoriesAPI.update(parseInt(id), categoryData);
            router.push('/admin/categories');
        } catch (error: unknown) {
            console.error('Error updating category:', error);
            let errorMessage = 'Failed to update category';

            if (error instanceof AxiosError && error.response) {
                errorMessage = `Status: ${error.response.status}. Data: ${JSON.stringify(error.response.data)}`;
            } else if (error instanceof AxiosError && error.request) {
                errorMessage = 'No response received from server (Network/CORS error)';
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            alert(`Error Details: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/categories"
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">Edit Category</h1>
                        <p className="text-gray-500 mt-1">Update category information</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name (UZ) *</label>
                        <input
                            type="text"
                            name="name_uz"
                            required
                            value={formData.name_uz}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name (RU) *</label>
                        <input
                            type="text"
                            name="name_ru"
                            required
                            value={formData.name_ru}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name (EN)</label>
                        <input
                            type="text"
                            name="name_en"
                            value={formData.name_en}
                            onChange={handleNameChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
                        <input
                            type="text"
                            name="slug"
                            required
                            value={formData.slug}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                        <input
                            type="number"
                            name="order"
                            value={formData.order}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                        />
                    </div>

                    <div className="flex items-center h-full pt-8">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="is_active"
                                checked={formData.is_active}
                                onChange={handleChange}
                                className="w-5 h-5 rounded border-gray-300 text-lime-600 focus:ring-lime-500"
                            />
                            <span className="text-gray-700 font-medium">Active</span>
                        </label>
                    </div>
                </div>

                {/* Icon Upload */}
                <div>
                    <FileUpload
                        label="Category Icon"
                        value={formData.icon || ''}
                        onChange={(url) => setFormData(prev => ({ ...prev, icon: url }))}
                    />
                </div>

                {/* Descriptions */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description (UZ)</label>
                        <textarea
                            name="description_uz"
                            rows={3}
                            value={formData.description_uz}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description (RU)</label>
                        <textarea
                            name="description_ru"
                            rows={3}
                            value={formData.description_ru}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description (EN)</label>
                        <textarea
                            name="description_en"
                            rows={3}
                            value={formData.description_en}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
                    <Link
                        href="/admin/categories"
                        className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-3 rounded-lg bg-lime-500 text-white font-bold hover:bg-lime-600 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center gap-2"
                    >
                        <Save size={20} />
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
