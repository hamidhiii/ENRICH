'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t } = useLanguage();

    const isActive = (path: string) => pathname === path;

    const navLinks = [
        { href: '/', label: t.header.home },
        { href: '/about', label: t.header.about },
        { href: '/products', label: t.header.products },
        { href: '/partners', label: t.header.partners },
        { href: '/contact', label: t.header.contact },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            {/* Top Bar - Green with Rounded Corners */}
            <div className="bg-white py-2 hidden md:block relative z-50">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="bg-lime-500 text-white py-2 px-6 rounded-full flex justify-between items-center shadow-sm">
                        <div className="flex items-center gap-2 text-sm">
                            <span>📍</span>
                            <span>{t.header.address}</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-sm">
                                <span>📞</span>
                                <span>+998 98 305-25-35</span>
                            </div>
                            <div className="flex gap-3">
                                <a href="#" className="hover:opacity-80 transition-opacity">
                                    <FaFacebook size={16} />
                                </a>
                                <a href="#" className="hover:opacity-80 transition-opacity">
                                    <FaInstagram size={16} />
                                </a>
                                <a href="#" className="hover:opacity-80 transition-opacity">
                                    <FaYoutube size={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation - Sticky */}
            <nav className="sticky top-0 bg-white shadow-md py-4 md:py-6 border-b z-50">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 md:gap-3 z-50 relative">
                        <div className="relative w-auto h-auto md:w-40 md:h-16">
                            <Image
                                src="/images/logo.jpg"
                                alt="Enrich Logo"
                                width={160}
                                height={64}
                                className="object-contain"
                                priority
                            />
                        </div>

                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex md:gap-4 lg:gap-8 items-center">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`font-medium text-base transition-colors ${isActive(link.href)
                                        ? 'text-lime-500'
                                        : 'text-gray-400 hover:text-lime-500'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-700 focus:outline-none z-50 relative"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>

                    {/* Mobile Navigation Overlay */}
                    <div
                        className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                            }`}
                    >
                        <ul className="flex flex-col gap-8 items-center text-center">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`font-bold text-2xl transition-colors ${isActive(link.href)
                                            ? 'text-lime-500'
                                            : 'text-gray-800 hover:text-lime-500'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
