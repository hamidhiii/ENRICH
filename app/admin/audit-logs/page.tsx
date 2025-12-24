'use client';

import { useState, useEffect } from 'react';
import { Search, Clock } from 'lucide-react';
import { auditLogsAPI, AuditLog } from '@/lib/api';
import { format } from 'date-fns';

export default function AuditLogsPage() {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [params, setParams] = useState({ limit: 50, offset: 0, entity_type: '' });

    useEffect(() => {
        const fetchLogs = async () => {
            setIsLoading(true);
            try {
                const res = await auditLogsAPI.getAll(params);
                setLogs(res.data.items);
            } catch (error) {
                console.error('Error fetching audit logs:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLogs();
    }, [params]);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Audit Log</h1>
                <p className="text-gray-500 mt-1">Admin o&apos;zgarishlari tarixi</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Qidirish..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 outline-none transition-all"
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <select
                            value={params.entity_type}
                            onChange={(e) => setParams({ ...params, entity_type: e.target.value, offset: 0 })}
                            className="px-4 py-2 rounded-lg border border-gray-200 focus:border-lime-500 outline-none transition-all"
                        >
                            <option value="">Barcha turlar</option>
                            <option value="product">Mahsulotlar</option>
                            <option value="category">Kategoriyalar</option>
                            <option value="news">Yangiliklar</option>
                            <option value="user">Foydalanuvchilar</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-sm uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">Vaqt</th>
                                <th className="px-6 py-4">Admin</th>
                                <th className="px-6 py-4">Harakat</th>
                                <th className="px-6 py-4">O&apos;zgarish</th>
                                <th className="px-6 py-4">IP Manzil</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Yuklanmoqda...</td>
                                </tr>
                            ) : logs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Ma&apos;lumot topilmadi</td>
                                </tr>
                            ) : (
                                logs.map((log) => (
                                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Clock size={14} />
                                                {format(new Date(log.created_at), 'dd.MM.yyyy HH:mm')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-lime-100 text-lime-600 flex items-center justify-center font-bold text-xs">
                                                    {log.user?.username?.charAt(0).toUpperCase() || 'A'}
                                                </div>
                                                <span className="text-sm font-medium text-slate-700">{log.user?.username || 'Admin'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${log.action === 'create' ? 'bg-green-100 text-green-600' :
                                                log.action === 'update' ? 'bg-blue-100 text-blue-600' :
                                                    'bg-red-100 text-red-600'
                                                }`}>
                                                {log.action}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600 max-w-xs truncate">
                                                {log.entity_type}: {log.entity_id}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                            {log.ip_address || '0.0.0.0'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
