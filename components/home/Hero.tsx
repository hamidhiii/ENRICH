'use client';

import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const slides = [
    {
        id: 1,
        title: 'Sog\'lom hayot sari',
        subtitle: 'Tabiiy va samarali dori vositalari',
        description: 'Bizning mahsulotlarimiz sizning sog\'lig\'ingizni mustahkamlashga yordam beradi.',
        color: 'text-lime-500',
        imageColor: 'fill-lime-300 stroke-lime-600',
    },
    {
        id: 2,
        title: 'Yuqori sifat',
        subtitle: 'Xalqaro standartlarga mos',
        description: 'GMP standartlari asosida ishlab chiqarilgan xavfsiz mahsulotlar.',
        color: 'text-sky-500',
        imageColor: 'fill-sky-300 stroke-sky-600',
    },
    {
        id: 3,
        title: 'Innovatsion yechimlar',
        subtitle: 'Zamonaviy texnologiyalar',
        description: 'Eng so\'nggi texnologiyalar yordamida yaratilgan samarali formulalar.',
        color: 'text-amber-500',
        imageColor: 'fill-amber-300 stroke-amber-600',
    },
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { ref, isVisible } = useScrollAnimation();

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section ref={ref} className="relative bg-gradient-to-br from-gray-50 to-white min-h-[calc(100px)] flex items-center overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className={`z-10 transition-all duration-1000 transform pl-6 md:pl-24 text-center md:text-left order-2 md:order-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className={`text-xl md:text-2xl font-bold mb-2 ${slides[currentSlide].color}`}>
                            {slides[currentSlide].subtitle}
                        </h2>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-slate-800 leading-tight">
                            {slides[currentSlide].title}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-lg mx-auto md:mx-0">
                            {slides[currentSlide].description}
                        </p>
                        <button className="bg-lime-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-lime-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                            Batafsil ma'lumot
                        </button>
                    </div>

                    {/* Right Side - Medicine Bottle Icon */}
                    <div className={`flex justify-center items-center order-1 md:order-2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                        <div className="relative transition-all duration-500 transform scale-75 md:scale-100">
                            <svg width="400" height="400" viewBox="0 0 300 300" fill="none" className="drop-shadow-2xl">
                                {/* Medicine Bottle */}
                                <rect x="80" y="80" width="140" height="180" rx="20" className={`${slides[currentSlide].imageColor} transition-colors duration-500`} strokeWidth="4" />
                                <rect x="100" y="50" width="100" height="40" rx="10" className={`${slides[currentSlide].imageColor} transition-colors duration-500`} strokeWidth="4" />
                                <circle cx="150" cy="150" r="40" fill="white" />
                                <path d="M130 150 L150 170 L170 130" className={`stroke-current ${slides[currentSlide].color} transition-colors duration-500`} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                                {/* Cap lines */}
                                <line x1="110" y1="60" x2="190" y2="60" className="stroke-white opacity-50" strokeWidth="2" />
                                <line x1="110" y1="70" x2="190" y2="70" className="stroke-white opacity-50" strokeWidth="2" />

                                {/* Decorative Elements */}
                                <circle cx="250" cy="50" r="20" className={`fill-current ${slides[currentSlide].color} opacity-20`} />
                                <circle cx="50" cy="250" r="15" className={`fill-current ${slides[currentSlide].color} opacity-20`} />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-2 md:left-12 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all shadow-lg bg-white hover:bg-lime-500 text-lime-500 hover:text-white z-20 border-2 border-lime-500"
            >
                <FaChevronLeft size={20} className="md:w-6 md:h-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-2 md:right-12 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all shadow-lg bg-white hover:bg-lime-500 text-lime-500 hover:text-white z-20 border-2 border-lime-500"
            >
                <FaChevronRight size={20} className="md:w-6 md:h-6" />
            </button>

            {/* Dots Navigation */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-lime-500 w-8' : 'bg-gray-300 hover:bg-lime-300'
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
