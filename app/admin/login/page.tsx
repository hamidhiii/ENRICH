'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import { Lock, User } from 'lucide-react';
import { AxiosError } from 'axios';

export default function AdminLogin() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await authAPI.login(formData);
            const { access_token } = response.data;

            localStorage.setItem('token', access_token);
            router.push('/admin');
        } catch (err: unknown) {
            if (err instanceof AxiosError && err.response?.data?.detail) {
                setError(err.response.data.detail);
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-lime-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold">
                        E
                    </div>
                    <h1 className="text-2xl font-bold text-slate-700">Admin Panel</h1>
                    <p className="text-gray-500 mt-2">Sign in to manage your website</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Username
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <User size={20} />
                            </div>
                            <input
                                type="text"
                                required
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-lime-500 focus:border-lime-500 transition-colors"
                                placeholder="Enter your username"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <Lock size={20} />
                            </div>
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-lime-500 focus:border-lime-500 transition-colors"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-lime-500 hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
