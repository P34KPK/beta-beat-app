import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import TesterBottomNav from '../components/TesterBottomNav';
import { useData } from '../context/DataContext';

const TesterHome = () => {
    const navigate = useNavigate();
    const { tracks, artistProfile } = useData();
    const [showMenu, setShowMenu] = useState(false);

    const handleExit = () => {
        // Clear session if needed
        sessionStorage.removeItem('testerCode'); // Start fresh
        navigate('/tester-access');
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="relative flex h-full min-h-screen w-full flex-col overflow-hidden bg-background-light dark:bg-black text-slate-900 dark:text-white pb-24 max-w-md mx-auto"
        >
            <div className="sticky top-0 z-50 flex items-center justify-between bg-background-light/90 dark:bg-black/90 backdrop-blur-md p-4 pb-2 border-b border-gray-200 dark:border-gray-800/50">
                <div className="flex-1">
                    <img src="/beta-beat-logo.png" alt="BETA BEAT" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-end gap-3 relative">
                    <button onClick={() => setShowMenu(!showMenu)} className="flex items-center justify-center size-10 bg-transparent text-slate-900 dark:text-white hover:bg-white hover:text-black border border-white/20 transition-colors z-50 relative">
                        <span className="material-symbols-outlined">{showMenu ? 'close' : 'menu'}</span>
                    </button>

                    <AnimatePresence>
                        {showMenu && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                className="absolute top-12 right-0 w-48 bg-black border border-white/20 shadow-xl z-40 flex flex-col p-1"
                            >
                                <button onClick={() => navigate('/tester-support')} className="flex items-center gap-3 px-4 py-3 text-left hover:bg-white hover:text-black transition-colors border-b border-white/10 last:border-0">
                                    <span className="material-symbols-outlined text-sm">help</span>
                                    <span className="font-mono text-xs uppercase font-bold">Support</span>
                                </button>
                                <button onClick={handleExit} className="flex items-center gap-3 px-4 py-3 text-left hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors">
                                    <span className="material-symbols-outlined text-sm">logout</span>
                                    <span className="font-mono text-xs uppercase font-bold">Exit Project</span>
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {showMenu && <div className="fixed inset-0 z-30" onClick={() => setShowMenu(false)}></div>}
                </div>
            </div>

            <div className="flex flex-col w-full px-4 pt-4">
                <div className="flex items-start gap-4 p-4 bg-black border-2 border-white/20">
                    <div className="size-16 rounded-full bg-cover bg-center shrink-0 border-2 border-primary grayscale hover:grayscale-0 transition-all" style={{ backgroundImage: `url("${artistProfile.photo}")` }}></div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-lg font-bold truncate dark:text-white font-mono uppercase">{artistProfile.name}</h2>
                            <span className="material-symbols-outlined text-blue-400 text-sm verified-badge">verified</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 leading-snug font-mono text-xs">{artistProfile.bio}</p>

                        <div className="flex flex-wrap gap-2 mt-3">
                            {Object.entries(artistProfile.socials || {}).map(([key, url]) => {
                                if (!url) return null;
                                const label = {
                                    instagram: 'IG',
                                    tiktok: 'TT',
                                    facebook: 'FB',
                                    soundcloud: 'SC',
                                    snapchat: 'SN',
                                    linktree: 'LT',
                                    discord: 'DC',
                                    twitter: 'X',
                                    website: 'WEB'
                                }[key] || key.substring(0, 2).toUpperCase();

                                return (
                                    <a
                                        key={key}
                                        href={url.startsWith('http') ? url : `https://${url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center h-6 px-1.5 border border-white/20 hover:bg-white hover:text-black hover:border-white transition-colors text-[10px] font-mono font-bold uppercase text-zinc-400"
                                    >
                                        {label}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full pt-6">
                <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-4 dark:text-white">Priority Testing</h3>
                <div className="flex w-full overflow-x-auto no-scrollbar px-4 pb-2 gap-5 snap-x">
                    {tracks.filter(t => t.active).map(track => (
                        <div key={track.id} className="snap-start flex flex-col items-center gap-3 w-20 shrink-0 cursor-pointer group" onClick={() => navigate('/tester-player', { state: { trackId: track.id } })}>
                            <div className="relative w-full aspect-square border-2 border-transparent group-hover:border-primary transition-all p-0.5">
                                <div className="w-full h-full bg-center bg-no-repeat bg-cover grayscale group-hover:grayscale-0 transition-all" style={{ backgroundImage: `url("${track.cover}")` }}></div>
                                <div className="absolute -bottom-1 -right-1 bg-primary text-black text-[10px] font-bold px-1.5 py-0.5 border border-black font-mono">NEW</div>
                            </div>
                            <p className="text-[12px] font-medium leading-tight text-center line-clamp-2 dark:text-gray-300 font-mono text-xs">{track.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col w-full pt-6">
                <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 dark:text-white">Available Tracks</h3>
                <div className="flex flex-col gap-2">
                    {tracks.filter(t => t.active).map(track => (
                        <div key={track.id} className="flex items-center gap-4 px-4 py-3 hover:bg-white/5 transition-colors group cursor-pointer border-b border-gray-100 dark:border-gray-800" onClick={() => navigate('/tester-player', { state: { trackId: track.id } })}>
                            <div className="relative shrink-0">
                                <div className="bg-center bg-no-repeat bg-cover size-14 border border-gray-200 dark:border-gray-800" style={{ backgroundImage: `url("${track.cover}")` }}></div>
                                <div className="absolute -bottom-1 -right-1 bg-black text-gray-300 text-[9px] font-bold px-1.5 py-0.5 border border-white/20 font-mono">MIX</div>
                            </div>
                            <div className="flex flex-col justify-center flex-1 min-w-0 gap-0.5">
                                <p className="text-base font-bold leading-tight truncate dark:text-white group-hover:text-primary transition-colors font-mono">{track.title}</p>
                                <p className="text-sm font-normal leading-normal text-gray-500 dark:text-gray-400 truncate font-mono text-xs">{track.version}</p>
                            </div>
                            <button className="shrink-0 flex items-center justify-center size-10 bg-primary hover:bg-primary/90 transition-transform active:scale-95 text-black border border-transparent hover:border-white">
                                <span className="material-symbols-outlined fill-current" style={{ fontSize: '20px' }}>play_arrow</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <TesterBottomNav active="listen" />
        </motion.div>
    )
}

export default TesterHome;
