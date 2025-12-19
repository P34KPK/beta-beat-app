import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useData } from '../context/DataContext';
import ArtistBottomNav from '../components/ArtistBottomNav';

const ArtistABSetup = () => {
    const navigate = useNavigate();
    const { addTrack, tracks } = useData();
    const [linkA, setLinkA] = useState('');
    const [linkB, setLinkB] = useState('');
    const [isValidA, setIsValidA] = useState(false);
    const [isValidB, setIsValidB] = useState(false);

    // Helper to convert Drive link to Direct Link
    const processLink = (url, setLink, setValid) => {
        // Regex to find ID in: drive.google.com/file/d/ID/view or ...?id=ID
        const idMatch = url.match(/\/d\/(.*?)\/|id=(.*?)(&|$)/);
        const id = idMatch ? (idMatch[1] || idMatch[2]) : null;

        if (id) {
            const directLink = `https://drive.google.com/uc?export=download&id=${id}`;
            setLink(directLink);
            setValid(true);
        } else {
            setLink(url);
            setValid(false);
        }
    };

    const handleLaunch = () => {
        if (!isValidA) {
            alert("Please enter a valid Google Drive link for Version A");
            return;
        }

        const newTrack = {
            title: `New Experiment ${tracks.length + 1}`,
            version: "v1.0 (Beta)",
            type: "A/B Test",
            cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&auto=format&fit=crop", // Abstract Cover
            active: true,
            audioUrl: linkA // The converted direct link
        };

        addTrack(newTrack);
        // Navigate to tracks list to show it's added
        navigate('/artist-tracks');
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white h-full min-h-screen flex flex-col overflow-hidden max-w-md mx-auto">
            <header className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark shrink-0 z-20">
                <button onClick={() => navigate(-1)} className="text-white/70 hover:text-primary transition-colors flex items-center justify-center size-10 rounded-full active:bg-white/10">
                    <span className="material-symbols-outlined">close</span>
                </button>
                <h2 className="text-lg font-bold tracking-tight">New Experiment</h2>
                <button
                    onClick={handleLaunch}
                    className="bg-primary hover:bg-primary/90 text-white text-sm font-bold px-5 py-2 rounded-full transition-transform active:scale-95">
                    Launch
                </button>
            </header>

            <main className="flex-1 overflow-y-auto px-4 pb-24 scrollbar-hide">
                <div className="mt-2 mb-6">
                    <div className="flex h-12 w-full items-center justify-center rounded-full bg-surface-dark p-1 border border-white/5">
                        <label className="cursor-pointer relative flex-1 h-full">
                            <input defaultChecked className="peer sr-only" name="test_type" type="radio" value="audio" />
                            <div className="flex h-full w-full items-center justify-center rounded-full text-zinc-400 text-sm font-medium transition-all peer-checked:bg-white/10 peer-checked:text-primary peer-checked:shadow-sm">
                                <span className="material-symbols-outlined text-[18px] mr-2">music_note</span>
                                <span>Audio Link</span>
                            </div>
                        </label>
                        <label className="cursor-pointer relative flex-1 h-full">
                            <input className="peer sr-only" name="test_type" type="radio" value="cover" />
                            <div className="flex h-full w-full items-center justify-center rounded-full text-zinc-400 text-sm font-medium transition-all peer-checked:bg-white/10 peer-checked:text-primary peer-checked:shadow-sm">
                                <span className="material-symbols-outlined text-[18px] mr-2">image</span>
                                <span>Cover Link</span>
                            </div>
                        </label>
                    </div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl mb-6">
                    <p className="text-xs text-blue-200 flex gap-2">
                        <span className="material-symbols-outlined text-sm shrink-0">info</span>
                        <span>Paste a <b>Google Drive Link</b> (Share {'>'} Anyone with link). It will be converted automatically for streaming.</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-8">
                    {/* Version A */}
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center px-2">
                            <span className="text-sm font-bold text-white tracking-wide">Version A (Google Drive Link)</span>
                            {isValidA && <span className="text-[10px] uppercase font-bold text-green-500 bg-green-900/30 px-2 py-0.5 rounded flex items-center gap-1"><span className="material-symbols-outlined text-[10px]">check</span>Valid</span>}
                        </div>
                        <div className={`group relative flex items-center gap-3 rounded-2xl border-2 bg-surface-dark p-2 transition-colors ${isValidA ? 'border-green-500/50' : 'border-zinc-800 focus-within:border-primary'}`}>
                            <div className="size-10 rounded-full bg-zinc-900 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-zinc-500">link</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Paste https://drive.google.com/..."
                                className="bg-transparent text-sm text-white w-full focus:outline-none placeholder-zinc-600"
                                onChange={(e) => processLink(e.target.value, setLinkA, setIsValidA)}
                            />
                        </div>
                    </div>

                    {/* Version B */}
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center px-2">
                            <span className="text-sm font-bold text-white tracking-wide">Version B (Optional)</span>
                            {isValidB && <span className="text-[10px] uppercase font-bold text-green-500 bg-green-900/30 px-2 py-0.5 rounded flex items-center gap-1"><span className="material-symbols-outlined text-[10px]">check</span>Valid</span>}
                        </div>
                        <div className={`group relative flex items-center gap-3 rounded-2xl border-2 bg-surface-dark p-2 transition-colors ${isValidB ? 'border-green-500/50' : 'border-zinc-800 focus-within:border-primary'}`}>
                            <div className="size-10 rounded-full bg-zinc-900 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-zinc-500">link</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Paste Variant Drive Link..."
                                className="bg-transparent text-sm text-white w-full focus:outline-none placeholder-zinc-600"
                                onChange={(e) => processLink(e.target.value, setLinkB, setIsValidB)}
                            />
                        </div>
                    </div>
                </div>
            </main>
            <ArtistBottomNav />
        </div>
    )
}

export default ArtistABSetup;
