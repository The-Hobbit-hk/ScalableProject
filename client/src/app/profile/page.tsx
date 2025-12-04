'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock } from 'lucide-react';

export default function ProfilePage() {
    const { user, login, loading } = useAuth();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        } else if (user) {
            setValue('name', user.name);
            setValue('email', user.email);
        }
    }, [user, loading, router, setValue]);

    const onSubmit = async (data: any) => {
        setIsSaving(true);
        try {
            const res = await api.put('/auth/profile', data);
            login(res.data.token, res.data);
            setMessage('Profile updated successfully');
            setError('');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Update failed');
            setMessage('');
        } finally {
            setIsSaving(false);
        }
    };

    if (loading || !user) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-blue-500 animate-pulse text-xl font-medium">Loading Profile...</div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <div className="glass-card p-8 rounded-2xl">
                <div className="flex items-center gap-4 mb-8 border-b border-slate-700 pb-6">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
                        <p className="text-gray-400">Update your personal information</p>
                    </div>
                </div>

                {message && (
                    <div className="bg-green-500/10 border border-green-500/50 text-green-200 p-4 rounded-lg mb-6 flex items-center">
                        <span className="mr-2">✓</span> {message}
                    </div>
                )}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                {...register('name', { required: 'Name is required' })}
                                type="text"
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>
                        {errors.name && (
                            <p className="text-red-400 text-xs mt-1">{errors.name.message as string}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Please enter a valid email address'
                                    }
                                })}
                                type="email"
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-400 text-xs mt-1">{errors.email.message as string}</p>
                        )}
                    </div>

                    <div className="pt-4 border-t border-slate-700/50">
                        <label className="block text-sm font-medium text-gray-300 mb-2">New Password (optional)</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                {...register('password', { minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                                type="password"
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Leave blank to keep current"
                            />
                        </div>
                        {errors.password && (
                            <p className="text-red-400 text-xs mt-1">{errors.password.message as string}</p>
                        )}
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg shadow-blue-500/20 transform transition-all duration-200 hover:scale-[1.01] disabled:opacity-50"
                        >
                            {isSaving ? 'Saving Changes...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
