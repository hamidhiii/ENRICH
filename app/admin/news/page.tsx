'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Eye } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';
import { newsAPI } from '@/lib/api';

export default function NewsPage() {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchNews = async () => {
        try {
            const response = await newsAPI.getAll();
            setNews(response.data);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this news article?')) {
            try {
                await newsAPI.delete(id);
                fetchNews(); // Refresh list
            } catch (error) {
                console.error('Error deleting news:', error);
                alert('Failed to delete news');
            }
        }
    };

    const columns = [
        { key: 'id', label: 'ID' },
        {
            key: 'image',
            label: 'Image',
            render: (value: string) => value ? (
                <img src={value.startsWith('http') ? value : `http://localhost:8001${value}`} alt="News" className="w-16 h-10 object-cover rounded" />
            ) : (
                <div className="w-16 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">No Img</div>
            )
        },
        { key: 'title_uz', label: 'Title (UZ)' },
        {
            key: 'published_date',
            label: 'Date',
            render: (value: string) => value ? new Date(value).toLocaleDateString() : '-'
        },
        {
            key: 'views',
            label: 'Views',
            render: (value: number) => (
                <div className="flex items-center gap-1 text-gray-500">
                    <Eye size={14} />
                    <span>{value}</span>
                </div>
            )
        },
        {
            key: 'is_published',
            label: 'Status',
            render: (value: boolean) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {value ? 'Published' : 'Draft'}
                </span>
            )
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">News</h1>
                    <p className="text-gray-500 mt-1">Manage news and articles</p>
                </div>
                <Link
                    href="/admin/news/new"
                    className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                >
                    <Plus size={20} />
                    Add News
                </Link>
            </div>

            <DataTable
                columns={columns}
                data={news}
                isLoading={isLoading}
                onDelete={handleDelete}
                editUrl={(id) => `/admin/news/${id}/edit`}
                searchPlaceholder="Search news..."
            />
        </div>
    );
}
