export default function TechMatesLogo() {
    return (
        <div className="flex flex-col items-center gap-1">
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-2 shadow-sm">
                <svg width="28" height="28" viewBox="0 0 120 120">
                    {/* Left bracket */}
                    <path d="M 45 30 Q 30 30 30 45 L 30 75 Q 30 90 45 90" stroke="#3b82f6" strokeWidth="10" fill="none" strokeLinecap="round" />
                    {/* Right bracket */}
                    <path d="M 75 30 Q 90 30 90 45 L 90 75 Q 90 90 75 90" stroke="#10b981" strokeWidth="10" fill="none" strokeLinecap="round" />
                    {/* Heart in center */}
                    <path d="M 60 50 L 55 45 Q 50 40 45 45 Q 45 50 50 55 L 60 65 L 70 55 Q 75 50 75 45 Q 70 40 65 45 Z" fill="#f59e0b" />
                    {/* Connection line */}
                    <line x1="45" y1="60" x2="75" y2="60" stroke="#f59e0b" strokeWidth="4" strokeDasharray="4 2" />
                </svg>
            </div>
            <div className="text-center">
                <div className="text-sm font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent leading-tight">TechMates</div>
                <div className="text-[8px] text-gray-400 font-medium tracking-wide uppercase">Code & Connection</div>
            </div>
        </div>
    );
}
