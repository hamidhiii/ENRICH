'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-1 bg-gray-100/80 p-1 rounded-xl border border-gray-200/50">
            <button
                onClick={() => setLanguage('uz')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${language === 'uz'
                    ? 'bg-white text-lime-600 shadow-sm ring-1 ring-black/5'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                    }`}
            >
                UZ
            </button>
            <button
                onClick={() => setLanguage('ru')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${language === 'ru'
                    ? 'bg-white text-lime-600 shadow-sm ring-1 ring-black/5'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                    }`}
            >
                RU
            </button>
        </div>
    );
}
