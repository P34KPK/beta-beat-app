import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ArtistBottomNav from '../components/ArtistBottomNav';
import { useData } from '../context/DataContext';

const ArtistDashboard = () => {
    const navigate = useNavigate();
    const { artistProfile, tracks, inviteCode } = useData();
    const [showInviteCard, setShowInviteCard] = useState(false);

    const handleInvite = async () => {
        const url = `${window.location.origin}/tester-access`;
        const text = `Yo! Help me test my new music on BETA BEAT.\n\nCode: ${inviteCode}\nLink: ${url}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'BETA BEAT Music Test',
                    text: text,
                    url: url
                });
            } catch (err) {
                console.log('Share canceled', err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(text);
                alert("Invite copied to clipboard!\n\nSend it to your friends.");
            } catch (err) {
                alert("Could not copy invite. Code: " + inviteCode);
            }
        }
    };

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto shadow-2xl pb-24">
            {/* VIP Card Modal */}
            {showInviteCard && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6" onClick={() => setShowInviteCard(false)}>
                    <div className="w-full max-w-sm bg-surface-dark border border-white/10 overflow-hidden relative shadow-[0_0_50px_rgba(255,255,255,0.1)] animate-in fade-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
                        {/* Status Bar Decor - Monochrome */}
                        <div className="h-1 w-full bg-white"></div>

                        <div className="p-8 flex flex-col items-center text-center relative">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none"></div>

                            {/* Brand - Dominant */}
                            <div className="mb-8 relative w-full flex justify-center mt-4">
                                <div className="absolute inset-0 bg-white/5 blur-[60px] rounded-full transform scale-150"></div>
                                <img src="/beta-beat-logo.png" alt="BETA BEAT" className="relative w-48 object-contain opacity-90 grayscale contrast-125" />
                            </div>

                            <p className="text-zinc-500 font-mono text-[10px] font-bold uppercase tracking-[0.3em] mb-8">Official Invitation</p>

                            {/* Artist Section - Inline - Monochrome */}
                            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full pr-6 pl-2 py-2 mb-8 backdrop-blur-md">
                                <div className="size-12 border border-white shadow-lg relative shrink-0 grayscale" style={{ borderRadius: '50%' }}>
                                    <img src={artistProfile.photo} alt="Artist" className="w-full h-full object-cover" style={{ borderRadius: '50%' }} />
                                </div>
                                <div className="text-left">
                                    <h2 className="text-lg font-bold text-white leading-none uppercase">{artistProfile.name}</h2>
                                    <p className="text-zinc-400 text-[10px] font-medium mt-0.5">Invites you to beta test</p>
                                </div>
                            </div>

                            {/* Code Badge - Monochrome */}
                            <div className="w-full bg-black border border-white/20 p-4 mb-6">
                                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Access Code</p>
                                <p className="text-2xl font-mono font-bold text-white tracking-widest">{inviteCode}</p>
                            </div>

                            {/* Action Buttons - Monochrome */}
                            <button onClick={handleInvite} className="w-full py-3 bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-lg">share</span>
                                Share Invite
                            </button>

                            <p className="text-[10px] text-zinc-600 font-mono">beta-beat-app.vercel.app</p>

                            <button onClick={() => setShowInviteCard(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        {/* Footer */}
                        <div className="bg-white/5 p-3 text-center">
                            <p className="text-[10px] text-zinc-500">Screenshot to share • VIP Access Only</p>
                        </div>
                    </div>
                </div>
            )}

            <header className="flex items-center px-6 pt-12 pb-4 justify-between bg-transparent sticky top-0 z-10 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary" style={{ backgroundImage: `url("${artistProfile.photo}")` }}></div>
                        <div className="absolute bottom-0 right-0 size-3 bg-primary rounded-full border-2 border-background-dark"></div>
                    </div>
                    <div>
                        <h2 className="text-white text-xl font-bold leading-tight">Hello, {artistProfile.name}</h2>
                        <p className="text-slate-400 text-xs">Let's check your stats</p>
                    </div>
                </div>
                <button className="flex items-center justify-center size-10 bg-surface-dark border border-border-dark text-white hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-white" style={{ fontSize: '24px' }}>notifications</span>
                </button>
            </header>

            <section className="px-6 py-4">
                <div className="flex flex-wrap gap-4">
                    <div className="flex flex-1 min-w-[100px] flex-col gap-1 bg-surface-dark border border-border-dark p-5 items-center text-center">
                        <span className="material-symbols-outlined text-primary mb-1" style={{ fontSize: '28px' }}>group</span>
                        <p className="text-white text-3xl font-mono font-bold leading-tight">{artistProfile.stats.testers}</p>
                        <p className="text-slate-400 text-xs font-mono font-medium uppercase tracking-wider">Testers</p>
                    </div>
                    <div className="flex flex-1 min-w-[100px] flex-col gap-1 bg-surface-dark border border-border-dark p-5 items-center text-center">
                        <span className="material-symbols-outlined text-primary mb-1" style={{ fontSize: '28px' }}>graphic_eq</span>
                        <p className="text-white text-3xl font-mono font-bold leading-tight">{artistProfile.stats.tracks}</p>
                        <p className="text-slate-400 text-xs font-mono font-medium uppercase tracking-wider">Tracks</p>
                    </div>
                    <div className="flex flex-1 min-w-[100px] flex-col gap-1 bg-surface-dark border border-border-dark p-5 items-center text-center">
                        <span className="material-symbols-outlined text-primary mb-1" style={{ fontSize: '28px' }}>star</span>
                        <p className="text-primary text-3xl font-mono font-bold leading-tight">{artistProfile.stats.score}</p>
                        <p className="text-slate-400 text-xs font-mono font-medium uppercase tracking-wider">Score</p>
                    </div>
                </div>
            </section>

            <section className="px-6 py-2">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white text-lg font-bold">Quick Actions</h3>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                        <button onClick={handleInvite} className="flex flex-1 cursor-pointer items-center justify-center h-14 px-6 bg-primary text-black text-base font-bold tracking-wide hover:bg-orange-600 transition-colors shadow-[0_0_20px_rgba(242,127,13,0.3)]">
                            <span className="material-symbols-outlined mr-2">person_add</span>
                            <span className="font-mono uppercase">Invite</span>
                        </button>
                        <button onClick={() => setShowInviteCard(true)} className="flex cursor-pointer items-center justify-center h-14 w-14 bg-surface-dark border border-border-dark text-white hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined text-primary">qr_code_2</span>
                        </button>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => navigate('/artist-feedback')} className="flex flex-1 cursor-pointer items-center justify-center h-14 px-6 bg-surface-dark border border-border-dark text-white text-base font-bold tracking-wide hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined mr-2">rate_review</span>
                            <span className="font-mono uppercase">Feedback</span>
                        </button>
                    </div>
                </div>
            </section>

            <section className="px-6 py-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white text-lg font-bold">Trending Track</h3>
                    {tracks.length > 0 && <a className="text-primary text-sm font-semibold hover:text-white transition-colors" href="#" onClick={(e) => { e.preventDefault(); navigate('/artist-tracks'); }}>View All</a>}
                </div>
                {artistProfile.stats.tracks > 0 && tracks[0] ? (
                    <div className="bg-surface-dark border border-border-dark p-4 flex items-center gap-4 relative overflow-hidden group">
                        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                            <span className="material-symbols-outlined text-[120px] text-white">graphic_eq</span>
                        </div>
                        <div className="relative shrink-0">
                            <div className="size-20 bg-cover bg-center" style={{ backgroundImage: `url("${tracks[0].cover}")` }}></div>
                            <div className="absolute -bottom-2 -right-2 bg-primary text-black text-[10px] font-mono font-bold px-2 py-1 border border-black">{tracks[0].version}</div>
                        </div>
                        <div className="flex-1 min-w-0 z-10">
                            <h4 className="text-white font-bold text-lg truncate">{tracks[0].title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="material-symbols-outlined text-green-500 text-sm">new_releases</span>
                                <p className="text-slate-400 text-sm truncate">Latest Release</p>
                            </div>
                        </div>
                        <button className="size-10 bg-white text-black flex items-center justify-center shrink-0 hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined filled" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                        </button>
                    </div>
                ) : (
                    <div className="bg-surface-dark/50 border border-white/5 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center gap-2">
                        <div className="bg-white/5 p-3 rounded-full mb-1">
                            <span className="material-symbols-outlined text-zinc-500">music_off</span>
                        </div>
                        <p className="text-zinc-400 text-sm font-medium">No tracks trending yet.</p>
                        <button onClick={() => navigate('/artist-ab-setup')} className="text-primary text-xs font-bold uppercase tracking-wider hover:text-white transition-colors mt-2">
                            Available to Upload
                        </button>
                    </div>
                )}
            </section>

            <ArtistBottomNav active="home" />
        </div>
    );
};

export default ArtistDashboard;
