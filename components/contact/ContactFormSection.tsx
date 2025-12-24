'use client';

import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { contactAPI } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactFormSection() {
    const { ref, isVisible } = useScrollAnimation();
    const { t } = useLanguage();
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
        } catch {
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
                            {t.contact.form_title}
                        </h2>

                        {submitStatus === 'success' && (
                            <div className="mb-6 p-4 rounded-lg bg-green-100 text-green-800">
                                {t.contact.success}
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="mb-6 p-4 rounded-lg bg-red-100 text-red-800">
                                {t.contact.error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-lg font-semibold mb-2 text-slate-600">
                                    {t.contact.name}
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                    className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-lime-500 focus:outline-none text-lg"
                                    placeholder={t.contact.name_placeholder}
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-semibold mb-2 text-slate-600">
                                    {t.contact.email_label}
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-lime-500 focus:outline-none text-lg"
                                    placeholder={t.contact.email_placeholder}
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-semibold mb-2 text-slate-600">
                                    {t.contact.phone_label}
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-lime-500 focus:outline-none text-lg"
                                    placeholder={t.contact.phone_placeholder}
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-semibold mb-2 text-slate-600">
                                    {t.contact.subject}
                                </label>
                                <input
                                    type="text"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-lime-500 focus:outline-none text-lg"
                                    placeholder={t.contact.subject_placeholder}
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-semibold mb-2 text-slate-600">
                                    {t.contact.message}
                                </label>
                                <textarea
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    rows={6}
                                    className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-lime-500 focus:outline-none text-lg resize-none"
                                    placeholder={t.contact.message_placeholder}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-5 rounded-lg font-bold text-xl text-white transition-all hover:opacity-90 disabled:opacity-50 bg-lime-500"
                            >
                                {isSubmitting ? t.contact.submitting : t.contact.submit}
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
                                {t.contact.our_address}
                            </h3>
                            <div className="space-y-4">
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    <strong>{t.contact.address}:</strong><br />
                                    {t.contact.full_address}
                                </p>
                                <p className="text-gray-600 text-lg">
                                    <strong>{t.contact.phone_label}:</strong> +998 98 305-25-35
                                </p>
                                <p className="text-gray-600 text-lg">
                                    <strong>{t.contact.email_label}:</strong> enrich@mail.com
                                </p>
                                <p className="text-gray-600 text-lg">
                                    <strong>{t.contact.hours}:</strong><br />
                                    <span className="whitespace-pre-line">{t.contact.full_hours}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
