'use client';

import React from 'react';
import { FaHandshake, FaGlobe, FaBuilding, FaAward } from 'react-icons/fa';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function PartnersPage() {
    const headerAnim = useScrollAnimation();
    const gridAnim = useScrollAnimation();
    const ctaAnim = useScrollAnimation();

    const partners = [
        { id: 1, name: 'Grand Pharm', type: 'Distributor', icon: <FaBuilding size={40} /> },
        { id: 2, name: 'Best Medical', type: 'Pharmacy Chain', icon: <FaGlobe size={40} /> },
        { id: 3, name: 'OxyMed', type: 'Strategic Partner', icon: <FaHandshake size={40} /> },
        { id: 4, name: 'Dori-Darmon', type: 'State Partner', icon: <FaAward size={40} /> },
        { id: 5, name: 'Askklepiy', type: 'Distributor', icon: <FaBuilding size={40} /> },
        { id: 6, name: 'Meros Pharm', type: 'Pharmacy Chain', icon: <FaGlobe size={40} /> },
        { id: 7, name: 'Nika Pharm', type: 'Manufacturer', icon: <FaHandshake size={40} /> },
        { id: 8, name: 'Jurabek', type: 'Manufacturer', icon: <FaAward size={40} /> },
    ];

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
                <div ref={gridAnim.ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20">
                    {partners.map((partner, index) => (
                        <div
                            key={partner.id}
                            className={`bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-700 flex flex-col items-center text-center group border border-gray-100 ${gridAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="w-20 h-20 bg-lime-50 rounded-full flex items-center justify-center text-lime-500 mb-4 group-hover:bg-lime-500 group-hover:text-white transition-colors duration-300">
                                {partner.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-700 mb-2">{partner.name}</h3>
                            <p className="text-gray-500 text-sm">{partner.type}</p>
                        </div>
                    ))}
                </div>

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
