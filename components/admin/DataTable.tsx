'use client';

import { useState } from 'react';
import { Edit, Trash2, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import Link from 'next/link';

interface Column<T> {
    key: string;
    label: string;
    render?: (value: unknown, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    isLoading?: boolean;
    onDelete?: (id: number) => void;
    editUrl?: (id: number) => string;
    searchPlaceholder?: string;
}

export default function DataTable<T extends { id: number }>({
    columns,
    data,
    isLoading = false,
    onDelete,
    editUrl,
    searchPlaceholder = 'Search...'
}: DataTableProps<T>) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter data
    const filteredData = data.filter((row) =>
        Object.values(row as Record<string, unknown>).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Pagination
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (isLoading) {
        return (
            <div className="w-full h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header / Search */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div className="relative w-full max-w-xs">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-lime-500 focus:border-lime-500"
                        placeholder={searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="text-sm text-gray-500">
                    Showing {paginatedData.length} of {filteredData.length} items
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                            {columns.map((col) => (
                                <th key={col.key} className="p-4 font-semibold border-b border-gray-100">
                                    {col.label}
                                </th>
                            ))}
                            {(editUrl || onDelete) && (
                                <th className="p-4 font-semibold border-b border-gray-100 text-right">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {paginatedData.length > 0 ? (
                            paginatedData.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    {columns.map((col) => (
                                        <td key={col.key} className="p-4 text-sm text-gray-700">
                                            {col.render
                                                ? col.render((row as Record<string, unknown>)[col.key], row)
                                                : String((row as Record<string, unknown>)[col.key] || '')}
                                        </td>
                                    ))}
                                    {(editUrl || onDelete) && (
                                        <td className="p-4 text-right flex justify-end gap-2">
                                            {editUrl && (
                                                <Link
                                                    href={editUrl(row.id)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                            )}
                                            {onDelete && (
                                                <button
                                                    onClick={() => onDelete(row.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length + (editUrl || onDelete ? 1 : 0)}
                                    className="p-8 text-center text-gray-500"
                                >
                                    No records found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="p-4 border-t border-gray-100 flex justify-center gap-2">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                                ? 'bg-lime-500 text-white'
                                : 'border border-gray-200 hover:bg-gray-50 text-gray-600'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            )}
        </div>
    );
}
