'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Mail, Phone, MapPin } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';
import { partnersAPI, Partner } from '@/lib/api';

export default function PartnersPage() {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPartners = async () => {
        try {
            const response = await partnersAPI.getAll();
            setPartners(response.data);
        } catch (error) {
            console.error('Error fetching partners:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPartners();
    }, []);

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this partner?')) {
            try {
                await partnersAPI.delete(id);
                fetchPartners(); // Refresh list
            } catch (error) {
                console.error('Error deleting partner:', error);
                alert('Failed to delete partner');
            }
        }
    };

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'company_name', label: 'Company' },
        { key: 'contact_person', label: 'Contact Person' },
        {
            key: 'email',
            label: 'Contact Info',
            render: (value: unknown, item: Partner) => (
                <div className="text-sm space-y-1">
                    <div className="flex items-center gap-1 text-gray-600">
                        <Mail size={12} /> {String(value)}
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                        <Phone size={12} /> {item.phone}
                    </div>
                </div>
            )
        },
        {
            key: 'country',
            label: 'Location',
            render: (value: unknown, item: Partner) => (
                <div className="flex items-center gap-1 text-gray-600 text-sm">
                    <MapPin size={12} />
                    {String(value)}{item.city ? `, ${item.city}` : ''}
                </div>
            )
        },
        {
            key: 'status',
            label: 'Status',
            render: (value: unknown) => {
                const statusValue = String(value);
                const colors = {
                    pending: 'bg-yellow-100 text-yellow-800',
                    approved: 'bg-green-100 text-green-800',
                    rejected: 'bg-red-100 text-red-800'
                };
                return (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[statusValue as keyof typeof colors] || 'bg-gray-100 text-gray-800'}`}>
                        {statusValue.charAt(0).toUpperCase() + statusValue.slice(1)}
                    </span>
                );
            }
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Partners</h1>
                    <p className="text-gray-500 mt-1">Manage partners and applications</p>
                </div>
                <Link
                    href="/admin/partners/new"
                    className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                >
                    <Plus size={20} />
                    Add Partner
                </Link>
            </div>

            <DataTable
                columns={columns}
                data={partners}
                isLoading={isLoading}
                onDelete={handleDelete}
                editUrl={(id) => `/admin/partners/${id}/edit`}
                searchPlaceholder="Search partners..."
            />
        </div>
    );
}
