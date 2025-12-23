'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { contentAPI, PageSection } from '@/lib/api';
import FileUpload from '@/components/admin/FileUpload';
import { AxiosError } from 'axios';

export default function NewSectionPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<PageSection>>({
        page_path: 'home',
        section_key: '',
        title_uz: '',
        title_ru: '',
        subtitle_uz: '',
        subtitle_ru: '',
        content_uz: '',
        content_ru: '',
        image: '',
        background_image: '',
        button_text_uz: '',
        button_text_ru: '',
        button_link: '',
        order: 0,
        is_active: true
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent, addAnother = false) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await contentAPI.createSection(formData);
            if (addAnother) {
                setFormData(prev => ({
                    ...prev,
                    title_uz: '',
                    title_ru: '',
                    subtitle_uz: '',
                    subtitle_ru: '',
                    content_uz: '',
                    content_ru: '',
                    image: '',
                    background_image: '',
                    order: (prev.order || 0) + 1
                }));
                alert('Section added! You can now add another one.');
            } else {
                router.push('/admin/content');
            }
        } catch (error: unknown) {
            console.error('Error creating section:', error);
            if (!(error instanceof AxiosError && error.response?.status === 401)) {
                alert('Failed to create section');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/content"
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">Add New Section</h1>
                        <p className="text-gray-500 mt-1">Create a new manageable section</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Configuration */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Configuration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Page Path *</label>
                            <select
                                name="page_path"
                                required
                                value={formData.page_path}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                            >
                                <option value="home">Home</option>
                                <option value="about">About</option>
                                <option value="products">Products</option>
                                <option value="partners">Partners</option>
                                <option value="contact">Contact</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Section Type *</label>
                            <select
                                name="section_key"
                                required
                                value={formData.section_key}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                            >
                                <option value="">Select Type</option>
                                <option value="hero">Главный баннер (Слайдер)</option>
                                <option value="about">О компании (на главной)</option>
                                <option value="stat">Цифры и факты (Статистика)</option>
                                <option value="testimonial">Отзывы клиентов</option>
                                <option value="capacity">Производственные мощности</option>
                                <option value="trial">Клинические испытания</option>
                                <option value="cta">Призыв к действию (CTA)</option>
                                <option value="about_hero">Баннер (О компании)</option>
                                <option value="history">История компании</option>
                                <option value="mission">Миссия</option>
                                <option value="vision">Цель/Видение</option>
                                <option value="lab_preview">Превью лаборатории</option>
                                <option value="quality_control">Контроль качества</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Titles */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
                        {formData.section_key === 'stat' ? 'Stat Details' :
                            formData.section_key === 'testimonial' ? 'Client Info' :
                                formData.section_key === 'capacity' ? 'Capacity Details' :
                                    formData.section_key === 'history' ? 'History Details' : 'Titles'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {formData.section_key === 'stat' ? 'Label (UZ)' :
                                    formData.section_key === 'testimonial' ? 'Client Name (UZ)' :
                                        formData.section_key === 'capacity' ? 'Type (UZ)' :
                                            ['mission', 'vision'].includes(formData.section_key || '') ? 'Title (UZ)' : 'Title (UZ)'}
                            </label>
                            <input
                                type="text"
                                name="title_uz"
                                value={formData.title_uz}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {formData.section_key === 'stat' ? 'Label (RU)' :
                                    formData.section_key === 'testimonial' ? 'Client Name (RU)' :
                                        formData.section_key === 'capacity' ? 'Type (RU)' :
                                            ['mission', 'vision'].includes(formData.section_key || '') ? 'Title (RU)' : 'Title (RU)'}
                            </label>
                            <input
                                type="text"
                                name="title_ru"
                                value={formData.title_ru}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {formData.section_key === 'stat' ? 'Value (UZ)' :
                                    formData.section_key === 'testimonial' ? 'Profession (UZ)' :
                                        formData.section_key === 'capacity' ? 'Value (UZ)' :
                                            formData.section_key === 'history' ? 'Year (UZ)' :
                                                formData.section_key === 'quality_control' ? 'Badge Text (UZ)' : 'Subtitle (UZ)'}
                            </label>
                            <input
                                type="text"
                                name="subtitle_uz"
                                value={formData.subtitle_uz}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {formData.section_key === 'stat' ? 'Value (RU)' :
                                    formData.section_key === 'testimonial' ? 'Profession (RU)' :
                                        formData.section_key === 'capacity' ? 'Value (RU)' :
                                            formData.section_key === 'history' ? 'Year (RU)' :
                                                formData.section_key === 'quality_control' ? 'Badge Text (RU)' : 'Subtitle (RU)'}
                            </label>
                            <input
                                type="text"
                                name="subtitle_ru"
                                value={formData.subtitle_ru}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Content */}
                {['hero', 'about', 'testimonial', 'capacity', 'trial', 'cta', 'about_hero', 'history', 'mission', 'vision', 'lab_preview', 'quality_control'].includes(formData.section_key || '') && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                        <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
                            {formData.section_key === 'testimonial' ? 'Review Text' :
                                ['mission', 'vision'].includes(formData.section_key || '') ? 'Description' : 'Main Content'}
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Content (UZ)</label>
                                <textarea
                                    name="content_uz"
                                    rows={6}
                                    value={formData.content_uz}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Content (RU)</label>
                                <textarea
                                    name="content_ru"
                                    rows={6}
                                    value={formData.content_ru}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Media */}
                {['hero', 'about', 'testimonial', 'cta', 'about_hero', 'lab_preview', 'history'].includes(formData.section_key || '') && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                        <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Media</h3>
                        {['hero', 'about', 'testimonial', 'lab_preview', 'history'].includes(formData.section_key || '') && (
                            <FileUpload
                                label={formData.section_key === 'testimonial' ? "Client Photo" : "Section Image"}
                                value={formData.image || ''}
                                onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                            />
                        )}
                        {['hero', 'cta', 'about_hero'].includes(formData.section_key || '') && (
                            <FileUpload
                                label="Background Image"
                                value={formData.background_image || ''}
                                onChange={(url) => setFormData(prev => ({ ...prev, background_image: url }))}
                            />
                        )}
                    </div>
                )}

                {/* Button / Suffix */}
                {['hero', 'about', 'stat', 'cta', 'history', 'lab_preview'].includes(formData.section_key || '') && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                        <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
                            {formData.section_key === 'stat' ? 'Suffix (e.g., %, +)' :
                                formData.section_key === 'history' ? 'Year Label (e.g., Tashkil etilgan yil)' : 'Action Button'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {formData.section_key === 'stat' ? 'Suffix (UZ)' :
                                        formData.section_key === 'history' ? 'Label (UZ)' : 'Button Text (UZ)'}
                                </label>
                                <input
                                    type="text"
                                    name="button_text_uz"
                                    value={formData.button_text_uz}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {formData.section_key === 'stat' ? 'Suffix (RU)' :
                                        formData.section_key === 'history' ? 'Label (RU)' : 'Button Text (RU)'}
                                </label>
                                <input
                                    type="text"
                                    name="button_text_ru"
                                    value={formData.button_text_ru}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                                />
                            </div>
                            {!['stat', 'history'].includes(formData.section_key || '') && (
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                                    <input
                                        type="text"
                                        name="button_link"
                                        value={formData.button_link}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                                        placeholder="/products, https://..."
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-end gap-4 pt-4">
                    <Link
                        href="/admin/content"
                        className="px-8 py-4 rounded-xl border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-all"
                    >
                        Cancel
                    </Link>
                    <button
                        type="button"
                        onClick={(e) => handleSubmit(e, true)}
                        disabled={isLoading}
                        className="px-8 py-4 rounded-xl border-2 border-lime-500 text-lime-600 font-bold hover:bg-lime-50 transition-all disabled:opacity-50"
                    >
                        Save and Add Another
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-8 py-4 rounded-xl bg-lime-500 text-white font-bold hover:bg-lime-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center gap-2"
                    >
                        <Save size={20} />
                        {isLoading ? 'Creating...' : 'Create Section'}
                    </button>
                </div>
            </form>
        </div>
    );
}
