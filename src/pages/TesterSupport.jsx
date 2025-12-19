import { useNavigate } from 'react-router-dom';
import TesterBottomNav from '../components/TesterBottomNav';

const TesterSupport = () => {
    const navigate = useNavigate();

    const donationOptions = [
        { name: 'PayPal', icon: 'payments', color: 'text-blue-400' },
        { name: 'Bitcoin', icon: 'currency_bitcoin', color: 'text-orange-500' },
        { name: 'Ethereum', icon: 'diamond', color: 'text-purple-400' }, // Using diamond as placeholder for Eth
        { name: 'XRP', icon: 'change_circle', color: 'text-white' }, // Using change_circle for generic crypto/XRP
        { name: 'Crypto', icon: 'wallet', color: 'text-green-400' },
    ];

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col pb-32 max-w-md mx-auto bg-background-light dark:bg-black">
            {/* Header */}
            <div className="flex items-center p-4 sticky top-0 z-10 bg-background-light/90 dark:bg-black/90 backdrop-blur-md">
                <div onClick={() => navigate(-1)} className="flex size-12 shrink-0 items-center justify-center cursor-pointer text-black dark:text-white hover:bg-white/5 rounded-full transition-colors">
                    <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>chevron_left</span>
                </div>
                <h2 className="text-black dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Support Artist</h2>
            </div>

            {/* Content */}
            <div className="flex flex-col items-center px-6 mt-2 flex-1 relative z-0">

                {/* Artist Intro */}
                <div className="flex flex-col items-center gap-6 mb-10 w-full max-w-sm">
                    <div className="relative group">
                        {/* Animated background blur */}
                        <div className="absolute inset-0 bg-primary blur-[40px] opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>

                        <div className="relative">
                            <div className="bg-center bg-no-repeat bg-cover rounded-full size-28 shadow-2xl ring-2 ring-white/10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDwXGDVb9UeUuxFya6w8iWqz8LCdPJtI4T56_qWVhAEi3vUFjMC5dbDV1HuCqPvN3H2mnWoDtqmma2bDl5ZPEACYw4gXES4v_yV_rSmLaK1bUgfRwZOxBjl3o0f19g54sNDbnel3cw5loLMsEAPIoI91BQ37H4CJAm3rajp4VRsp8QASj__py8DygdWtFJWiFActWO6FjbpoAXr8TPthPpkI8peXOYYAt8TchMVlNbEglWRawmQ-AddBqneAm9aeV6xirIrGw6IMdg3")' }}></div>
                            <div className="absolute bottom-0 right-0 bg-primary text-black p-1.5 rounded-full border-4 border-black flex items-center justify-center shadow-lg">
                                <span className="material-symbols-outlined filled text-[18px] leading-none">favorite</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                        <h1 className="text-black dark:text-white text-3xl font-bold leading-tight tracking-tight">The Weeknd</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed max-w-[260px]">
                            Help me create more music. Your support goes directly to studio time.
                        </p>
                    </div>
                </div>

                {/* Donation Grid */}
                <div className="w-full grid grid-cols-2 gap-3 mb-6">
                    {donationOptions.map((option) => (
                        <button key={option.name} className="group relative flex flex-col items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border-2 border-white/5 hover:border-primary/50 rounded-2xl p-6 transition-all duration-300 active:scale-[0.98]">
                            <span className={`material-symbols-outlined text-4xl mb-1 ${option.color} group-hover:scale-110 transition-transform duration-300`}>{option.icon}</span>
                            <span className="text-white font-bold text-sm tracking-wide">{option.name}</span>
                        </button>
                    ))}

                    {/* Custom Amount / Other */}
                    <button className="group relative flex flex-col items-center justify-center gap-3 bg-primary hover:bg-white/90 border-2 border-primary rounded-2xl p-6 transition-all duration-300 active:scale-[0.98]">
                        <span className="material-symbols-outlined text-black text-4xl mb-1 group-hover:scale-110 transition-transform duration-300">stars</span>
                        <span className="text-black font-bold text-sm tracking-wide">Custom</span>
                    </button>
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
