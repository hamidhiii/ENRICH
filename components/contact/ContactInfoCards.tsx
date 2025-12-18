'use client';

import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function ContactInfoCards() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section ref={ref} className="py-20 bg-white min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {[
                        {
                            icon: <Phone size={48} />,
                            title: 'Telefon',
                            content: '+998 98 305-25-35',
                            color: 'text-lime-500',
                        },
                        {
                            icon: <Mail size={48} />,
                            title: 'Email',
                            content: 'enrich@mail.com',
                            color: 'text-orange-400',
                        },
                        {
                            icon: <MapPin size={48} />,
                            title: 'Manzil',
                            content: 'Toshkent, Olmazor tumani',
                            color: 'text-lime-500',
                        },
                        {
                            icon: <Clock size={48} />,
                            title: 'Ish vaqti',
                            content: 'Dush-Juma: 9:00-18:00',
                            color: 'text-orange-400',
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className={`text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-md hover:shadow-xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                            style={{ transitionDelay: `${index * 200}ms` }}
                        >
                            <div className={`mb-6 flex justify-center ${item.color} transition-transform duration-500 hover:scale-110`}>
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-slate-600">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-lg">
                                {item.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
