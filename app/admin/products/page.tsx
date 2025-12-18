'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';
import { productsAPI } from '@/lib/api';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const response = await productsAPI.getAll();
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            // Mock data for demo if API fails or is empty
            // setProducts([
            //     { id: 1, name_uz: 'Parsley', category: { name_uz: 'Vitaminlar' }, form: 'tablet', is_active: true },
            //     { id: 2, name_uz: 'Vitamin C', category: { name_uz: 'Vitaminlar' }, form: 'tablet', is_active: true },
            // ]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            try {
                await productsAPI.delete(id);
                fetchProducts(); // Refresh list
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product');
            }
        }
    };

    const columns = [
        { key: 'id', label: 'ID' },
        {
            key: 'image',
            label: 'Image',
            render: (value: string) => value ? (
                <img src={value.startsWith('http') ? value : `http://localhost:8001${value}`} alt="Product" className="w-10 h-10 object-cover rounded" />
            ) : (
                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">No Img</div>
            )
        },
        { key: 'name_uz', label: 'Name (UZ)' },
        {
            key: 'category',
            label: 'Category',
            render: (value: any) => value?.name_uz || '-'
        },
        {
            key: 'form',
            label: 'Form',
            render: (value: string) => <span className="capitalize">{value}</span>
        },
        {
            key: 'is_active',
            label: 'Status',
            render: (value: boolean) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {value ? 'Active' : 'Inactive'}
                </span>
            )
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Products</h1>
                    <p className="text-gray-500 mt-1">Manage your pharmaceutical products</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                >
                    <Plus size={20} />
                    Add Product
                </Link>
            </div>

            <DataTable
                columns={columns}
                data={products}
                isLoading={isLoading}
                onDelete={handleDelete}
                editUrl={(id) => `/admin/products/${id}/edit`}
                searchPlaceholder="Search products..."
            />
        </div>
    );
}
