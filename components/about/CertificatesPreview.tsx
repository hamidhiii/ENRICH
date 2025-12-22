'use client';

import { useEffect, useState, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { certificatesAPI } from '@/lib/api';
import { FileText, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function CertificatesPreview() {
    const { ref, isVisible } = useScrollAnimation();
    const [certificates, setCertificates] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useLanguage();

    // Carousel state
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);

    // Lightbox state
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedCert, setSelectedCert] = useState<any>(null);

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const response = await certificatesAPI.getAll();
                const activeCerts = response.data.filter((item: any) => item.is_active);
                setCertificates(activeCerts);
            } catch (error) {
                console.error('Error fetching certificates:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCertificates();
    }, []);

    // Auto-scroll logic
    useEffect(() => {
        if (isPaused || certificates.length <= 3) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % certificates.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [isPaused, certificates.length]);

    const openLightbox = (cert: any) => {
        setSelectedCert(cert);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        setSelectedCert(null);
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % certificates.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
    };

    // Calculate visible items based on screen width (simplified)
    // In a real app, use a resize observer or media query hook.
    // For now, we'll assume desktop shows 3, tablet 2, mobile 1.
    // The CSS grid/flex will handle the layout, but the index logic needs to know.
    // Actually, let's just slide one item at a time, but show multiple.

    return (
        <section ref={ref} className="py-20 bg-white min-h-screen flex items-center relative">
            <div className="container mx-auto px-6">
                <h2 className={`text-5xl font-bold text-center mb-16 text-slate-600 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {t.about_page.certs_title}
                </h2>

                {isLoading ? (
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
                    </div>
                ) : certificates.length > 0 ? (
                    <div
                        className="relative"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        {/* Carousel Container */}
                        <div className="overflow-hidden py-10 px-4">
                            <div
                                className="flex transition-transform duration-500 ease-in-out gap-8"
                                style={{ transform: `translateX(-${currentIndex * (100 / (window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3))}%)` }}
                            >
                                {/* We duplicate certificates to create an infinite loop effect if needed, 
                                    but for simple auto-scroll with reset, just mapping is enough for now. 
                                    To make it truly seamless, we'd need more complex logic. 
                                    Let's stick to a simple slider first. 
                                */}
                                {certificates.map((cert: any, index: number) => (
                                    <div
                                        key={cert.id}
                                        className="min-w-full md:min-w-[calc(50%-1rem)] lg:min-w-[calc(33.333%-1.33rem)] flex-shrink-0"
                                    >
                                        <div
                                            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300 border-2 border-lime-500 flex flex-col items-center h-full cursor-pointer group relative"
                                            onClick={() => openLightbox(cert)}
                                        >
                                            <div className="absolute top-4 right-4 bg-lime-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                                <ZoomIn size={20} />
                                            </div>

                                            <div className="w-full h-64 mb-6 relative rounded-lg overflow-hidden bg-white flex items-center justify-center">
                                                {cert.image ? (
                                                    <img
                                                        src={cert.image.startsWith('http') ? cert.image : `http://localhost:8001${cert.image}`}
                                                        alt={cert.name_uz}
                                                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="text-7xl">🏆</div>
                                                )}
                                            </div>
                                            <h3 className="text-2xl font-bold text-slate-600 mb-2">
                                                {cert.name_uz}
                                            </h3>
                                            <p className="text-gray-500 mb-4">{cert.certificate_type}</p>
                                            {cert.pdf_file && (
                                                <a
                                                    href={cert.pdf_file.startsWith('http') ? cert.pdf_file : `http://localhost:8001${cert.pdf_file}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-auto inline-flex items-center gap-2 text-lime-600 font-medium hover:underline z-20"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <FileText size={18} />
                                                    {t.about_page.view_pdf}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-lime-600 p-3 rounded-full shadow-lg z-10 transition-all hover:scale-110"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-lime-600 p-3 rounded-full shadow-lg z-10 transition-all hover:scale-110"
                        >
                            <ChevronRight size={24} />
                        </button>

                        {/* Dots */}
                        <div className="flex justify-center gap-2 mt-6">
                            {certificates.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? 'bg-lime-500 w-6' : 'bg-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-500">
                        {t.about_page.no_certs}
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            {lightboxOpen && selectedCert && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm" onClick={closeLightbox}>
                    <button
                        className="absolute top-6 right-6 text-white hover:text-lime-400 transition-colors"
                        onClick={closeLightbox}
                    >
                        <X size={40} />
                    </button>
                    <div
                        className="max-w-4xl max-h-[90vh] w-full bg-white rounded-lg overflow-hidden relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="h-[80vh] flex items-center justify-center bg-gray-100">
                            {selectedCert.image ? (
                                <img
                                    src={selectedCert.image.startsWith('http') ? selectedCert.image : `http://localhost:8001${selectedCert.image}`}
                                    alt={selectedCert.name_uz}
                                    className="max-w-full max-h-full object-contain"
                                />
                            ) : (
                                <div className="text-9xl">🏆</div>
                            )}
                        </div>
                        <div className="p-6 bg-white flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-800">{selectedCert.name_uz}</h3>
                                <p className="text-gray-600">{selectedCert.certificate_type}</p>
                            </div>
                            {selectedCert.pdf_file && (
                                <a
                                    href={selectedCert.pdf_file.startsWith('http') ? selectedCert.pdf_file : `http://localhost:8001${selectedCert.pdf_file}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-lime-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-lime-600 transition-colors flex items-center gap-2"
                                >
                                    <FileText size={20} />
                                    PDF
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
