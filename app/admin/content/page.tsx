'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Edit, Layout, Plus, Search } from 'lucide-react';
import { contentAPI, PageSection } from '@/lib/api';

export default function ContentManagementPage() {
    const [sections, setSections] = useState<PageSection[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterPage, setFilterPage] = useState('all');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchSections();
    }, []);

    const fetchSections = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await contentAPI.getSections();
            console.log('Fetched sections:', response.data);
            setSections(response.data);
        } catch (err: unknown) {
            console.error('Error fetching sections:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch sections');
        } finally {
            setIsLoading(false);
        }
    };

    const filteredSections = sections.filter(section => {
        const matchesSearch =
            section.page_path.toLowerCase().includes(searchQuery.toLowerCase()) ||
            section.section_key.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (section.title_uz && section.title_uz.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesPage = filterPage === 'all' || section.page_path === filterPage;

        return matchesSearch && matchesPage;
    });

    const pages = ['all', ...Array.from(new Set(sections.map(s => s.page_path)))];

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Content Management</h1>
                    <p className="text-gray-500 mt-1">Manage website sections, text, and images</p>
                </div>
                <Link
                    href="/admin/content/new"
                    className="flex items-center justify-center gap-2 bg-lime-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-lime-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                    <Plus size={20} />
                    Add New Section
                </Link>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl mb-8 flex items-center justify-between">
                    <p>Error: {error}</p>
                    <button onClick={fetchSections} className="text-sm font-bold underline hover:no-underline">Retry</button>
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search sections..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-lime-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <select
                        value={filterPage}
                        onChange={(e) => setFilterPage(e.target.value)}
                        className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-lime-500 outline-none transition-all min-w-[150px]"
                    >
                        {pages.map(page => (
                            <option key={page} value={page}>
                                {page.charAt(0).toUpperCase() + page.slice(1)} Page
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSections.map((section) => (
                        <div key={section.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-lime-50 text-lime-600 rounded-xl">
                                        <Layout size={24} />
                                    </div>
                                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase tracking-wider">
                                        {section.page_path}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">
                                    {(() => {
                                        const mapping: { [key: string]: string } = {
                                            'hero': 'Главный баннер (Слайдер)',
                                            'about': 'О компании (на главной)',
                                            'stat': 'Цифры и факты (Статистика)',
                                            'testimonial': 'Отзывы клиентов',
                                            'capacity': 'Производственные мощности',
                                            'trial': 'Клинические испытания',
                                            'cta': 'Призыв к действию (CTA)',
                                            'about_hero': 'Баннер (О компании)',
                                            'history': 'История компании',
                                            'mission': 'Миссия',
                                            'vision': 'Цель/Видение',
                                            'lab_preview': 'Превью лаборатории',
                                            'quality_control': 'Контроль качества'
                                        };
                                        return mapping[section.section_key.toLowerCase()] || section.section_key.replace(/_/g, ' ').toUpperCase();
                                    })()}
                                </h3>
                                <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                                    {section.title_uz || 'No title set'}
                                </p>
                                <Link
                                    href={`/admin/content/${section.id}/edit`}
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-slate-50 text-slate-600 rounded-xl font-bold group-hover:bg-lime-500 group-hover:text-white transition-all"
                                >
                                    <Edit size={18} />
                                    Edit Content
                                </Link>
                            </div>
                        </div>
                    ))}

                    {filteredSections.length === 0 && (
                        <div className="col-span-full text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-500">No sections found matching your criteria.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
