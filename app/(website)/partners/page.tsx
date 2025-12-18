'use client';

import React, { useEffect, useState } from 'react';
import { Handshake, Globe, Building2, Award } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { partnersAPI } from '@/lib/api';

export default function PartnersPage() {
    const headerAnim = useScrollAnimation();
    const gridAnim = useScrollAnimation();
    const ctaAnim = useScrollAnimation();
    const [partners, setPartners] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const response = await partnersAPI.getAll();
                // Filter approved partners
                const approvedPartners = response.data.filter((item: any) => item.status === 'approved');
                setPartners(approvedPartners);
            } catch (error) {
                console.error('Error fetching partners:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPartners();
    }, []);

    // Helper to get random icon for partner if no logo (since we didn't implement logo upload for partners yet, or maybe we did? Schema has no logo field, just company_name etc. Wait, schema has no image field for Partner!
    // Let me check schema again.
    // PartnerBase: company_name, contact_person, email, phone, country, city, address, message.
    // No image/logo field.
    // So I'll stick to icons for now, maybe random or based on some logic.
    const getIcon = (index: number) => {
        const icons = [<Building2 size={40} />, <Globe size={40} />, <Handshake size={40} />, <Award size={40} />];
        return icons[index % icons.length];
    };

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50">
            {/* Header Section */}
            <div ref={headerAnim.ref} className={`bg-lime-500 py-16 mb-12 transition-all duration-1000 ${headerAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Bizning Hamkorlar
                    </h1>
                    <p className="text-lime-100 text-lg max-w-2xl mx-auto">
                        Biz ishonchli va yetakchi kompaniyalar bilan hamkorlik qilamiz,
                        bu esa bizga eng yaxshi sifatni ta'minlashga yordam beradi.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6">
                {/* Partners Grid */}
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
                    </div>
                ) : partners.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20">
                        {partners.map((partner: any, index: number) => (
                            <div
                                key={partner.id}
                                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-700 flex flex-col items-center text-center group border border-gray-100"
                            >
                                <div className="w-20 h-20 bg-lime-50 rounded-full flex items-center justify-center text-lime-500 mb-4 group-hover:bg-lime-500 group-hover:text-white transition-colors duration-300">
                                    {getIcon(index)}
                                </div>
                                <h3 className="text-xl font-bold text-slate-700 mb-2">{partner.company_name}</h3>
                                <p className="text-gray-500 text-sm">{partner.city || partner.country || 'Partner'}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-500 mb-20">
                        Hozircha hamkorlar yo'q
                    </div>
                )}

                {/* Become a Partner Section */}
                <div ref={ctaAnim.ref} className={`bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-lime-100 text-center max-w-4xl mx-auto transition-all duration-1000 ${ctaAnim.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <h2 className="text-3xl font-bold text-slate-700 mb-4">
                        Hamkorlik qilishni xohlaysizmi?
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Agar siz biz bilan hamkorlik qilishni istasangiz, biz bilan bog'laning.
                        Biz har doim yangi imkoniyatlar va hamkorlikka ochiqmiz.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block bg-lime-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-lime-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        Bog'lanish
                    </a>
                </div>
            </div>
        </div>
    );
}
