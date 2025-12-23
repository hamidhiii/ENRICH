'use client';

import { useEffect, useState } from 'react';
import {
    Package,
    FileText,
    MessageSquare,
    Users,
    TrendingUp,
    ArrowUpRight,
    Clock,
    Settings,
    Database
} from 'lucide-react';
import { productsAPI, newsAPI, contactAPI, ContactMessage, statsAPI } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';

export default function AdminDashboard() {
    const { t } = useLanguage();
    const [stats, setStats] = useState({
        products: 0,
        news: 0,
        messages: 0,
        users: 0,
        categories: 0,
        certificates: 0,
        partners: 0
    });
    const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsRes, messagesRes] = await Promise.all([
                    statsAPI.get(),
                    contactAPI.getAll({ limit: 5 })
                ]);

                setStats(statsRes.data);
                setRecentMessages(messagesRes.data.items || messagesRes.data);

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (isLoading) {
        return <div>Loading dashboard...</div>;
    }

    const statCards = [
        { label: t.admin.dashboard.products, value: stats.products, icon: Package, color: 'bg-blue-500', subtext: t.admin.dashboard.productsDesc },
        { label: t.admin.dashboard.categories, value: stats.categories, icon: ArrowUpRight, color: 'bg-indigo-500', subtext: t.admin.dashboard.categoriesDesc },
        { label: t.admin.dashboard.news, value: stats.news, icon: FileText, color: 'bg-green-500', subtext: t.admin.dashboard.newsDesc },
        { label: t.admin.dashboard.messages, value: stats.messages, icon: MessageSquare, color: 'bg-amber-500', subtext: t.admin.dashboard.messagesDesc },
        { label: t.admin.dashboard.partners, value: stats.partners, icon: Users, color: 'bg-purple-500', subtext: t.admin.dashboard.partnersDesc },
        { label: t.admin.dashboard.certificates, value: stats.certificates, icon: ArrowUpRight, color: 'bg-rose-500', subtext: t.admin.dashboard.certificatesDesc },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">{t.admin.dashboard.title}</h1>
                    <p className="text-gray-500 mt-1">{t.admin.dashboard.subtitle}</p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-sm font-medium text-gray-400">{t.admin.dashboard.lastUpdate}</p>
                    <p className="text-sm font-bold text-slate-600">{new Date().toLocaleString('uz-UZ')}</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 group-hover:text-lime-600 transition-colors">{stat.label}</p>
                                <h3 className="text-3xl font-bold text-slate-800 mt-1">{stat.value}</h3>
                            </div>
                            <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                <stat.icon size={24} />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-xs text-gray-400">
                            <span className="font-medium">{stat.subtext}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-slate-800">Oxirgi xabarlar</h2>
                        <button
                            onClick={() => window.location.href = '/admin/messages'}
                            className="text-lime-500 text-sm font-medium hover:text-lime-600 flex items-center transition-colors"
                        >
                            Hammasini ko'rish <ArrowUpRight size={16} className="ml-1" />
                        </button>
                    </div>
                    <div className="divide-y divide-gray-100 flex-1">
                        {recentMessages.length > 0 ? (
                            recentMessages.map((msg) => (
                                <div key={msg.id} className="p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-lime-100 text-lime-600 flex items-center justify-center font-bold">
                                            {msg.full_name.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold text-slate-800">{msg.full_name}</h4>
                                            <p className="text-sm text-gray-600 truncate max-w-[250px]">{msg.subject || 'Mavzusiz xabar'}</p>
                                            <div className="flex items-center mt-1 text-xs text-gray-400">
                                                <Clock size={12} className="mr-1" />
                                                {new Date(msg.created_at).toLocaleDateString('uz-UZ')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center">
                                <MessageSquare size={48} className="mx-auto text-gray-200 mb-4" />
                                <p className="text-gray-400">{t.admin.dashboard.noMessages}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-slate-800 mb-6 font-bold">{t.admin.dashboard.quickActions}</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => window.location.href = '/admin/products/new'}
                            className="p-4 rounded-lg border border-gray-200 hover:border-lime-500 hover:bg-lime-50 transition-all text-left group"
                        >
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <Package size={20} />
                            </div>
                            <h3 className="font-bold text-slate-700">{t.admin.dashboard.addProduct}</h3>
                            <p className="text-xs text-gray-500 mt-1">{t.admin.dashboard.addProductDesc}</p>
                        </button>
                        <button
                            onClick={() => window.location.href = '/admin/news/new'}
                            className="p-4 rounded-lg border border-gray-200 hover:border-lime-500 hover:bg-lime-50 transition-all text-left group"
                        >
                            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-3 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                <FileText size={20} />
                            </div>
                            <h3 className="font-bold text-slate-700">{t.admin.dashboard.postNews}</h3>
                            <p className="text-xs text-gray-500 mt-1">{t.admin.dashboard.postNewsDesc}</p>
                        </button>
                        <button
                            onClick={() => window.location.href = '/admin/settings'}
                            className="p-4 rounded-lg border border-gray-200 hover:border-lime-500 hover:bg-lime-50 transition-all text-left group"
                        >
                            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-3 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                <Settings size={20} />
                            </div>
                            <h3 className="font-bold text-slate-700">{t.admin.dashboard.settings}</h3>
                            <p className="text-xs text-gray-500 mt-1">{t.admin.dashboard.settingsDesc}</p>
                        </button>
                        <button
                            onClick={() => window.location.href = '/admin/backup'}
                            className="p-4 rounded-lg border border-gray-200 hover:border-lime-500 hover:bg-lime-50 transition-all text-left group"
                        >
                            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-3 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                <Database size={20} />
                            </div>
                            <h3 className="font-bold text-slate-700">{t.admin.dashboard.backup}</h3>
                            <p className="text-xs text-gray-500 mt-1">{t.admin.dashboard.backupDesc}</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
