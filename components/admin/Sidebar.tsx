'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    Layers,
    FileText,
    Award,
    Briefcase,
    Users,
    Settings,
    LogOut,
    MessageSquare,
    Image,
    Globe
} from 'lucide-react';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Package, label: 'Mahsulotlar', href: '/admin/products' },
    { icon: Layers, label: 'Kategoriyalar', href: '/admin/categories' },
    { icon: FileText, label: 'Yangiliklar', href: '/admin/news' },
    { icon: Award, label: 'Sertifikatlar', href: '/admin/certificates' },
    { icon: Briefcase, label: 'Vakansiyalar', href: '/admin/careers' },
    { icon: Globe, label: 'Hamkorlar', href: '/admin/partners' },
    { icon: MessageSquare, label: 'Xabarlar', href: '/admin/messages' },
    { icon: Image, label: 'Media', href: '/admin/media' },
    { icon: Users, label: 'Foydalanuvchilar', href: '/admin/users' },
    { icon: Settings, label: 'Sozlamalar', href: '/admin/settings' },
];

export default function Sidebar() {
    const pathname = usePathname();

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/admin/login';
    };

    return (
        <aside className="w-64 bg-slate-800 text-white h-screen flex flex-col fixed left-0 top-0 z-50">
            <div className="p-6 border-b border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-lime-500 flex items-center justify-center text-white font-bold">
                        E
                    </div>
                    <span className="text-xl font-bold tracking-wide">ENRICH Admin</span>
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-3">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-lime-500 text-white'
                                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
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
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Chiqish</span>
                </button>
            </div>
        </aside>
    );
}
