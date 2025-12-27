import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/context/LanguageContext';
import { contentAPI, PageSection, getImageUrl } from '@/lib/api';

export default function Testimonials() {
    const { ref, isVisible } = useScrollAnimation();
    const { t, language } = useLanguage();
    const [testimonials, setTestimonials] = useState<PageSection[]>([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await contentAPI.getSections({ page_path: 'home' });
                const sections = response.data as PageSection[];
                const items = sections.filter((s: PageSection) => s.section_key === 'testimonial');
                if (items.length > 0) {
                    setTestimonials(items);
                }
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            }
        };
        fetchTestimonials();
    }, []);

    const getField = (item: PageSection, field: string) => {
        const key = `${field}_${language}` as keyof PageSection;
        return (item[key] as string) || (item[`${field}_uz` as keyof PageSection] as string) || '';
    };

    return (
        <section ref={ref} className="py-20 bg-gray-100 min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <h2 className={`text-3xl md:text-5xl font-bold text-center mb-10 md:mb-16 text-slate-600 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {t.testimonials.title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {(testimonials.length > 0 ? testimonials : [1, 2]).map((item, index) => (
                        <div
                            key={typeof item === 'object' ? item.id : item}
                            className={`bg-white rounded-2xl p-8 shadow-md transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                            style={{ transitionDelay: `${index * 300}ms` }}
                        >
                            <p className="text-gray-600 mb-8 italic text-lg leading-relaxed">
                                {typeof item === 'object' ? getField(item, 'content') : (language === 'uz' ? "Mijozlarimiz biz haqimizda" : "Отзывы наших клиентов")}
                            </p>
                            <div className="flex items-center gap-6 relative">
                                {/* Client Photo */}
                                <div className="w-20 h-20 rounded-full bg-gray-300 overflow-hidden flex-shrink-0 relative">
                                    {typeof item === 'object' && item.image ? (
                                        <Image
                                            src={getImageUrl(item.image)}
                                            alt="Client"
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-500"></div>
                                    )}
                                </div>

                                {/* Client Info */}
                                <div className="flex-1">
                                    <h4 className="font-bold text-xl mb-1 text-slate-600">
                                        {typeof item === 'object' ? getField(item, 'title') : 'Client Name'}
                                    </h4>
                                    <p className="text-gray-500 text-sm mb-2">
                                        {typeof item === 'object' ? getField(item, 'subtitle') : 'Profession'}
                                    </p>
                                    <div className="flex gap-1 text-lime-500">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} size={20} fill="currentColor" />
                                        ))}
                                    </div>
                                </div>

                                {/* Large Quote Mark */}
                                <div className="absolute -right-4 -top-4 text-orange-400 opacity-20">
                                    <Quote size={80} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
