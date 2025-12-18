'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { certificatesAPI } from '@/lib/api';
import FileUpload from '@/components/admin/FileUpload';

export default function NewCertificatePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name_ru: '',
        name_uz: '',
        name_en: '',
        description_ru: '',
        description_uz: '',
        description_en: '',
        certificate_type: '',
        image: '',
        pdf_file: '',
        issue_date: '',
        expiry_date: '',
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const dataToSend = {
                ...formData,
                order: parseInt(formData.order.toString()) || 0,
                issue_date: formData.issue_date || null,
                expiry_date: formData.expiry_date || null
            };

            await certificatesAPI.create(dataToSend);
            router.push('/admin/certificates');
        } catch (error: any) {
            console.error('Error creating certificate:', error);
            let errorMessage = 'Failed to create certificate';

            if (error.response) {
                errorMessage = `Status: ${error.response.status}. Data: ${JSON.stringify(error.response.data)}`;
            } else if (error.request) {
                errorMessage = 'No response received from server (Network/CORS error)';
            } else {
                errorMessage = error.message;
            }

            alert(`Error Details: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/certificates"
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">Add Certificate</h1>
                        <p className="text-gray-500 mt-1">Add a new certificate or license</p>
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
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                        <input
                            type="text"
                            name="certificate_type"
                            value={formData.certificate_type}
                            onChange={handleChange}
                            placeholder="e.g. ISO, GMP"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Issue Date</label>
                        <input
                            type="date"
                            name="issue_date"
                            value={formData.issue_date}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                        <input
                            type="date"
                            name="expiry_date"
                            value={formData.expiry_date}
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

                {/* Files */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <FileUpload
                            label="Certificate Image"
                            value={formData.image}
                            onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                        />
                    </div>
                    <div>
                        <FileUpload
                            label="PDF File"
                            value={formData.pdf_file}
                            onChange={(url) => setFormData(prev => ({ ...prev, pdf_file: url }))}
                            accept="application/pdf"
                            type="pdf"
                        />
                    </div>
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
                        href="/admin/certificates"
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
                        {isLoading ? 'Saving...' : 'Save Certificate'}
                    </button>
                </div>
            </form>
        </div>
    );
}
