'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/context/LanguageContext';
import { newsAPI, News, getImageUrl } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';

export default function NewsSection() {
    const { ref } = useScrollAnimation();
    const { language } = useLanguage();
    const [news, setNews] = useState<News[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await newsAPI.getAll({ is_published: true, limit: 3 });
                if (response && response.data) {
                    setNews(response.data);
                }
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNews();
    }, []);

    const getField = (item: News, field: 'title' | 'excerpt' | 'content') => {
        if (!item) return '';
        const key = `${field}_${language}` as keyof News;
        return (item[key] as string) || (item[`${field}_uz` as keyof News] as string) || '';
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '';
            return date.toLocaleDateString(language === 'uz' ? 'uz-UZ' : 'ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        } catch {
            return '';
        }
    };

    if (isLoading) return (
        <div className="py-24 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500 mx-auto"></div>
        </div>
    );

    return (
        <section ref={ref} className="py-24 bg-gray-50">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="transition-all duration-1000 opacity-100 translate-x-0">
                        <h2 className="text-2xl md:text-5xl font-bold text-slate-800 mb-4">
                            {language === 'uz' ? 'Yangiliklar' : 'Новости'}
                        </h2>
                        <p className="text-gray-600 text-base md:text-lg max-w-2xl">
                            {language === 'uz'
                                ? 'Kompaniyamiz hayotidagi so\'nggi o\'zgarishlar va muhim voqealar'
                                : 'Последние изменения и важные события в жизни нашей компании'}
                        </p>
                    </div>
                    <Link
                        href="/news"
                        className="group flex items-center gap-2 text-lime-600 font-bold text-lg hover:text-lime-700 transition-all"
                    >
                        {language === 'uz' ? 'Barcha yangiliklar' : 'Все новости'}
                        <ArrowRight className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {news.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-xl">
                            {language === 'uz' ? 'Hozircha yangiliklar yo\'q' : 'Новости пока отсутствуют'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {news.map((item, index) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-700 opacity-100 translate-y-0"
                                style={{ transitionDelay: `${index * 200}ms` }}
                            >
                                <div className="relative h-64 overflow-hidden group">
                                    <Image
                                        src={item.image ? getImageUrl(item.image) : '/images/news-placeholder.jpg'}
                                        alt={getField(item, 'title')}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = '/images/logo.jpg';
                                        }}
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium text-slate-700">
                                        <Calendar size={16} className="text-lime-600" />
                                        {formatDate(item.published_date)}
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 line-clamp-2 hover:text-lime-600 transition-colors">
                                        {getField(item, 'title')}
                                    </h3>
                                    <p className="text-gray-600 mb-8 line-clamp-3 text-base md:text-lg leading-relaxed">
                                        {getField(item, 'excerpt')}
                                    </p>
                                    <Link
                                        href={`/news/${item.slug || item.id}`}
                                        className="inline-flex items-center gap-2 text-lime-600 font-bold hover:gap-3 transition-all"
                                    >
                                        {language === 'uz' ? 'Batafsil' : 'Подробнее'}
                                        <ArrowRight size={20} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
