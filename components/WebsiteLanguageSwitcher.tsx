'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function WebsiteLanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-2">
            <div className="flex bg-gray-50 p-1 rounded-full border border-gray-100 shadow-inner">
                <button
                    onClick={() => setLanguage('uz')}
                    className={`relative px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${language === 'uz'
                        ? 'bg-lime-500 text-white shadow-md'
                        : 'text-gray-400 hover:text-gray-600'
                        }`}
                >
                    UZ
                </button>
                <button
                    onClick={() => setLanguage('ru')}
                    className={`relative px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${language === 'ru'
                        ? 'bg-lime-500 text-white shadow-md'
                        : 'text-gray-400 hover:text-gray-600'
                        }`}
                >
                    RU
                </button>
            </div>
        </div>
    );
}
