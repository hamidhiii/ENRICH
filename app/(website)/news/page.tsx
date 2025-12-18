'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { newsAPI } from '@/lib/api';

export default function NewsPage() {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await newsAPI.getAll();
                // Filter only published news
                const publishedNews = response.data.filter((item: any) => item.is_published);
                setNews(publishedNews);
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNews();
    }, []);

    return (
        <main className="min-h-screen pt-24 pb-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                        Yangiliklar
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Kompaniyamiz va farmatsevtika sohasidagi so'nggi yangiliklar bilan tanishing
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
                    </div>
                ) : news.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {news.map((item: any) => (
                            <article key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                                <div className="relative h-64 overflow-hidden">
                                    {item.image ? (
                                        <img
                                            src={item.image.startsWith('http') ? item.image : `http://localhost:8001${item.image}`}
                                            alt={item.title_uz}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-slate-700 flex items-center gap-2">
                                        <Calendar size={14} />
                                        {new Date(item.published_date || item.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h2 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-lime-600 transition-colors">
                                        {item.title_uz}
                                    </h2>
                                    <p className="text-gray-600 mb-6 line-clamp-3">
                                        {item.excerpt_uz || item.content_uz?.substring(0, 150) + '...'}
                                    </p>
                                    <Link
                                        href={`/news/${item.slug || item.id}`}
                                        className="inline-flex items-center gap-2 text-lime-600 font-bold hover:gap-3 transition-all"
                                    >
                                        Batafsil o'qish <ArrowRight size={20} />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-500">
                        Hozircha yangiliklar yo'q
                    </div>
                )}
            </div>
        </main>
    );
}
