'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    Layers,
    FileText,
    Award,
    Settings,
    LogOut,
    MessageSquare,
    Globe,
    X,
    History,
    Database
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();
    const { t } = useLanguage();

    const menuItems = [
        { icon: LayoutDashboard, label: t.admin.sidebar.dashboard, href: '/admin' },
        { icon: Package, label: t.admin.sidebar.products, href: '/admin/products' },
        { icon: Layers, label: t.admin.sidebar.categories, href: '/admin/categories' },
        { icon: FileText, label: t.admin.sidebar.news, href: '/admin/news' },
        { icon: Award, label: t.admin.sidebar.certificates, href: '/admin/certificates' },
        { icon: Globe, label: t.admin.sidebar.partners, href: '/admin/partners' },
        { icon: LayoutDashboard, label: t.admin.sidebar.content, href: '/admin/content' },
        { icon: MessageSquare, label: t.admin.sidebar.messages, href: '/admin/messages' },
        { icon: History, label: t.admin.sidebar.auditLog, href: '/admin/audit-logs' },
        { icon: Database, label: t.admin.sidebar.backup, href: '/admin/backup' },
        { icon: Settings, label: t.admin.sidebar.settings, href: '/admin/settings' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/admin/login';
    };

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
                    onClick={onClose}
                />
            )}

            <aside className={`fixed left-0 top-0 h-screen w-64 bg-slate-800 text-white flex flex-col z-50 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="p-6 border-b border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-lime-500 flex items-center justify-center text-white font-bold">
                            E
                        </div>
                        <span className="text-xl font-bold tracking-wide">ENRICH Admin</span>
                    </div>
                    <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar">
                    <ul className="space-y-1">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={() => {
                                            if (window.innerWidth < 1024) onClose();
                                        }}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                            ? 'bg-lime-500 text-white shadow-lg shadow-lime-500/20'
                                            : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                                            }`}
                                    >
                                        <item.icon size={20} />
                                        <span className="font-medium">{item.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="p-4 border-t border-slate-700">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">{t.admin.sidebar.logout}</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
