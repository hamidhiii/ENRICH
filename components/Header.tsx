'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path: string) => pathname === path;

    const navLinks = [
        { href: '/', label: 'Bosh sahifa' },
        { href: '/about', label: 'Biz haqimizda' },
        { href: '/products', label: 'Mahsulotlar' },
        { href: '/partners', label: 'Hamkorlar' },
        { href: '/contact', label: 'Aloqa' },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            {/* Top Bar - Green with Rounded Corners */}
            <div className="bg-white py-2 hidden md:block relative z-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="bg-lime-500 text-white py-2 px-6 rounded-full flex justify-between items-center shadow-sm">
                        <div className="flex items-center gap-2 text-sm">
                            <span>📍</span>
                            <span>Toshkent, Olmazor tumani, Noraztepa 5-tor ko'cha, 5 uy</span>
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
                <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 md:gap-3 z-50 relative">
                        {/* Replaced generic E with a placeholder for the gold logo from image if possible, 
                            or just styled text to match better. 
                            The image shows a gold logo. I'll use the existing structure but adjust colors. */}
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-amber-400 flex items-center justify-center bg-white">
                            {/* Using a leaf icon or similar to mimic the image logo */}
                            <span className="text-amber-400 text-xl">🌿</span>
                        </div>
                        <div>
                            <div className="text-2xl md:text-3xl font-bold text-amber-400 tracking-wide">
                                ENRICH
                            </div>
                            <div className="text-[10px] md:text-[10px] text-amber-300 uppercase tracking-[0.2em] -mt-1">LIVE HEALTHY</div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex gap-8 items-center">
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
