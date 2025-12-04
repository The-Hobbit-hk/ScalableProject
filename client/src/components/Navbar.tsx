'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-80 transition-opacity">
                    ScalableApp
                </Link>

                <div className="flex items-center gap-6">
                    {user ? (
                        <>
                            <div className="hidden md:flex items-center gap-6">
                                <Link
                                    href="/dashboard"
                                    className={`text-sm font-medium transition-colors ${isActive('/dashboard') ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/profile"
                                    className={`text-sm font-medium transition-colors ${isActive('/profile') ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
                                >
                                    Profile
                                </Link>
                            </div>

                            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>

                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-400 hidden sm:block">
                                    {user.name}
                                </span>
                                <button
                                    onClick={logout}
                                    className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex gap-4">
                            <Link
                                href="/login"
                                className="text-gray-300 hover:text-white font-medium transition-colors px-4 py-2"
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
