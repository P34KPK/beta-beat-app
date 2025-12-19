import { useNavigate } from 'react-router-dom';
import ArtistBottomNav from '../components/ArtistBottomNav';
import { useData } from '../context/DataContext';

const ArtistDashboard = () => {
    const navigate = useNavigate();
    const { artistProfile, tracks, inviteCode } = useData();

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
                <button className="flex items-center justify-center rounded-full size-10 bg-surface-dark border border-border-dark text-white hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-white" style={{ fontSize: '24px' }}>notifications</span>
                </button>
            </header>

            <section className="px-6 py-4">
                <div className="flex flex-wrap gap-4">
                    <div className="flex flex-1 min-w-[100px] flex-col gap-1 rounded-[2rem] bg-surface-dark border border-border-dark p-5 items-center text-center">
                        <span className="material-symbols-outlined text-primary mb-1" style={{ fontSize: '28px' }}>group</span>
                        <p className="text-white text-3xl font-bold leading-tight">{artistProfile.stats.testers}</p>
                        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Testers</p>
                    </div>
                    <div className="flex flex-1 min-w-[100px] flex-col gap-1 rounded-[2rem] bg-surface-dark border border-border-dark p-5 items-center text-center">
                        <span className="material-symbols-outlined text-primary mb-1" style={{ fontSize: '28px' }}>graphic_eq</span>
                        <p className="text-white text-3xl font-bold leading-tight">{artistProfile.stats.tracks}</p>
                        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Tracks</p>
                    </div>
                    <div className="flex flex-1 min-w-[100px] flex-col gap-1 rounded-[2rem] bg-surface-dark border border-border-dark p-5 items-center text-center">
                        <span className="material-symbols-outlined text-primary mb-1" style={{ fontSize: '28px' }}>star</span>
                        <p className="text-primary text-3xl font-bold leading-tight">{artistProfile.stats.score}</p>
                        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Score</p>
                    </div>
                </div>
            </section>

            <section className="px-6 py-2">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white text-lg font-bold">Quick Actions</h3>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                        <button onClick={handleInvite} className="flex flex-1 cursor-pointer items-center justify-center rounded-full h-14 px-6 bg-primary text-black text-base font-bold tracking-wide hover:bg-orange-600 transition-colors shadow-[0_0_20px_rgba(242,127,13,0.3)]">
                            <span className="material-symbols-outlined mr-2">person_add</span>
                            <span>Invite Testers</span>
                        </button>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => navigate('/artist-ab-setup')} className="flex flex-1 cursor-pointer items-center justify-center rounded-full h-14 px-6 bg-surface-dark border border-border-dark text-white text-base font-bold tracking-wide hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined mr-2">upload_file</span>
                            <span>New Test</span>
                        </button>
                        <button onClick={() => navigate('/artist-feedback')} className="flex flex-1 cursor-pointer items-center justify-center rounded-full h-14 px-6 bg-surface-dark border border-border-dark text-white text-base font-bold tracking-wide hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined mr-2">rate_review</span>
                            <span>Feedback</span>
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
                    <div className="bg-surface-dark border border-border-dark rounded-[2rem] p-4 flex items-center gap-4 relative overflow-hidden group">
                        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                            <span className="material-symbols-outlined text-[120px] text-white">graphic_eq</span>
                        </div>
                        <div className="relative shrink-0">
                            <div className="size-20 rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url("${tracks[0].cover}")` }}></div>
                            <div className="absolute -bottom-2 -right-2 bg-primary text-black text-[10px] font-bold px-2 py-1 rounded-full">{tracks[0].version}</div>
                        </div>
                        <div className="flex-1 min-w-0 z-10">
                            <h4 className="text-white font-bold text-lg truncate">{tracks[0].title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="material-symbols-outlined text-green-500 text-sm">new_releases</span>
                                <p className="text-slate-400 text-sm truncate">Latest Release</p>
                            </div>
                        </div>
                        <button className="size-10 rounded-full bg-white text-black flex items-center justify-center shrink-0 hover:scale-105 transition-transform">
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
