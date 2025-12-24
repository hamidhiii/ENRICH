'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, FileText } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';
import { certificatesAPI, Certificate } from '@/lib/api';

export default function CertificatesPage() {

    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCertificates = async () => {
        try {
            const response = await certificatesAPI.getAll();
            setCertificates(response.data);
        } catch (error) {
            console.error('Error fetching certificates:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCertificates();
    }, []);

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this certificate?')) {
            try {
                await certificatesAPI.delete(id);
                fetchCertificates(); // Refresh list
            } catch (error) {
                console.error('Error deleting certificate:', error);
                alert('Failed to delete certificate');
            }
        }
    };

    const columns = [
        { key: 'id', label: 'ID' },
        {
            key: 'image',
            label: 'Image',
            render: (value: unknown) => {
                const src = value as string;
                return src ? (
                    <Image src={src.startsWith('http') ? src : `http://localhost:8001${src}`} alt="Certificate" width={40} height={56} className="object-cover border border-gray-200" />
                ) : (
                    <div className="w-10 h-14 bg-gray-100 flex items-center justify-center text-gray-400 text-xs">No Img</div>
                )
            }
        },
        { key: 'name_uz', label: 'Name (UZ)' },
        { key: 'certificate_type', label: 'Type' },
        {
            key: 'expiry_date',
            label: 'Expires',
            render: (value: unknown) => value ? new Date(value as string).toLocaleDateString() : '-'
        },
        {
            key: 'pdf_file',
            label: 'PDF',
            render: (value: unknown) => {
                const src = value as string;
                return src ? (
                    <a href={src.startsWith('http') ? src : `http://localhost:8001${src}`} target="_blank" rel="noopener noreferrer" className="text-lime-600 hover:underline flex items-center gap-1">
                        <FileText size={14} /> View
                    </a>
                ) : '-'
            }
        },
        {
            key: 'is_active',
            label: 'Status',
            render: (value: unknown) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {value ? 'Active' : 'Inactive'}
                </span>
            )
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Certificates</h1>
                    <p className="text-gray-500 mt-1">Manage certificates and licenses</p>
                </div>
                <Link
                    href="/admin/certificates/new"
                    className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                >
                    <Plus size={20} />
                    Add Certificate
                </Link>
            </div>

            <DataTable
                columns={columns}
                data={certificates}
                isLoading={isLoading}
                onDelete={handleDelete}
                editUrl={(id) => `/admin/certificates/${id}/edit`}
                searchPlaceholder="Search certificates..."
            />
        </div>
    );
}
