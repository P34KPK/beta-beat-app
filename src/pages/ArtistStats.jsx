import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import ArtistBottomNav from '../components/ArtistBottomNav';

const ArtistStats = () => {
    const navigate = useNavigate();
    const { tracks, testerSessions, testerStats } = useData();

    // Group sessions by Track
    const trackStats = tracks.map(track => {
        const sessions = testerSessions.filter(s => s.trackId === track.id || (track.isAlbum && track.trackList.some(t => t.title === s.trackTitle))); // Simplified matching for Album tracks
        const uniqueTesters = new Set(sessions.map(s => s.testerId)).size;
        const totalPlays = sessions.length;
        const completions = sessions.filter(s => s.completed).length;
        const completionRate = totalPlays > 0 ? Math.round((completions / totalPlays) * 100) : 0;

        return {
            ...track,
            uniqueTesters,
            totalPlays,
            completionRate
        };
    });

    // Group sessions by Tester
    const uniqueSessionTesters = [...new Set(testerSessions.map(s => s.testerId))];
    const testerStatsList = uniqueSessionTesters.map(testerId => {
        const sessions = testerSessions.filter(s => s.testerId === testerId);
        return {
            id: testerId,
            plays: sessions.length,
            completed: sessions.filter(s => s.completed).length,
            tracks: [...new Set(sessions.map(s => s.trackTitle))].join(', ')
        };
    });

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white h-full min-h-screen flex flex-col overflow-hidden max-w-md mx-auto">
            <header className="flex items-center justify-between p-6 pb-2 shrink-0 z-20">
                <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
            </header>

            <main className="flex-1 overflow-y-auto px-6 pb-24 scrollbar-hide">

                {/* Overview Cards */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-surface-dark p-4 rounded-2xl border border-white/5">
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">Total Plays</p>
                        <p className="text-3xl font-bold text-white">{testerSessions.length}</p>
                    </div>
                    <div className="bg-surface-dark p-4 rounded-2xl border border-white/5">
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">Active Testers</p>
                        <p className="text-3xl font-bold text-primary">{uniqueSessionTesters.length}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    {/* Track Performance */}
                    <section>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">equalizer</span>
                            Track Performance
                        </h3>
                        <div className="flex flex-col gap-3">
                            {trackStats.map(track => (
                                <div key={track.id} className="bg-surface-dark p-4 rounded-xl border border-white/5 flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: `url("${track.cover}")` }}></div>
                                            <div>
                                                <p className="font-bold text-sm leading-tight line-clamp-1">{track.title}</p>
                                                <p className="text-xs text-zinc-500">{track.version}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-white">{track.totalPlays}</p>
                                            <p className="text-[10px] text-zinc-500 uppercase">Plays</p>
                                        </div>
                                    </div>
                                    {/* Completion Bar */}
                                    <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden flex">
                                        <div className="h-full bg-green-500" style={{ width: `${track.completionRate}%` }}></div>
                                    </div>
                                    <div className="flex justify-between text-[10px] text-zinc-400 font-medium">
                                        <span>{track.uniqueTesters} Testers</span>
                                        <span className={track.completionRate > 80 ? "text-green-500" : "text-yellow-500"}>{track.completionRate}% Completion Rate</span>
                                    </div>
                                </div>
                            ))}
                            {trackStats.length === 0 && <p className="text-zinc-500 text-sm italic">No tracks yet.</p>}
                        </div>
                    </section>

                    {/* Tester Leaderboard */}
                    <section>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-yellow-500">trophy</span>
                            Top Testers
                        </h3>
                        <div className="flex flex-col gap-2">
                            {testerStatsList.map((tester, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-surface-dark/50 border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">
                                            {tester.id.substring(0, 2)}
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-sm font-bold text-white">{tester.id}</p>
                                            <p className="text-[10px] text-zinc-500 line-clamp-1 max-w-[150px]">Listened: {tester.tracks}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-bold text-primary">{tester.plays} Plays</span>
                                    </div>
                                </div>
                            ))}
                            {testerStatsList.length === 0 && <p className="text-zinc-500 text-sm italic">No data yet. Share your link!</p>}
                        </div>
                    </section>
                </div>

            </main>
            <ArtistBottomNav active="analytics" />
        </div>
    )
}

export default ArtistStats;
