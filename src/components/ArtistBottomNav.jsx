import { useNavigate } from 'react-router-dom';

const ArtistBottomNav = ({ active }) => {
    const navigate = useNavigate();
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-background-dark/90 backdrop-blur-lg border-t border-border-dark max-w-md mx-auto z-50 pb-safe">
            <div className="flex justify-around items-center h-[72px] px-2">
                <button onClick={() => navigate('/artist-dashboard')} className={`flex flex-col items-center justify-center gap-1 p-2 w-16 ${active === 'home' ? 'text-primary' : 'text-slate-500 hover:text-white'} transition-colors`}>
                    <span className={`material-symbols-outlined ${active === 'home' ? 'filled' : ''}`} style={active === 'home' ? { fontVariationSettings: "'FILL' 1" } : {}}>dashboard</span>
                    <span className="text-[10px] font-medium">Home</span>
                </button>
                <button onClick={() => navigate('/artist-tracks')} className={`flex flex-col items-center justify-center gap-1 p-2 w-16 ${active === 'tracks' ? 'text-primary' : 'text-slate-500 hover:text-white'} transition-colors`}>
                    <span className="material-symbols-outlined">library_music</span>
                    <span className="text-[10px] font-medium">Tracks</span>
                </button>
                <button onClick={() => navigate('/artist-stats')} className={`flex flex-col items-center justify-center gap-1 p-2 w-16 ${active === 'analytics' ? 'text-primary' : 'text-slate-500 hover:text-white'} transition-colors`}>
                    <span className="material-symbols-outlined">group</span>
                    <span className="text-[10px] font-medium">Testers</span>
                </button>
                <button onClick={() => navigate('/artist-settings')} className={`flex flex-col items-center justify-center gap-1 p-2 w-16 ${active === 'settings' ? 'text-primary' : 'text-slate-500 hover:text-white'} transition-colors`}>
                    <span className={`material-symbols-outlined ${active === 'settings' ? 'filled' : ''}`} style={active === 'settings' ? { fontVariationSettings: "'FILL' 1" } : {}}>settings</span>
                    <span className="text-[10px] font-medium">Settings</span>
                </button>
            </div>
            {/* Safe area spacer */}
            <div className="h-6 w-full"></div>
        </nav>
    );
};

export default ArtistBottomNav;
