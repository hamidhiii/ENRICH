'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import './PhoneInput.css';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { contactAPI } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';

const contactSchema = z.object({
    full_name: z.string().min(2, { message: 'Ism kamida 2 ta belgidan iborat bo\'lishi kerak' }),
    email: z.string().email({ message: 'Noto\'g\'ri email formati' }),
    phone: z.string().min(9, { message: 'Telefon raqami noto\'g\'ri yoki to\'liq emas' }),
    subject: z.string().optional(),
    message: z.string().min(10, { message: 'Xabar kamida 10 ta belgidan iborat bo\'lishi kerak' }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactFormSection() {
    const { ref, isVisible } = useScrollAnimation();
    const { t } = useLanguage();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            full_name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
        },
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            await contactAPI.submit(data);
            setSubmitStatus('success');
            reset();
        } catch (error) {
            console.error('Submit error:', error);
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

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label className="block text-lg font-semibold mb-2 text-slate-600">
                                    {t.contact.name}
                                </label>
                                <input
                                    {...register('full_name')}
                                    className={`w-full px-6 py-4 rounded-lg border-2 focus:border-lime-500 focus:outline-none text-lg ${errors.full_name ? 'border-red-500' : 'border-gray-200'}`}
                                    placeholder={t.contact.name_placeholder}
                                />
                                {errors.full_name && <p className="mt-1 text-red-500 text-sm">{errors.full_name.message}</p>}
                            </div>

                            <div>
                                <label className="block text-lg font-semibold mb-2 text-slate-600">
                                    {t.contact.email_label}
                                </label>
                                <input
                                    {...register('email')}
                                    type="email"
                                    className={`w-full px-6 py-4 rounded-lg border-2 focus:border-lime-500 focus:outline-none text-lg ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                                    placeholder={t.contact.email_placeholder}
                                />
                                {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label className="block text-lg font-semibold mb-2 text-slate-600">
                                    {t.contact.phone_label}
                                </label>
                                <Controller
                                    name="phone"
                                    control={control}
                                    render={({ field }) => (
                                        <PhoneInput
                                            defaultCountry="uz"
                                            value={field.value}
                                            onChange={field.onChange}
                                            disableFormatting
                                            charAfterDialCode=""
                                            className={errors.phone ? 'phone-input-error' : ''}
                                        />
                                    )}
                                />
                                {errors.phone && <p className="mt-1 text-red-500 text-sm">{errors.phone.message}</p>}
                            </div>

                            <div>
                                <label className="block text-lg font-semibold mb-2 text-slate-600">
                                    {t.contact.subject}
                                </label>
                                <input
                                    {...register('subject')}
                                    className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-lime-500 focus:outline-none text-lg"
                                    placeholder={t.contact.subject_placeholder}
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-semibold mb-2 text-slate-600">
                                    {t.contact.message}
                                </label>
                                <textarea
                                    {...register('message')}
                                    rows={6}
                                    className={`w-full px-6 py-4 rounded-lg border-2 focus:border-lime-500 focus:outline-none text-lg resize-none ${errors.message ? 'border-red-500' : 'border-gray-200'}`}
                                    placeholder={t.contact.message_placeholder}
                                />
                                {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message.message}</p>}
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
                                    <strong>{t.contact.phone_label}:</strong> +998 71 200 06 03
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
