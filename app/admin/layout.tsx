'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';
import TopNavbar from '@/components/admin/TopNavbar';
import LanguageSwitcher from '@/components/admin/LanguageSwitcher';
import { Menu } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from '@/context/LanguageContext';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const isLoginPage = pathname === '/admin/login';

        if (!token && !isLoginPage) {
            router.push('/admin/login');
        } else if (token && isLoginPage) {
            router.push('/admin');
        }
    }, [pathname, router]);

    if (pathname === '/admin/login') {
        return <LanguageProvider>{children}</LanguageProvider>;
    }

    return (
        <LanguageProvider>
            <div className="min-h-screen bg-gray-50 flex">
                <Toaster position="top-right" />
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
                    {/* Mobile Header */}
                    <header className="lg:hidden bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-30">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="p-2 text-slate-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <Menu size={24} />
                            </button>
                            <span className="font-bold text-slate-800">ENRICH</span>
                        </div>
                        <LanguageSwitcher />
                    </header>

                    <TopNavbar />

                    <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </LanguageProvider>
    );
}
