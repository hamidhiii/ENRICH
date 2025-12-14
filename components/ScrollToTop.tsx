'use client';

import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Show button when page is scrolled down more than 80% of screen height
            if (window.pageYOffset > window.innerHeight * 0.8) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // Check on mount
        toggleVisibility();

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-50 p-4 rounded-full bg-lime-500 text-white shadow-lg hover:bg-lime-600 transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
            }`}
            aria-label="Scroll to top"
        >
            <FaArrowUp size={20} />
        </button>
    );
}