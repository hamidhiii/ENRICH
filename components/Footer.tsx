'use client';

import { FaTwitter, FaFacebook, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Footer() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <footer ref={ref} className="bg-slate-700 text-white py-16">
            <div className={`container mx-auto px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                                <span className="text-white text-2xl font-bold">E</span>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-amber-400">
                                    ENRICH
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed text-sm">
                            Biz sizga yuqori terapevtik ta'sirga ega
                            tabiiy va sintetik dori vositalari yordamida
                            sifatli tibbiy xizmat ko'rsatishga
                            tayyormiz
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-6">Sahifalar</h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="/"
                                    className="hover:opacity-80 transition-opacity text-base text-lime-500"
                                >
                                    Bosh sahifa
                                </a>
                            </li>
                            <li>
                                <a href="/about" className="text-gray-300 hover:text-white transition-colors text-base">
                                    Biz haqimizda
                                </a>
                            </li>
                            <li>
                                <a href="/products" className="text-gray-300 hover:text-white transition-colors text-base">
                                    Mahsulotlar
                                </a>
                            </li>
                            <li>
                                <a href="/partners" className="text-gray-300 hover:text-white transition-colors text-base">
                                    Hamkorlar
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="text-gray-300 hover:text-white transition-colors text-base">
                                    Aloqa
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-6">Aloqa uchun</h3>
                        <div className="space-y-4">
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Toshkent, Olmazor tumani, Noraztepa 5-tor ko'cha, 5 uy
                            </p>
                            <p className="text-gray-300 text-sm">
                                E-mail: enrich@mail.com
                            </p>
                            <p className="text-gray-300 text-sm">
                                Telefon: +998 98 305-25-35
                            </p>

                            {/* Social Media Icons */}
                            <div className="flex gap-3 pt-2">
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity bg-amber-400"
                                >
                                    <FaTwitter size={18} />
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity bg-amber-400"
                                >
                                    <FaFacebook size={18} />
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity bg-amber-400"
                                >
                                    <FaYoutube size={18} />
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity bg-amber-400"
                                >
                                    <FaLinkedin size={18} />
                                </a>
                            </div>

                            {/* Language Switcher */}
                            <div className="pt-4">
                                <a
                                    href="#"
                                    className="hover:opacity-80 mr-6 text-base font-medium text-lime-500"
                                >
                                    O'zbekcha
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-white text-base font-medium"
                                >
                                    Русская
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Border Line */}
                <div className="border-t border-gray-600 pt-6">
                    <p className="text-center text-gray-400 text-sm">
                        &copy; 2024 ENRICH. Barcha huquqlar himoyalangan.
                    </p>
                </div>
            </div>
        </footer>
    );
}
