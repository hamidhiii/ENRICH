'use client';

import { useState, useRef } from 'react';
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { uploadAPI, getImageUrl } from '@/lib/api';

interface FileUploadProps {
    label: string;
    accept?: string;
    type?: 'image' | 'pdf';
    value?: string;
    onChange: (url: string) => void;
}

export default function FileUpload({
    label,
    accept,
    type = 'image',
    value,
    onChange
}: FileUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setError('');

        try {
            let response;
            if (type === 'image') {
                response = await uploadAPI.image(file);
            } else {
                response = await uploadAPI.pdf(file);
            }

            // Assuming API returns { url: '/uploads/filename.ext' }
            // Adjust based on actual API response structure
            const url = response.data.url || response.data.file_path;
            onChange(url);
        } catch (err) {
            console.error('Upload failed:', err);
            setError('Upload failed. Please try again.');
        } finally {
            setIsUploading(false);
            // Reset input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleRemove = () => {
        onChange('');
    };

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>

            {value ? (
                <div className="relative border border-gray-200 rounded-lg p-2 bg-gray-50 flex items-center gap-3">
                    {type === 'image' ? (
                        <div className="w-16 h-16 relative rounded overflow-hidden bg-gray-200 flex-shrink-0">
                            <Image
                                src={getImageUrl(value)}
                                alt="Preview"
                                fill
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-16 h-16 rounded bg-red-100 flex items-center justify-center text-red-500 flex-shrink-0">
                            <FileText size={32} />
                        </div>
                    )}

                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {value.split('/').pop()}
                        </p>
                        <p className="text-xs text-gray-500 uppercase">{type}</p>
                    </div>

                    <button
                        type="button"
                        onClick={handleRemove}
                        className="p-1 rounded-full bg-white text-gray-400 hover:text-red-500 shadow-sm border border-gray-200 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-lime-500 hover:bg-lime-50 transition-all ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
                >
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-3">
                        {type === 'image' ? <ImageIcon size={24} /> : <Upload size={24} />}
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                        {isUploading ? 'Uploading...' : 'Click to upload'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        {accept || (type === 'image' ? 'PNG, JPG, GIF up to 5MB' : 'PDF up to 10MB')}
                    </p>
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept={accept || (type === 'image' ? 'image/*' : 'application/pdf')}
                onChange={handleFileChange}
                className="hidden"
            />

            {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
