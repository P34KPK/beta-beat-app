import { useNavigate } from 'react-router-dom';
import ArtistBottomNav from '../components/ArtistBottomNav';
import { useData } from '../context/DataContext';

const ArtistTracks = () => {
    const navigate = useNavigate();
    const { tracks } = useData();

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden mx-auto max-w-md bg-black shadow-2xl pb-32">
            <header className="sticky top-0 z-20 flex items-center bg-black/90 backdrop-blur-md p-4 pb-2 justify-between border-b border-white/10">
                <button onClick={() => navigate(-1)} className="text-white hover:text-primary transition-colors flex size-10 shrink-0 items-center justify-center rounded-full active:bg-white/10">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <h2 className="text-white text-xl font-bold leading-tight tracking-wide text-center flex-1">Manage Tracks</h2>
                <button className="flex size-10 items-center justify-center text-white/60 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-2xl">help</span>
                </button>
            </header>

            <main className="flex-1 flex flex-col overflow-y-auto no-scrollbar">
                <div className="sticky top-[60px] z-10 bg-black pt-4 pb-4 px-4">
                    <div className="flex h-12 w-full items-center justify-center rounded-full bg-surface-dark p-1 border border-white/10">
                        <label className="group flex cursor-pointer h-full flex-1 items-center justify-center overflow-hidden rounded-full px-2 has-[:checked]:bg-primary has-[:checked]:shadow-md transition-all duration-300">
                            <span className="truncate text-sm font-semibold text-white/60 group-has-[:checked]:text-black transition-colors">Singles</span>
                            <input defaultChecked className="invisible w-0 h-0 absolute" name="track_type" type="radio" />
                        </label>
                        <label className="group flex cursor-pointer h-full flex-1 items-center justify-center overflow-hidden rounded-full px-2 has-[:checked]:bg-primary has-[:checked]:shadow-md transition-all duration-300">
                            <span className="truncate text-sm font-semibold text-white/60 group-has-[:checked]:text-black transition-colors">EPs</span>
                            <input className="invisible w-0 h-0 absolute" name="track_type" type="radio" />
                        </label>
                        <label className="group flex cursor-pointer h-full flex-1 items-center justify-center overflow-hidden rounded-full px-2 has-[:checked]:bg-primary has-[:checked]:shadow-md transition-all duration-300">
                            <span className="truncate text-sm font-semibold text-white/60 group-has-[:checked]:text-black transition-colors">Albums</span>
                            <input className="invisible w-0 h-0 absolute" name="track_type" type="radio" />
                        </label>
                    </div>
                </div>

                <div className="flex flex-col gap-1 px-2">
                    {tracks.map(track => (
                        <div key={track.id} className="group relative flex flex-col gap-3 rounded-2xl p-3 hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                            <div className="flex items-center gap-4 justify-between">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="shrink-0 relative">
                                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-xl size-16 shadow-inner ring-1 ring-white/10" style={{ backgroundImage: `url("${track.cover}")` }}></div>
                                        <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-0.5">
                                            <span className="material-symbols-outlined text-[14px] text-primary bg-white/10 rounded-full p-0.5">music_note</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center min-w-0">
                                        <p className="text-white text-base font-bold leading-tight truncate">{track.title}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs font-mono bg-white/10 text-white/70 px-1.5 py-0.5 rounded">{track.version}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="shrink-0 flex items-center gap-3">
                                    <label className="relative flex h-[28px] w-[48px] cursor-pointer items-center rounded-full border-2 border-transparent bg-neutral-800 transition-colors has-[:checked]:bg-primary has-[:checked]:border-primary">
                                        <input defaultChecked={track.active} className="peer sr-only" type="checkbox" />
                                        <span className="h-5 w-5 rounded-full bg-white shadow-sm transition-all peer-checked:translate-x-5"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-2 border-t border-white/5 pt-2 mt-1">
                                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary text-white/60 text-xs font-medium transition-all group/btn">
                                    <span className="material-symbols-outlined text-[16px] group-hover/btn:text-primary transition-colors">edit</span>
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <div className="fixed bottom-[88px] left-0 right-0 px-4 z-30 max-w-md mx-auto pointer-events-none">
                <button className="pointer-events-auto w-full bg-primary hover:bg-white/90 active:bg-white/80 text-black font-bold h-14 rounded-full shadow-[0_4px_14px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2 transition-transform active:scale-[0.98]">
                    <span className="material-symbols-outlined">add</span>
                    Add New Track
                </button>
            </div>

            <ArtistBottomNav active="tracks" />
        </div>
    )
}

export default ArtistTracks;
