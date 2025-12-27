'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { productsAPI, categoriesAPI, Category, Product } from '@/lib/api';
import FileUpload from '@/components/admin/FileUpload';
import { AxiosError } from 'axios';

type Params = Promise<{ id: string }>;

export default function EditProductPage({ params }: { params: Params }) {
    const { id } = use(params);
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [formData, setFormData] = useState({
        name_ru: '',
        name_uz: '',
        name_en: '',
        category_id: '',
        form: 'tablet',
        description_uz: '',
        description_ru: '',
        description_en: '',
        composition_uz: '',
        composition_ru: '',
        composition_en: '',
        storage_uz: '',
        storage_ru: '',
        storage_en: '',
        side_effects_uz: '',
        side_effects_ru: '',
        side_effects_en: '',
        image: '',
        is_active: true
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesRes, productRes] = await Promise.all([
                    categoriesAPI.getAll(),
                    productsAPI.getById(parseInt(id))
                ]);

                setCategories(categoriesRes.data);

                const product = productRes.data as Product;
                setFormData({
                    name_ru: product.name_ru,
                    name_uz: product.name_uz,
                    name_en: product.name_en || '',
                    category_id: product.category_id.toString(),
                    form: product.form,
                    description_uz: product.instructions_uz || '',
                    description_ru: product.instructions_ru || '',
                    description_en: product.instructions_en || '',
                    composition_uz: product.composition_uz || '',
                    composition_ru: product.composition_ru || '',
                    composition_en: product.composition_en || '',
                    storage_uz: product.storage_conditions_uz || '',
                    storage_ru: product.storage_conditions_ru || '',
                    storage_en: product.storage_conditions_en || '',
                    side_effects_uz: product.side_effects_uz || '',
                    side_effects_ru: product.side_effects_ru || '',
                    side_effects_en: product.side_effects_en || '',
                    image: product.image || '',
                    is_active: product.is_active
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('Failed to load product data');
                router.push('/admin/products');
            } finally {
                setIsFetching(false);
            }
        };
        fetchData();
    }, [id, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const productData = {
                name_uz: formData.name_uz,
                name_ru: formData.name_ru,
                name_en: formData.name_en || undefined,
                category_id: parseInt(formData.category_id),
                form: formData.form,
                instructions_uz: formData.description_uz || undefined,
                instructions_ru: formData.description_ru || undefined,
                instructions_en: formData.description_en || undefined,
                composition_uz: formData.composition_uz || undefined,
                composition_ru: formData.composition_ru || undefined,
                composition_en: formData.composition_en || undefined,
                storage_conditions_uz: formData.storage_uz || undefined,
                storage_conditions_ru: formData.storage_ru || undefined,
                storage_conditions_en: formData.storage_en || undefined,
                side_effects_uz: formData.side_effects_uz || undefined,
                side_effects_ru: formData.side_effects_ru || undefined,
                side_effects_en: formData.side_effects_en || undefined,
                image: formData.image || undefined,
                is_active: formData.is_active
            };

            await productsAPI.update(parseInt(id), productData);
            router.push('/admin/products');
        } catch (error: unknown) {
            // Ignore 401 errors as they are handled by the interceptor
            if (error instanceof AxiosError && error.response?.status === 401) return;

            console.error('Error updating product:', error);
            let errorMessage = 'Failed to update product';

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
                        href="/admin/products"
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">Edit Product</h1>
                        <p className="text-gray-500 mt-1">Update product information</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                        <select
                            name="category_id"
                            required
                            value={formData.category_id}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat: Category) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name_uz} ({cat.name_ru})
                                </option>
                            ))}
                        </select>
                    </div>

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
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Form *</label>
                        <select
                            name="form"
                            required
                            value={formData.form}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                        >
                            <option value="tablet">Tablet</option>
                            <option value="syrup">Syrup</option>
                            <option value="capsule">Capsule</option>
                            <option value="injection">Injection</option>
                            <option value="ointment">Ointment</option>
                            <option value="spray">Spray</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                {/* Image Upload */}
                <div>
                    <FileUpload
                        label="Product Image"
                        value={formData.image}
                        onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                    />
                </div>

                {/* Descriptions */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Description / Instructions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Instructions (UZ)</label>
                            <textarea
                                name="description_uz"
                                rows={4}
                                value={formData.description_uz}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                                placeholder="Product details in Uzbek..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Instructions (RU)</label>
                            <textarea
                                name="description_ru"
                                rows={4}
                                value={formData.description_ru}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                                placeholder="Product details in Russian..."
                            />
                        </div>
                    </div>
                </div>

                {/* Composition */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Composition</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Composition (UZ)</label>
                            <textarea
                                name="composition_uz"
                                rows={3}
                                value={formData.composition_uz}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                                placeholder="Composition in Uzbek..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Composition (RU)</label>
                            <textarea
                                name="composition_ru"
                                rows={3}
                                value={formData.composition_ru}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                                placeholder="Composition in Russian..."
                            />
                        </div>
                    </div>
                </div>

                {/* Storage Conditions */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Storage Conditions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Storage (UZ)</label>
                            <textarea
                                name="storage_uz"
                                rows={3}
                                value={formData.storage_uz}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                                placeholder="Storage conditions in Uzbek..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Storage (RU)</label>
                            <textarea
                                name="storage_ru"
                                rows={3}
                                value={formData.storage_ru}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                                placeholder="Storage conditions in Russian..."
                            />
                        </div>
                    </div>
                </div>

                {/* Side Effects */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Side Effects</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Side Effects (UZ)</label>
                            <textarea
                                name="side_effects_uz"
                                rows={3}
                                value={formData.side_effects_uz}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                                placeholder="Side effects in Uzbek..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Side Effects (RU)</label>
                            <textarea
                                name="side_effects_ru"
                                rows={3}
                                value={formData.side_effects_ru}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                                placeholder="Side effects in Russian..."
                            />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
                    <Link
                        href="/admin/products"
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
