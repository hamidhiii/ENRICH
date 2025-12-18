'use client';

import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { certificatesAPI } from '@/lib/api';
import { FileText } from 'lucide-react';

export default function CertificatesPreview() {
    const { ref, isVisible } = useScrollAnimation();
    const [certificates, setCertificates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const response = await certificatesAPI.getAll();
                // Filter active certificates
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

    return (
        <section ref={ref} className="py-20 bg-white min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <h2 className={`text-5xl font-bold text-center mb-16 text-slate-600 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    Sertifikatlar
                </h2>

                {isLoading ? (
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
                    </div>
                ) : certificates.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {certificates.map((cert: any, index: number) => (
                            <div
                                key={cert.id}
                                className={`bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-1000 border-2 border-lime-500 flex flex-col items-center ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                                style={{ transitionDelay: `${index * 200}ms` }}
                            >
                                <div className="w-full h-64 mb-6 relative rounded-lg overflow-hidden bg-white flex items-center justify-center">
                                    {cert.image ? (
                                        <img
                                            src={cert.image.startsWith('http') ? cert.image : `http://localhost:8001${cert.image}`}
                                            alt={cert.name_uz}
                                            className="w-full h-full object-contain"
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
                                        className="mt-auto inline-flex items-center gap-2 text-lime-600 font-medium hover:underline"
                                    >
                                        <FileText size={18} />
                                        Ko'rish (PDF)
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500">
                        Hozircha sertifikatlar yo'q
                    </div>
                )}
            </div>
        </section>
    );
}
