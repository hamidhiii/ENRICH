'use client';

import { useState, useEffect } from 'react';
import { Save, Globe, Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin, Send } from 'lucide-react';
import { settingsAPI, SiteSettings } from '@/lib/api';
import { toast } from 'react-hot-toast';

export default function SettingsPage() {
    const [settings, setSettings] = useState<Partial<SiteSettings>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await settingsAPI.get();
                setSettings(res.data);
            } catch (error) {
                console.error('Error fetching settings:', error);
                toast.error('Failed to load settings');
            } finally {
                setIsLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await settingsAPI.update(settings);
            toast.success('Settings updated successfully');
        } catch (error) {
            console.error('Error updating settings:', error);
            toast.error('Failed to update settings');
        } finally {
            setIsSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    if (isLoading) return <div className="p-8">Loading settings...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Sozlamalar</h1>
                    <p className="text-gray-500 mt-1">Saytning umumiy sozlamalarini boshqarish</p>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors disabled:opacity-50 shadow-lg shadow-lime-500/20"
                >
                    <Save size={20} />
                    {isSaving ? 'Saqlanmoqda...' : 'Saqlash'}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* General Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Globe className="text-lime-500" size={20} />
                        Umumiy ma'lumotlar
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sayt nomi (UZ)</label>
                            <input
                                type="text"
                                name="site_name_uz"
                                value={settings.site_name_uz || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sayt nomi (RU)</label>
                            <input
                                type="text"
                                name="site_name_ru"
                                value={settings.site_name_ru || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Mail className="text-lime-500" size={20} />
                        Aloqa ma'lumotlari
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    value={settings.email || ''}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    name="phone"
                                    value={settings.phone || ''}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Manzil (UZ)</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                                <textarea
                                    name="address_uz"
                                    value={settings.address_uz || ''}
                                    onChange={handleChange}
                                    rows={2}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Send className="text-lime-500" size={20} />
                        Ijtimoiy tarmoqlar
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                            <div className="relative">
                                <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    name="facebook_url"
                                    value={settings.facebook_url || ''}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                            <div className="relative">
                                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    name="instagram_url"
                                    value={settings.instagram_url || ''}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Telegram</label>
                            <div className="relative">
                                <Send className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    name="telegram_url"
                                    value={settings.telegram_url || ''}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                            <div className="relative">
                                <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    name="linkedin_url"
                                    value={settings.linkedin_url || ''}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
