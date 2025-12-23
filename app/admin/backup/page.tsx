'use client';

import { useState } from 'react';
import { Database, Download, Plus, ShieldCheck, AlertTriangle } from 'lucide-react';
import { backupAPI } from '@/lib/api';
import { toast } from 'react-hot-toast';

export default function BackupPage() {
    const [isCreating, setIsCreating] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleCreateBackup = async () => {
        setIsCreating(true);
        try {
            await backupAPI.create();
            toast.success('Backup muvaffaqiyatli yaratildi');
        } catch (error) {
            console.error('Error creating backup:', error);
            toast.error('Backup yaratishda xatolik');
        } finally {
            setIsCreating(false);
        }
    };

    const handleDownloadBackup = async () => {
        setIsDownloading(true);
        try {
            await backupAPI.download();
            toast.success('Baza yuklab olindi');
        } catch (error) {
            console.error('Error downloading backup:', error);
            toast.error('Yuklab olishda xatolik');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Backup</h1>
                <p className="text-gray-500 mt-1">Ma'lumotlar bazasini zaxiralash va yuklab olish</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Create Backup */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-lime-100 text-lime-600 flex items-center justify-center">
                        <Plus size={32} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Zaxira nusxa yaratish</h2>
                        <p className="text-gray-500 mt-2">Serverda ma'lumotlar bazasining yangi nusxasini yarating</p>
                    </div>
                    <button
                        onClick={handleCreateBackup}
                        disabled={isCreating}
                        className="w-full py-3 bg-lime-500 text-white rounded-lg font-bold hover:bg-lime-600 transition-all disabled:opacity-50 shadow-lg shadow-lime-500/20 flex items-center justify-center gap-2"
                    >
                        {isCreating ? 'Yaratilmoqda...' : 'Yaratish'}
                    </button>
                </div>

                {/* Download Backup */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        <Download size={32} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Bazani yuklab olish</h2>
                        <p className="text-gray-500 mt-2">Joriy ma'lumotlar bazasini kompyuteringizga yuklab oling</p>
                    </div>
                    <button
                        onClick={handleDownloadBackup}
                        disabled={isDownloading}
                        className="w-full py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isDownloading ? 'Yuklanmoqda...' : 'Yuklab olish'}
                    </button>
                </div>
            </div>

            {/* Security Info */}
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 flex gap-4">
                <div className="text-amber-500 shrink-0">
                    <AlertTriangle size={24} />
                </div>
                <div>
                    <h3 className="text-amber-800 font-bold">Xavfsizlik eslatmasi</h3>
                    <p className="text-amber-700 text-sm mt-1">
                        Zaxira nusxalari barcha mahsulotlar, yangiliklar va foydalanuvchi ma'lumotlarini o'z ichiga oladi.
                        Yuklab olingan fayllarni xavfsiz joyda saqlang.
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                    <ShieldCheck size={24} />
                </div>
                <div>
                    <h3 className="text-slate-800 font-bold">Avtomatik backup</h3>
                    <p className="text-gray-500 text-sm">Tizim har kuni avtomatik ravishda zaxira nusxalarini yaratadi.</p>
                </div>
            </div>
        </div>
    );
}
