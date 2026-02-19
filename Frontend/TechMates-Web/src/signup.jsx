import { useState, useEffect } from 'react';
import TechMatesLogo from './logo';

export default function SignupForm() {
    const [form, setForm] = useState({ name: '', email: '', password: '', agreed: false });
    const [valid, setValid] = useState({ name: false, email: false, password: false });
    const [currentImg, setCurrentImg] = useState(0);

    const images = [
        { url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80', title: 'Collaborate & Build', desc: 'Work together on amazing projects' },
        { url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80', title: 'Share Knowledge', desc: 'Learn from experienced developers' },
        { url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80', title: 'Network & Grow', desc: 'Connect with 10k+ active developers' },
    ];

    useEffect(() => {
        const timer = setInterval(() => setCurrentImg(prev => (prev + 1) % images.length), 4000);
        return () => clearInterval(timer);
    }, []);

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (field === 'name') setValid(prev => ({ ...prev, name: value.length > 2 }));
        if (field === 'email') setValid(prev => ({ ...prev, email: /\S+@\S+\.\S+/.test(value) }));
        if (field === 'password') setValid(prev => ({ ...prev, password: value.length >= 8 }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-green-200 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

                {/* Left Panel - Form */}
                <div className="p-5 sm:p-6 lg:p-8 flex flex-col justify-center">
                    <div className="mb-4 flex flex-col items-center">

                        {/* <TechMatesLogo /> */}


                        <h1 className="text-2xl font-bold mb-1">Sign up</h1>
                        <p className="text-gray-500 text-sm">Welcome to TechMates - Join the developer community</p>
                    </div>

                    {/* Social Buttons */}
                    <div className="flex gap-2 mb-6">
                        <button className="flex-1 py-2.5 px-3 border border-gray-300 rounded-full hover:bg-gray-50 flex items-center justify-center gap-2 text-xs font-medium transition-all">
                            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                            Google
                        </button>
                        <button className="flex-1 py-2.5 px-3 border border-gray-300 rounded-full hover:bg-gray-50 flex items-center justify-center gap-2 text-xs font-medium transition-all">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            GitHub
                        </button>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium mb-1.5">Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    placeholder="Jane Polison"
                                    className="w-full px-3 py-2.5 text-sm bg-green-50 border-2 border-green-200 rounded-xl focus:outline-none focus:border-green-400 transition-colors"
                                />
                                {valid.name && (
                                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-green-600 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                            <path d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium mb-1.5">E-mail</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    placeholder="PolisonJ@gmail.com"
                                    className="w-full px-3 py-2.5 text-sm bg-green-50 border-2 border-green-200 rounded-xl focus:outline-none focus:border-green-400 transition-colors"
                                />
                                {valid.email && (
                                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-green-600 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                            <path d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={form.password}
                                    onChange={(e) => handleChange('password', e.target.value)}
                                    placeholder="••••••••••"
                                    className="w-full px-3 py-2.5 text-sm bg-green-50 border-2 border-green-200 rounded-xl focus:outline-none focus:border-green-400 transition-colors"
                                />
                                {valid.password && (
                                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-green-600 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                            <path d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.agreed}
                                onChange={(e) => setForm(prev => ({ ...prev, agreed: e.target.checked }))}
                                className="w-3.5 h-3.5 accent-green-600"
                            />
                            <span className="text-xs">I agree to the <span className="font-semibold underline">Privacy & Policy</span></span>
                        </label>

                        <button className="w-full mt-4 py-3 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full font-bold text-base hover:shadow-lg transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                            <span className="text-xl">🤝</span>
                            Sign Up
                        </button>
                    </div>
                </div>

                {/* Right Panel - Animated Images */}
                <div className="hidden md:block relative overflow-hidden h-[600px]">
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentImg ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <img
                                src={img.url}
                                alt={img.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/40 to-blue-600/40"></div>
                        </div>
                    ))}

                    <div className="relative z-10 h-full flex flex-col justify-between p-6">
                        {/* Dots Navigation */}
                        <div className="flex justify-end gap-1.5">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImg(idx)}
                                    className={`h-1.5 rounded-full transition-all ${idx === currentImg ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
                                />
                            ))}
                        </div>

                        {/* Text Card */}
                        <div className="bg-white/95 backdrop-blur rounded-xl p-5 shadow-xl">
                            <h3 className="text-lg font-bold mb-1.5 flex items-center gap-2">
                                <span className="text-xl">💻</span>
                                {images[currentImg].title}
                            </h3>
                            <p className="text-xs text-gray-700 mb-3">
                                {images[currentImg].desc}
                            </p>
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {[0, 1, 2, 3].map(i => (
                                        <div key={i} className="w-6 h-6 rounded-full border-2 border-white" style={{
                                            background: `linear-gradient(135deg, ${['#a855f7', '#3b82f6', '#10b981', '#f59e0b'][i]} 0%, ${['#ec4899', '#06b6d4', '#059669', '#ef4444'][i]} 100%)`,
                                        }}></div>
                                    ))}
                                </div>
                                <span className="text-[10px] font-semibold text-gray-600">10k+ Active Developers</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
