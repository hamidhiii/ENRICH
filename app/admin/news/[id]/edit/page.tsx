'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { newsAPI, News } from '@/lib/api';
import FileUpload from '@/components/admin/FileUpload';
import { AxiosError } from 'axios';

type Params = Promise<{ id: string }>;

export default function EditNewsPage({ params }: { params: Params }) {
    const { id } = use(params);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [formData, setFormData] = useState<Partial<News>>({
        title_ru: '',
        title_uz: '',
        title_en: '',
        slug: '',
        excerpt_ru: '',
        excerpt_uz: '',
        excerpt_en: '',
        content_ru: '',
        content_uz: '',
        content_en: '',
        image: '',
        is_published: true
    });

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await newsAPI.getById(parseInt(id));
                const news = response.data;

                setFormData({
                    title_ru: news.title_ru,
                    title_uz: news.title_uz,
                    title_en: news.title_en || '',
                    slug: news.slug,
                    excerpt_ru: news.excerpt_ru || '',
                    excerpt_uz: news.excerpt_uz || '',
                    excerpt_en: news.excerpt_en || '',
                    content_ru: news.content_ru,
                    content_uz: news.content_uz,
                    content_en: news.content_en || '',
                    image: news.image || '',
                    is_published: news.is_published
                });
            } catch (error) {
                console.error('Error fetching news:', error);
                alert('Failed to load news data');
                router.push('/admin/news');
            } finally {
                setIsFetching(false);
            }
        };
        fetchNews();
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

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            // Auto-generate slug from English title if slug is empty
            if (name === 'title_en' && !prev.slug) {
                newData.slug = generateSlug(value);
            }
            return newData;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await newsAPI.update(parseInt(id), formData);
            router.push('/admin/news');
        } catch (error: unknown) {
            console.error('Error updating news:', error);
            let errorMessage = 'Failed to update news';

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
                        href="/admin/news"
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">Edit News</h1>
                        <p className="text-gray-500 mt-1">Update article</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title (UZ) *</label>
                        <input
                            type="text"
                            name="title_uz"
                            required
                            value={formData.title_uz}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title (RU) *</label>
                        <input
                            type="text"
                            name="title_ru"
                            required
                            value={formData.title_ru}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title (EN)</label>
                        <input
                            type="text"
                            name="title_en"
                            value={formData.title_en}
                            onChange={handleTitleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                        />
                    </div>

                    <div className="col-span-2">
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

                    <div className="col-span-2 flex items-center h-full pt-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="is_published"
                                checked={formData.is_published}
                                onChange={handleChange}
                                className="w-5 h-5 rounded border-gray-300 text-lime-600 focus:ring-lime-500"
                            />
                            <span className="text-gray-700 font-medium">Published</span>
                        </label>
                    </div>
                </div>

                {/* Image Upload */}
                <div>
                    <FileUpload
                        label="Featured Image"
                        value={formData.image}
                        onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                    />
                </div>

                {/* Content */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Content (UZ) *</label>
                        <textarea
                            name="content_uz"
                            required
                            rows={6}
                            value={formData.content_uz}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Content (RU) *</label>
                        <textarea
                            name="content_ru"
                            required
                            rows={6}
                            value={formData.content_ru}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Content (EN)</label>
                        <textarea
                            name="content_en"
                            rows={6}
                            value={formData.content_en}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
                    <Link
                        href="/admin/news"
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
