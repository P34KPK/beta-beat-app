import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

const timeAgo = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return Math.floor(seconds) + "s ago";
};

const ArtistFeedback = () => {
    const navigate = useNavigate();
    const { feedback } = useData();
    return (
        <div className="relative flex h-full w-full flex-col overflow-x-hidden pb-24 max-w-md mx-auto min-h-screen">
            <header className="sticky top-0 z-40 bg-background-dark/80 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center justify-between p-4 pb-2">
                    <button onClick={() => navigate(-1)} className="text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h2 className="text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center">Feedback Feed</h2>
                    <button className="text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined outlined">tune</span>
                    </button>
                </div>
                <div className="flex gap-3 px-4 pb-4 overflow-x-auto no-scrollbar mask-gradient">
                    <button className="flex h-9 shrink-0 items-center justify-center px-5 rounded-full bg-primary shadow-[0_0_15px_rgba(242,127,13,0.3)] transition-transform active:scale-95">
                        <p className="text-white text-sm font-semibold leading-normal">All Tracks</p>
                    </button>
                    <button className="flex h-9 shrink-0 items-center justify-center px-5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-95">
                        <p className="text-white text-sm font-medium leading-normal">Newest</p>
                    </button>
                </div>
            </header>

            <div className="flex flex-col w-full">
                {feedback.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 px-4 text-center opacity-50">
                        <span className="material-symbols-outlined text-4xl mb-2">chat_bubble_outline</span>
                        <p>No feedback yet.</p>
                    </div>
                ) : (
                    feedback.slice().reverse().map((item) => (
                        <div key={item.id} className="flex w-full flex-row items-start justify-start gap-4 p-5 border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-12 h-12 shrink-0 border border-white/10 bg-surface-dark flex items-center justify-center">
                                <span className="material-symbols-outlined text-zinc-600">person</span>
                            </div>
                            <div className="flex h-full flex-1 flex-col items-start justify-start gap-1">
                                <div className="flex w-full flex-row items-start justify-between">
                                    <div className="flex flex-col">
                                        <p className="text-white text-base font-bold leading-normal tracking-wide">Tester</p>
                                        <div className="mt-1 flex items-center gap-2">
                                            <span className="bg-white/10 text-gray-300 text-[10px] uppercase font-bold px-2 py-0.5 rounded tracking-wider">{item.trackTitle}</span>
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={`material-symbols-outlined text-[12px] ${i < item.rating ? 'text-primary' : 'text-zinc-700'} filled`} style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-primary text-xs font-bold leading-normal">{timeAgo(item.date)}</p>
                                </div>
                                <p className="text-gray-300 text-sm font-normal leading-relaxed mt-2">
                                    {item.comment}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default ArtistFeedback;
