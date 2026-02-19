import { useState, useEffect } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Outfit', sans-serif; margin: 0; }
      `}</style>

            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-lg shadow-xl' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <svg width="40" height="40" viewBox="0 0 120 120">
                            <path d="M 40 30 L 55 20 L 70 30 L 70 50 L 55 60 L 40 50 Z" fill="#3b82f6" opacity="0.8" />
                            <path d="M 50 50 L 65 40 L 80 50 L 80 70 L 65 80 L 50 70 Z" fill="#10b981" opacity="0.8" />
                            <circle cx="60" cy="50" r="6" fill="#f59e0b" />
                        </svg>
                        <span className="text-2xl font-bold text-white">TechMates</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-white hover:text-blue-400 transition-colors font-medium">
                            Features
                        </a>
                        <a href="#community" className="text-white hover:text-green-400 transition-colors font-medium">
                            Community
                        </a>
                        <a href="#pricing" className="text-white hover:text-purple-400 transition-colors font-medium">
                            Pricing
                        </a>
                        <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all">
                            SignUp
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white text-2xl"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? '✕' : '☰'}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-slate-900 border-t border-slate-800">
                        <div className="px-6 py-4 space-y-4">
                            <a
                                href="#features"
                                className="block text-white hover:text-blue-400 transition-colors font-medium py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Features
                            </a>
                            <a
                                href="#community"
                                className="block text-white hover:text-green-400 transition-colors font-medium py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Community
                            </a>
                            <a
                                href="#pricing"
                                className="block text-white hover:text-purple-400 transition-colors font-medium py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Pricing
                            </a>
                            <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full font-semibold hover:shadow-lg transition-all">
                                SignUp
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Demo content to show navbar behavior */}
            <div className="bg-slate-900 min-h-screen pt-20">
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <h1 className="text-6xl font-black text-white text-center mb-8">
                        TechMates Navbar
                    </h1>
                    <p className="text-xl text-slate-400 text-center mb-12">
                        Scroll down to see the navbar effect
                    </p>

                    <div className="space-y-40 text-slate-500 text-center">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="py-20">
                                <p className="text-4xl mb-4">Section {i}</p>
                                <p>Keep scrolling to see navbar backdrop blur effect...</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}