'use client';

import { Bell, Search, User } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function TopNavbar() {
    return (
        <header className="hidden lg:flex h-16 bg-white border-b border-gray-100 items-center justify-between px-8 sticky top-0 z-20">
            <div className="flex items-center gap-4 flex-1">
                <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Qidirish..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-lime-500/20 outline-none transition-all text-sm"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <LanguageSwitcher />

                <button className="relative p-2 text-gray-400 hover:text-lime-600 hover:bg-lime-50 rounded-xl transition-all">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-px bg-gray-100 mx-2"></div>

                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right">
                        <p className="text-sm font-bold text-slate-800">Administrator</p>
                        <p className="text-xs text-gray-400">admin@enrich.uz</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-lime-100 text-lime-600 flex items-center justify-center font-bold shadow-sm">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
}
