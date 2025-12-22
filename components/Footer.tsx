'use client';

import { Twitter, Facebook, Youtube, Linkedin } from 'lucide-react';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
    const { ref, isVisible } = useScrollAnimation();
    const { t, language, setLanguage } = useLanguage();

    return (
        <footer ref={ref} className="bg-slate-700 text-white py-16">
            <div className={`container mx-auto px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="relative w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden">
                                <Image
                                    src="/images/logo.jpg"
                                    alt="Enrich Logo"
                                    fill
                                    className="object-contain p-1"
                                />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-amber-400">
                                    ENRICH
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed text-sm">
                            {t.footer.company_desc}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-6">{t.footer.pages}</h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="/"
                                    className="hover:opacity-80 transition-opacity text-base text-lime-500"
                                >
                                    {t.header.home}
                                </a>
                            </li>
                            <li>
                                <a href="/about" className="text-gray-300 hover:text-white transition-colors text-base">
                                    {t.header.about}
                                </a>
                            </li>
                            <li>
                                <a href="/products" className="text-gray-300 hover:text-white transition-colors text-base">
                                    {t.header.products}
                                </a>
                            </li>
                            <li>
                                <a href="/partners" className="text-gray-300 hover:text-white transition-colors text-base">
                                    {t.header.partners}
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="text-gray-300 hover:text-white transition-colors text-base">
                                    {t.header.contact}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-6">{t.footer.contact}</h3>
                        <div className="space-y-4">
                            <p className="text-gray-300 text-sm leading-relaxed">
                                {t.footer.address}
                            </p>
                            <p className="text-gray-300 text-sm">
                                E-mail: enrich@mail.com
                            </p>
                            <p className="text-gray-300 text-sm">
                                {t.footer.phone}: +998 98 305-25-35
                            </p>

                            {/* Social Media Icons */}
                            <div className="flex gap-3 pt-2">
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity bg-amber-400"
                                >
                                    <Twitter size={18} />
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity bg-amber-400"
                                >
                                    <Facebook size={18} />
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity bg-amber-400"
                                >
                                    <Youtube size={18} />
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity bg-amber-400"
                                >
                                    <Linkedin size={18} />
                                </a>
                            </div>

                            {/* Language Switcher */}
                            <div className="pt-4 flex gap-6">
                                <button
                                    onClick={() => setLanguage('uz')}
                                    className={`text-base font-medium transition-colors ${language === 'uz' ? 'text-lime-500' : 'text-gray-300 hover:text-white'}`}
                                >
                                    O'zbekcha
                                </button>
                                <button
                                    onClick={() => setLanguage('ru')}
                                    className={`text-base font-medium transition-colors ${language === 'ru' ? 'text-lime-500' : 'text-gray-300 hover:text-white'}`}
                                >
                                    Русская
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Border Line */}
                <div className="border-t border-gray-600 pt-6">
                    <p className="text-center text-gray-400 text-sm">
                        {t.footer.rights}
                    </p>
                </div>
            </div>
        </footer>
    );
}

