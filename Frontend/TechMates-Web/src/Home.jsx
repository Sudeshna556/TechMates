import React from 'react'

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

export default Home

// import { useState, useEffect } from 'react';

// export default function TechMatesHome() {
//     const [scrolled, setScrolled] = useState(false);
//     const [activeFeature, setActiveFeature] = useState(0);

//     useEffect(() => {
//         const handleScroll = () => setScrolled(window.scrollY > 50);
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     useEffect(() => {
//         const timer = setInterval(() => {
//             setActiveFeature(prev => (prev + 1) % 3);
//         }, 3000);
//         return () => clearInterval(timer);
//     }, []);

//     const features = [
//         { icon: '💬', title: 'Real-time Chat', desc: 'Connect instantly with developers worldwide' },
//         { icon: '🔗', title: 'Network & Grow', desc: 'Build meaningful connections in tech' },
//         { icon: '🚀', title: 'Collaborate', desc: 'Share knowledge and work on projects together' }
//     ];

//     return (
//         <div className="bg-slate-900 text-white">
//             <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap');
//         * { margin: 0; padding: 0; box-sizing: border-box; }
//         body { font-family: 'Outfit', sans-serif; }
//         .code-font { font-family: 'JetBrains Mono', monospace; }
//       `}</style>

//             {/* Navigation */}
//             <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-lg shadow-xl' : 'bg-transparent'}`}>
//                 <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                         <svg width="40" height="40" viewBox="0 0 120 120">
//                             <path d="M 40 30 L 55 20 L 70 30 L 70 50 L 55 60 L 40 50 Z" fill="#3b82f6" opacity="0.8" />
//                             <path d="M 50 50 L 65 40 L 80 50 L 80 70 L 65 80 L 50 70 Z" fill="#10b981" opacity="0.8" />
//                             <circle cx="60" cy="50" r="6" fill="#f59e0b" />
//                         </svg>
//                         <span className="text-2xl font-bold">TechMates</span>
//                     </div>
//                     <div className="hidden md:flex items-center gap-8">
//                         <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
//                         <a href="#community" className="hover:text-green-400 transition-colors">Community</a>
//                         <a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</a>
//                         <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all">
//                             Get Started
//                         </button>
//                     </div>
//                     <button className="md:hidden text-2xl">☰</button>
//                 </div>
//             </nav>

//             {/* Hero Section */}
//             <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-6">
//                 {/* Animated background grid */}
//                 <div className="absolute inset-0 opacity-10 pointer-events-none">
//                     <div className="absolute inset-0" style={{
//                         backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)',
//                         backgroundSize: '50px 50px',
//                     }}></div>
//                 </div>

//                 {/* Floating orbs */}
//                 <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse pointer-events-none"></div>
//                 <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>
//                 <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-15 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>

//                 <div className="relative z-10 max-w-6xl mx-auto text-center">


//                     <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
//                         Where{' '}
//                         <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
//                             Developers
//                         </span>
//                         <br />
//                         Connect & Collaborate
//                     </h1>

//                     <p className="text-lg md:text-xl lg:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto">
//                         Join the fastest-growing community platform for software engineers.
//                         Chat, collaborate, and build together in real-time.
//                     </p>

//                     {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
//                         <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105">
//                             Start Chatting Now →
//                         </button>
//                         <button className="px-8 py-4 border-2 border-slate-600 rounded-full font-bold text-lg hover:bg-slate-800 transition-all">
//                             Watch Demo
//                         </button>
//                      </div>  */}

//                     {/* Stats */}
//                     <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
//                         <div className="text-center">
//                             <div className="text-3xl md:text-4xl font-black text-blue-400 mb-2">10K+</div>
//                             <div className="text-slate-400 text-xs md:text-sm">Active Developers</div>
//                         </div>
//                         <div className="text-center">
//                             <div className="text-3xl md:text-4xl font-black text-green-400 mb-2">50K+</div>
//                             <div className="text-slate-400 text-xs md:text-sm">Messages Daily</div>
//                         </div>
//                         <div className="text-center">
//                             <div className="text-3xl md:text-4xl font-black text-purple-400 mb-2">100+</div>
//                             <div className="text-slate-400 text-xs md:text-sm">Countries</div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Features Section */}
//             <section id="features" className="relative py-20 md:py-32 bg-gradient-to-b from-slate-900 to-slate-800">
//                 <div className="max-w-7xl mx-auto px-6">
//                     <div className="text-center mb-16">
//                         {/* <div className="inline-block px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30 mb-6">
//                             <span className="text-purple-300 text-sm font-semibold">FEATURES</span>
//                         </div> */}
//                         <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
//                             Built for Developers,<br />by Developers
//                         </h2>
//                         <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mt-6 mb-6 text-center justify-center items-center">
//                             Everything you need to connect, collaborate, and grow your network in one place.
//                         </p>
//                     </div>

//                     <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16">
//                         {features.map((feature, idx) => (
//                             <div
//                                 key={idx}
//                                 className={`bg-slate-800/50 backdrop-blur border border-slate-700 rounded-3xl p-8 hover:border-blue-500 transition-all duration-300 cursor-pointer ${activeFeature === idx ? 'ring-2 ring-blue-500 shadow-2xl shadow-blue-500/20' : ''}`}
//                                 onClick={() => setActiveFeature(idx)}
//                             >
//                                 <div className="text-5xl md:text-6xl mb-6">{feature.icon}</div>
//                                 <h3 className="text-xl md:text-2xl font-bold mb-4">{feature.title}</h3>
//                                 <p className="text-slate-400 text-sm md:text-base">{feature.desc}</p>
//                             </div>
//                         ))}
//                     </div>

//                 </div>
//             </section>

//             {/* Community Section */}
//             <section id="community" className="relative py-20 md:py-32 bg-gradient-to-b from-slate-800 to-slate-900">
//                 <div className="absolute inset-0 opacity-5 pointer-events-none">
//                     <div className="absolute top-20 left-20 w-40 h-40 border-2 border-blue-500 rounded-lg rotate-12"></div>
//                     <div className="absolute bottom-20 right-20 w-56 h-56 border-2 border-green-500 rounded-full"></div>
//                 </div>

//                 <div className="max-w-7xl mx-auto px-6 relative z-10">
//                     <div className="text-center md:text-left mb-12 md:mb-0">
//                         <div className="inline-block px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30 mb-6">
//                             <span className="text-green-300 text-sm font-semibold">COMMUNITY</span>
//                         </div>
//                     </div>

//                     <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
//                         <div>
//                             <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
//                                 Join a Thriving<br />Tech Community
//                             </h2>
//                             <p className="text-lg md:text-xl text-slate-400 mb-8">
//                                 Connect with like-minded developers, share knowledge, get help on projects,
//                                 and build lasting professional relationships.
//                             </p>
//                             <ul className="space-y-4">
//                                 {['Topic-based chat rooms', 'Direct messaging', 'Code sharing & reviews', 'Voice & video calls'].map((item, idx) => (
//                                     <li key={idx} className="flex items-center gap-3">
//                                         <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-sm flex-shrink-0">✓</div>
//                                         <span className="text-base md:text-lg">{item}</span>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>

//                         <div className="relative">
//                             <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-2xl relative z-10">
//                                 <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-700">
//                                     <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex-shrink-0"></div>
//                                     <div>
//                                         <div className="font-semibold">Sarah Chen</div>
//                                         <div className="text-sm text-green-400">● Online</div>
//                                     </div>
//                                 </div>
//                                 <div className="space-y-3">
//                                     <div className="bg-blue-500/20 rounded-2xl rounded-tl-none p-4 border border-blue-500/30">
//                                         <p className="text-sm">Hey! Just pushed my new React component library. Would love your feedback! 🚀</p>
//                                     </div>
//                                     <div className="bg-slate-700 rounded-2xl rounded-tr-none p-4 ml-8">
//                                         <p className="text-sm">That's awesome! Checking it out now. The API looks clean! 💯</p>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="absolute -top-6 -right-6 w-32 h-32 bg-green-500/20 rounded-full blur-2xl pointer-events-none"></div>
//                             <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl pointer-events-none"></div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* CTA Section */}
//             <section className="relative py-20 md:py-32 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600">
//                 <div className="absolute inset-0 opacity-20 pointer-events-none">
//                     <div className="absolute inset-0" style={{
//                         backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
//                         backgroundSize: '30px 30px',
//                     }}></div>
//                 </div>

//                 <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
//                     <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6">Ready to Connect?</h2>
//                     <p className="text-xl md:text-2xl mb-12 text-blue-100">
//                         Join thousands of developers building the future together.
//                     </p>
//                     <button className="px-12 py-5 bg-white text-slate-900 rounded-full font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-105">
//                         Create Free Account
//                     </button>
//                     <p className="mt-6 text-blue-100 text-sm">No credit card required • Free forever</p>
//                 </div>
//             </section>

//             {/* Footer */}
//             <footer className="bg-slate-950 py-16">
//                 <div className="max-w-7xl mx-auto px-6">
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
//                         <div className="col-span-2 md:col-span-1">
//                             <div className="flex items-center gap-3 mb-4">
//                                 <svg width="32" height="32" viewBox="0 0 120 120">
//                                     <path d="M 40 30 L 55 20 L 70 30 L 70 50 L 55 60 L 40 50 Z" fill="#3b82f6" opacity="0.8" />
//                                     <path d="M 50 50 L 65 40 L 80 50 L 80 70 L 65 80 L 50 70 Z" fill="#10b981" opacity="0.8" />
//                                     <circle cx="60" cy="50" r="6" fill="#f59e0b" />
//                                 </svg>
//                                 <span className="text-xl font-bold">TechMates</span>
//                             </div>
//                             <p className="text-slate-400 text-sm">Connecting developers worldwide.</p>
//                         </div>
//                         <div>
//                             <h4 className="font-bold mb-4">Product</h4>
//                             <ul className="space-y-2 text-slate-400 text-sm">
//                                 <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
//                                 <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
//                                 <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
//                             </ul>
//                         </div>
//                         <div>
//                             <h4 className="font-bold mb-4">Company</h4>
//                             <ul className="space-y-2 text-slate-400 text-sm">
//                                 <li><a href="#" className="hover:text-white transition-colors">About</a></li>
//                                 <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
//                                 <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
//                             </ul>
//                         </div>
//                         <div>
//                             <h4 className="font-bold mb-4">Social</h4>
//                             <ul className="space-y-2 text-slate-400 text-sm">
//                                 <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
//                                 <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
//                                 <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
//                             </ul>
//                         </div>
//                     </div>
//                     <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
//                         © 2024 TechMates. All rights reserved.
//                     </div>
//                 </div>
//             </footer>
//         </div>
//     );
// }