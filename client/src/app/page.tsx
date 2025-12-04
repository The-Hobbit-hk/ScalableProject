import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient">
                Build Scalable Apps
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
                Experience the next generation of web development. Secure, fast, and beautifully designed for the modern web.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
                <Link
                    href="/signup"
                    className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
                >
                    Get Started Now
                </Link>
                <Link
                    href="/login"
                    className="bg-slate-800/50 text-white border border-slate-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-800 transition-all hover:scale-105 backdrop-blur-sm"
                >
                    Login
                </Link>
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
                <div className="glass-card p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-blue-400 mb-2">Secure</h3>
                    <p className="text-gray-400">Enterprise-grade security with JWT authentication and bcrypt hashing.</p>
                </div>
                <div className="glass-card p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-purple-400 mb-2">Fast</h3>
                    <p className="text-gray-400">Built on Next.js and Node.js for lightning-fast performance.</p>
                </div>
                <div className="glass-card p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-pink-400 mb-2">Beautiful</h3>
                    <p className="text-gray-400">Modern glassmorphism design with responsive Tailwind CSS.</p>
                </div>
            </div>
        </div>
    );
}
