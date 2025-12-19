import { useNavigate } from 'react-router-dom';
import TesterBottomNav from '../components/TesterBottomNav';
import { useData } from '../context/DataContext';

const TesterSupport = () => {
    const navigate = useNavigate();
    const { artistProfile } = useData();

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col pb-32 max-w-md mx-auto bg-background-light dark:bg-black">
            {/* Header */}
            <div className="flex items-center p-4 sticky top-0 z-10 bg-background-light/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800/50">
                <div onClick={() => navigate(-1)} className="flex size-12 shrink-0 items-center justify-center cursor-pointer text-black dark:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors">
                    <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>chevron_left</span>
                </div>
                <h2 className="text-black dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12 font-mono uppercase">Support Artist</h2>
            </div>

            {/* Content */}
            <div className="flex flex-col items-center px-6 mt-8 flex-1 relative z-0">

                {/* Artist Intro */}
                <div className="flex flex-col items-center gap-6 mb-4 w-full max-w-sm">
                    <div className="relative group">
                        <div className="relative">
                            <div className="bg-center bg-no-repeat bg-cover size-28 border-2 border-primary grayscale hover:grayscale-0 transition-all" style={{ backgroundImage: `url("${artistProfile.photo}")` }}></div>
                            <div className="absolute bottom-0 right-0 bg-primary text-black p-1.5 border border-black flex items-center justify-center">
                                <span className="material-symbols-outlined filled text-[18px] leading-none">favorite</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                        <h1 className="text-black dark:text-white text-3xl font-bold leading-tight tracking-tight font-mono uppercase">{artistProfile.name}</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed max-w-[260px] font-mono text-xs">
                            Help me create more music. Your support goes directly to studio time.
                        </p>
                    </div>
                </div>

                {/* Donation Banner */}
                <div className="w-full mt-6">
                    <div className="border border-white/20 p-4 bg-black relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-2 opacity-20">
                            <span className="material-symbols-outlined text-4xl">savings</span>
                        </div>
                        <h3 className="text-sm font-bold font-mono uppercase text-white mb-4 tracking-wider">Encourage the Project</h3>

                        <button className="w-full bg-[#FF5500] hover:bg-[#FF5500]/90 text-black font-mono font-bold text-xs uppercase py-3 px-4 flex items-center justify-center gap-2 mb-4 border border-transparent hover:border-white transition-all" onClick={() => window.open('https://paypal.me/yourusername', '_blank')}>
                            <span className="material-symbols-outlined text-lg">payments</span>
                            <span>Donate via PayPal</span>
                        </button>

                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { label: 'BTC', icon: 'currency_bitcoin', color: 'text-orange-500', addr: 'bc1qXY...' },
                                { label: 'ETH', icon: 'token', color: 'text-blue-400', addr: '0x123...' },
                                { label: 'XRP', icon: 'change_circle', color: 'text-white', addr: 'rABC...' }
                            ].map((crypto) => (
                                <button
                                    key={crypto.label}
                                    onClick={() => {
                                        navigator.clipboard.writeText(crypto.addr);
                                        alert(`${crypto.label} address copied!`);
                                    }}
                                    className="flex flex-col items-center justify-center p-2 border border-white/10 hover:bg-white/5 active:bg-white/10 transition-colors gap-1"
                                >
                                    <span className={`material-symbols-outlined ${crypto.color} text-xl`}>{crypto.icon}</span>
                                    <span className="text-[10px] font-mono font-bold text-zinc-400">{crypto.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <p className="text-xs text-center text-gray-600 dark:text-gray-500 max-w-xs leading-relaxed">
                    Transactions are secure and encrypted. Thank you for your support!
                </p>

            </div>
            <TesterBottomNav active="donate" />
        </div>
    )
}

export default TesterSupport;
