import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div className="relative min-h-screen flex flex-col font-display antialiased overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary blur-[120px] mix-blend-screen"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full bg-primary blur-[100px] opacity-50 mix-blend-screen"></div>
            </div>

            <div className="relative z-10 flex flex-col flex-1 h-full px-6 py-8">
                <div className="h-8"></div>

                <div className="flex-1 flex flex-col items-center justify-center -mt-20">
                    <img src="/beta-beat-logo.png" alt="BETA BEAT" className="w-48 h-auto mb-6" />
                    <p className="mt-6 text-gray-500 dark:text-gray-400 text-sm font-medium tracking-[0.2em] uppercase text-center">
                        Music Testing Evolved
                    </p>
                </div>

                <div className="w-full flex flex-col items-center justify-end pb-8 gap-6">
                    {/* Demo Navigation Splits */}
                    <button onClick={() => navigate('/artist-dashboard')} className="w-full max-w-[400px] h-14 bg-primary hover:bg-[#ff9029] active:scale-[0.98] transition-all duration-200 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(242,127,13,0.3)]">
                        <span className="text-background-dark font-bold text-lg tracking-wide">Login as Artist</span>
                    </button>
                    <button onClick={() => navigate('/tester-access')} className="w-full max-w-[400px] h-14 bg-white/10 hover:bg-white/20 active:scale-[0.98] transition-all duration-200 rounded-full flex items-center justify-center border border-white/10">
                        <span className="text-white font-bold text-lg tracking-wide">Tester Access</span>
                    </button>

                    <div className="flex flex-col items-center gap-4">
                        <button className="text-sm text-gray-500 hover:text-white transition-colors">
                            Trouble logging in?
                        </button>
                        <p className="text-[10px] text-gray-600 uppercase tracking-widest">v1.0.0 Beta</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
