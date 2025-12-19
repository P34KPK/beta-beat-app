import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useData } from '../context/DataContext';
import TesterBottomNav from '../components/TesterBottomNav';

const TesterFeedback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { tracks, addFeedback } = useData();

    // Get passed state
    const { trackId, timestamp } = location.state || {};
    const track = tracks.find(t => t.id === trackId);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSubmit = () => {
        if (rating === 0) {
            alert("Please provide a star rating!");
            return;
        }

        const newFeedback = {
            trackId: trackId,
            rating: rating,
            comment: comment,
            timestamp: timestamp || 0,
            trackTitle: track?.title || "Unknown Track"
        };

        addFeedback(newFeedback);

        // Show success and navigate back
        alert("Thanks for your feedback!");
        navigate('/tester-home');
    };

    if (!track) {
        return (
            <div className="flex items-center justify-center h-screen bg-background-light dark:bg-background-dark text-white">
                <p>Track not found.</p>
                <button onClick={() => navigate('/tester-home')} className="ml-4 text-primary">Go Home</button>
            </div>
        );
    }

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-24 max-w-md mx-auto bg-background-light dark:bg-background-dark">
            <header className="flex items-center justify-between p-4 pb-2 sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
                <button onClick={() => navigate(-1)} className="flex size-10 shrink-0 items-center justify-center rounded-full active:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-2xl text-slate-900 dark:text-white">arrow_back</span>
                </button>
                <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10 text-slate-900 dark:text-white">{track.title}</h2>
            </header>

            <main className="flex-1 flex flex-col gap-6 px-5 pt-2">
                <div className="flex flex-col gap-5 items-center mt-2">
                    <div className="w-full max-w-[340px] aspect-square rounded-[2rem] bg-surface-dark shadow-[0_20px_40px_-10px_rgba(242,127,13,0.15)] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${track.cover}")` }}>
                        </div>
                    </div>
                </div>

                <div className="h-px w-full bg-gray-200 dark:bg-surface-dark my-2"></div>

                <div className="flex flex-col gap-5 w-full max-w-[340px] mx-auto">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Rate this Version</h3>
                        <div className="flex gap-3">
                            {[1, 2, 3, 4, 5].map(i => (
                                <button key={i} onClick={() => setRating(i)} className="group focus:outline-none transition-transform active:scale-90">
                                    <span className={`material-symbols-outlined text-4xl transition-colors ${i <= rating ? 'text-primary fill-current font-[font-variation-settings:"FILL"1]' : 'text-gray-300 dark:text-surface-dark hover:text-primary'}`}>
                                        star
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
                            <span>Timestamped Comment</span>
                            <span className="text-xs font-normal text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">timer</span>
                                Auto-tagging
                            </span>
                        </label>
                        <div className="relative group">
                            <div className="absolute top-4 left-4 z-10">
                                <span className="inline-flex items-center justify-center rounded bg-primary text-[10px] font-bold text-white px-1.5 py-0.5 h-5 font-mono shadow-sm">
                                    {formatTime(timestamp)}
                                </span>
                            </div>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full h-32 rounded-2xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-transparent focus:border-primary/50 text-slate-900 dark:text-white placeholder-gray-400 dark:placeholder-[#888888] p-4 pt-12 text-sm leading-relaxed resize-none focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all shadow-sm"
                                placeholder="Start typing to add a note at this timestamp..."
                            ></textarea>
                        </div>
                    </div>
                    <button onClick={handleSubmit} className="w-full py-4 rounded-full bg-primary text-white font-bold text-base shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mb-4">
                        Submit Feedback
                        <span className="material-symbols-outlined text-xl">send</span>
                    </button>
                </div>
            </main>
            <TesterBottomNav active="feedback" />
        </div>
    )
}

export default TesterFeedback;
