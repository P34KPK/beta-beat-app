import { useNavigate } from 'react-router-dom';
import ArtistBottomNav from '../components/ArtistBottomNav';
import { useData } from '../context/DataContext';

const ArtistDashboard = () => {
    const navigate = useNavigate();
    const { artistProfile } = useData();

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
                        <button className="flex flex-1 cursor-pointer items-center justify-center rounded-full h-14 px-6 bg-primary text-black text-base font-bold tracking-wide hover:bg-orange-600 transition-colors shadow-[0_0_20px_rgba(242,127,13,0.3)]">
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
                    <a className="text-primary text-sm font-semibold hover:text-white transition-colors" href="#">View Analytics</a>
                </div>
                <div className="bg-surface-dark border border-border-dark rounded-[2rem] p-4 flex items-center gap-4 relative overflow-hidden group">
                    <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                        <span className="material-symbols-outlined text-[120px] text-white">graphic_eq</span>
                    </div>
                    <div className="relative shrink-0">
                        <div className="size-20 rounded-2xl bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBwbBzk3wRUp7hkB9bkIT2dasHHF_yl6Js6DTqaYnDySsG4SbFTTez34BS8ckbVDEDYmZ67L8p57_pbfCNMYecgupadqsmK2OnL6ks1jlUFM2DCaEuwcWe_siDwt8qaNN5SB2vfq5CT0D0kRVs378MhcKJlzzY1ocO6A0ZBYuICrDkT6ydt5cL-mxobhVG-HQpz5bEr_aeztrSYwXO9Z80N8zslWUojIGK1rI68QbcLhTIVcDwpWzYRO5sly_pmO91p_WkGGaHlLKPc")' }}></div>
                        <div className="absolute -bottom-2 -right-2 bg-primary text-black text-[10px] font-bold px-2 py-1 rounded-full">BETA v2</div>
                    </div>
                    <div className="flex-1 min-w-0 z-10">
                        <h4 className="text-white font-bold text-lg truncate">Midnight City (Demo)</h4>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="material-symbols-outlined text-primary text-sm">trending_up</span>
                            <p className="text-slate-400 text-sm truncate">Trending among Top Testers</p>
                        </div>
                    </div>
                    <button className="size-10 rounded-full bg-white text-black flex items-center justify-center shrink-0 hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined filled" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                    </button>
                </div>
            </section>

            <ArtistBottomNav active="home" />
        </div>
    );
};

export default ArtistDashboard;
