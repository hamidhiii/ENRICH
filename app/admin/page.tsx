'use client';

import { useEffect, useState } from 'react';
import {
    Package,
    FileText,
    MessageSquare,
    Users,
    TrendingUp,
    ArrowUpRight,
    Clock
} from 'lucide-react';
import { productsAPI, newsAPI, contactAPI } from '@/lib/api';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        products: 0,
        news: 0,
        messages: 0,
        users: 0
    });
    const [recentMessages, setRecentMessages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // In a real app, we might have a dedicated stats endpoint
                // For now, we'll fetch counts individually or mock them
                // const productsRes = await productsAPI.getAll({ limit: 1 });
                // const newsRes = await newsAPI.getAll({ limit: 1 });
                // const messagesRes = await contactAPI.getAll({ limit: 5 });

                // Mock data for now until endpoints are fully ready
                setStats({
                    products: 12,
                    news: 5,
                    messages: 8,
                    users: 3
                });

                setRecentMessages([
                    { id: 1, full_name: 'John Doe', subject: 'Product Inquiry', created_at: '2023-10-25T10:30:00' },
                    { id: 2, full_name: 'Jane Smith', subject: 'Partnership Proposal', created_at: '2023-10-24T14:15:00' },
                    { id: 3, full_name: 'Mike Johnson', subject: 'Job Application', created_at: '2023-10-23T09:45:00' },
                ]);

            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (isLoading) {
        return <div>Loading dashboard...</div>;
    }

    const statCards = [
        { label: 'Total Products', value: stats.products, icon: Package, color: 'bg-blue-500' },
        { label: 'News Articles', value: stats.news, icon: FileText, color: 'bg-green-500' },
        { label: 'New Messages', value: stats.messages, icon: MessageSquare, color: 'bg-amber-500' },
        { label: 'Active Users', value: stats.users, icon: Users, color: 'bg-purple-500' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
                <p className="text-gray-500 mt-1">Welcome back to ENRICH Admin Panel</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-transform hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                <h3 className="text-3xl font-bold text-slate-800 mt-1">{stat.value}</h3>
                            </div>
                            <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                                <stat.icon size={24} />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm text-green-600">
                            <TrendingUp size={16} className="mr-1" />
                            <span className="font-medium">+12%</span>
                            <span className="text-gray-400 ml-1">from last month</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-slate-800">Recent Messages</h2>
                        <button className="text-lime-500 text-sm font-medium hover:text-lime-600 flex items-center">
                            View All <ArrowUpRight size={16} className="ml-1" />
                        </button>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {recentMessages.map((msg) => (
                            <div key={msg.id} className="p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                                        {msg.full_name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-slate-800">{msg.full_name}</h4>
                                        <p className="text-sm text-gray-600">{msg.subject}</p>
                                        <div className="flex items-center mt-1 text-xs text-gray-400">
                                            <Clock size={12} className="mr-1" />
                                            {new Date(msg.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-slate-800 mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 rounded-lg border border-gray-200 hover:border-lime-500 hover:bg-lime-50 transition-all text-left group">
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <Package size={20} />
                            </div>
                            <h3 className="font-bold text-slate-700">Add Product</h3>
                            <p className="text-xs text-gray-500 mt-1">Create a new product listing</p>
                        </button>
                        <button className="p-4 rounded-lg border border-gray-200 hover:border-lime-500 hover:bg-lime-50 transition-all text-left group">
                            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-3 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                <FileText size={20} />
                            </div>
                            <h3 className="font-bold text-slate-700">Post News</h3>
                            <p className="text-xs text-gray-500 mt-1">Publish a new article</p>
                        </button>
                        <button className="p-4 rounded-lg border border-gray-200 hover:border-lime-500 hover:bg-lime-50 transition-all text-left group">
                            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-3 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                <Users size={20} />
                            </div>
                            <h3 className="font-bold text-slate-700">Add User</h3>
                            <p className="text-xs text-gray-500 mt-1">Create a new admin user</p>
                        </button>
                        <button className="p-4 rounded-lg border border-gray-200 hover:border-lime-500 hover:bg-lime-50 transition-all text-left group">
                            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-3 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                <MessageSquare size={20} />
                            </div>
                            <h3 className="font-bold text-slate-700">Check Messages</h3>
                            <p className="text-xs text-gray-500 mt-1">View unread contact messages</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
