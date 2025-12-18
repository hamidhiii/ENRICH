'use client';

import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { contactAPI } from '@/lib/api';

export default function ContactFormSection() {
    const { ref, isVisible } = useScrollAnimation();
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await contactAPI.submit(formData);

            setSubmitStatus('success');
            setFormData({
                full_name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section ref={ref} className="py-20 bg-gray-100 min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className={`bg-white rounded-3xl p-12 shadow-lg transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <h2 className="text-4xl font-bold mb-8 text-slate-600">
                            Xabar yuboring
                        </h2>

                        {submitStatus === 'success' && (
                            <div className="mb-6 p-4 rounded-lg bg-green-100 text-green-800">
                                ✓ Xabaringiz muvaffaqiyatli yuborildi!
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="mb-6 p-4 rounded-lg bg-red-100 text-red-800">
                                ✗ Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-lg font-semibold mb-2 text-slate-600">
                                    To'liq ismingiz *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                    className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-lime-500 focus:outline-none text-lg"
                                    placeholder="Ismingizni kiriting"
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-semibold mb-2 text-slate-600">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-lime-500 focus:outline-none text-lg"
                                    placeholder="email@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-semibold mb-2 text-slate-600">
                                    Telefon
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-lime-500 focus:outline-none text-lg"
                                    placeholder="+998 XX XXX-XX-XX"
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-semibold mb-2 text-slate-600">
                                    Mavzu
                                </label>
                                <input
                                    type="text"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-lime-500 focus:outline-none text-lg"
                                    placeholder="Xabar mavzusi"
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-semibold mb-2 text-slate-600">
                                    Xabar *
                                </label>
                                <textarea
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    rows={6}
                                    className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-lime-500 focus:outline-none text-lg resize-none"
                                    placeholder="Xabaringizni yozing..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-5 rounded-lg font-bold text-xl text-white transition-all hover:opacity-90 disabled:opacity-50 bg-lime-500"
                            >
                                {isSubmitting ? 'Yuborilmoqda...' : 'Xabar yuborish'}
                            </button>
                        </form>
                    </div>

                    {/* Map & Address */}
                    <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        {/* Map */}
                        <div className="bg-white rounded-3xl overflow-hidden shadow-lg h-96">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.5989424733!2d69.2401!3d41.3111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzQwLjAiTiA2OcKwMTQnMjQuNCJF!5e0!3m2!1sen!2s!4v1234567890"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>

                        {/* Address Details */}
                        <div className="bg-white rounded-3xl p-12 shadow-lg">
                            <h3 className="text-3xl font-bold mb-6 text-slate-600">
                                Bizning manzil
                            </h3>
                            <div className="space-y-4">
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    <strong>Manzil:</strong><br />
                                    Toshkent, Olmazor tumani,<br />
                                    Noraztepa 5-tor ko'cha, 5 uy
                                </p>
                                <p className="text-gray-600 text-lg">
                                    <strong>Telefon:</strong> +998 98 305-25-35
                                </p>
                                <p className="text-gray-600 text-lg">
                                    <strong>Email:</strong> enrich@mail.com
                                </p>
                                <p className="text-gray-600 text-lg">
                                    <strong>Ish vaqti:</strong><br />
                                    Dushanba - Juma: 9:00 - 18:00<br />
                                    Shanba - Yakshanba: Dam olish
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
