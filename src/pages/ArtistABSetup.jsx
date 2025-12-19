import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useData } from '../context/DataContext';
import ArtistBottomNav from '../components/ArtistBottomNav';

const ArtistABSetup = () => {
    const navigate = useNavigate();
    const { addTrack, tracks } = useData();

    // Modes: 'single' (Default) or 'album'
    const [mode, setMode] = useState('single');

    // Single Mode States
    const [linkA, setLinkA] = useState('');
    const [linkB, setLinkB] = useState('');
    const [isValidA, setIsValidA] = useState(false);
    const [isValidB, setIsValidB] = useState(false);

    // Album Mode States
    const [albumTitle, setAlbumTitle] = useState('');
    const [albumCover, setAlbumCover] = useState('');
    const [albumTracks, setAlbumTracks] = useState([{ id: 1, title: '', url: '', valid: false }]);

    // Helper to convert Drive link to Direct Link
    const processLink = (url) => {
        const idMatch = url.match(/\/d\/(.*?)\/|id=(.*?)(&|$)/);
        const id = idMatch ? (idMatch[1] || idMatch[2]) : null;
        return id ? `https://drive.google.com/uc?export=download&id=${id}` : null;
    };

    const handleSingleLinkChange = (url, setLink, setValid) => {
        const direct = processLink(url);
        if (direct) {
            setLink(direct);
            setValid(true);
        } else {
            setLink(url);
            setValid(false);
        }
    };

    // Album Helpers
    const addAlbumTrack = () => {
        setAlbumTracks([...albumTracks, { id: Date.now(), title: '', url: '', valid: false }]);
    };

    const removeAlbumTrack = (id) => {
        setAlbumTracks(albumTracks.filter(t => t.id !== id));
    };

    const updateAlbumTrack = (id, field, value) => {
        setAlbumTracks(albumTracks.map(t => {
            if (t.id !== id) return t;
            if (field === 'url') {
                const direct = processLink(value);
                return { ...t, url: direct || value, valid: !!direct };
            }
            return { ...t, [field]: value };
        }));
    };

    const moveTrackUp = (index) => {
        if (index === 0) return;
        const newTracks = [...albumTracks];
        [newTracks[index - 1], newTracks[index]] = [newTracks[index], newTracks[index - 1]];
        setAlbumTracks(newTracks);
    };

    const moveTrackDown = (index) => {
        if (index === albumTracks.length - 1) return;
        const newTracks = [...albumTracks];
        [newTracks[index + 1], newTracks[index]] = [newTracks[index], newTracks[index + 1]];
        setAlbumTracks(newTracks);
    };

    const handleLaunch = () => {
        if (mode === 'single') {
            if (!isValidA) {
                alert("Please enter a valid Google Drive link for Version A");
                return;
            }
            const newTrack = {
                title: `Experiment ${tracks.length + 1}`,
                version: "v1.0",
                type: "Single",
                cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&auto=format&fit=crop",
                active: true,
                audioUrl: linkA,
                isAlbum: false
            };
            addTrack(newTrack);
        } else {
            // Album Launch
            if (!albumTitle) { alert("Please enter an Album Title"); return; }
            if (albumTracks.some(t => !t.valid || !t.title)) { alert("Please ensure all tracks have titles and valid Drive links"); return; }

            const newAlbum = {
                title: albumTitle,
                version: "EP/Album",
                type: "Album",
                cover: albumCover || "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=300&auto=format&fit=crop",
                active: true,
                isAlbum: true,
                trackList: albumTracks.map(t => ({ title: t.title, audioUrl: t.url }))
            };
            addTrack(newAlbum);
        }
        navigate('/artist-dashboard'); // Go back to dashboard to see "Trending" (latest)
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white h-full min-h-screen flex flex-col overflow-hidden max-w-md mx-auto">
            <header className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark shrink-0 z-20">
                <button onClick={() => navigate(-1)} className="text-white/70 hover:text-primary transition-colors flex items-center justify-center size-10 rounded-full active:bg-white/10">
                    <span className="material-symbols-outlined">close</span>
                </button>
                <div className="flex bg-surface-dark rounded-full p-1 border border-white/5">
                    <button
                        onClick={() => setMode('single')}
                        className={`text-xs font-bold px-4 py-1.5 rounded-full transition-all ${mode === 'single' ? 'bg-primary text-black' : 'text-zinc-400 hover:text-white'}`}>
                        Single
                    </button>
                    <button
                        onClick={() => setMode('album')}
                        className={`text-xs font-bold px-4 py-1.5 rounded-full transition-all ${mode === 'album' ? 'bg-primary text-black' : 'text-zinc-400 hover:text-white'}`}>
                        Album / EP
                    </button>
                </div>
                <button
                    onClick={handleLaunch}
                    className="bg-primary hover:bg-primary/90 text-black text-sm font-bold px-5 py-2 rounded-full transition-transform active:scale-95">
                    Launch
                </button>
            </header>

            <main className="flex-1 overflow-y-auto px-4 pb-24 scrollbar-hide">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl mb-6">
                    <p className="text-xs text-blue-200 flex gap-2">
                        <span className="material-symbols-outlined text-sm shrink-0">info</span>
                        <span>Paste <b>Google Drive Links</b> (Share {'>'} People with link). They auto-convert.</span>
                    </p>
                </div>

                {mode === 'single' ? (
                    <div className="grid grid-cols-1 gap-6 mb-8">
                        {/* Version A */}
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center px-2">
                                <span className="text-sm font-bold text-white tracking-wide">Version A (Drive Link)</span>
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
                                    onChange={(e) => handleSingleLinkChange(e.target.value, setLinkA, setIsValidA)}
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
                                    onChange={(e) => handleSingleLinkChange(e.target.value, setLinkB, setIsValidB)}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {/* Album Info */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-white ml-1">Album Title</label>
                            <input
                                type="text"
                                placeholder="E.g. Summer Vibes EP"
                                className="w-full bg-surface-dark border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none"
                                value={albumTitle}
                                onChange={(e) => setAlbumTitle(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-bold text-white">Cover Art Link (Optional)</label>
                                {albumCover && albumCover.includes('drive.google.com') && <span className="text-[10px] uppercase font-bold text-green-500 bg-green-900/30 px-2 py-0.5 rounded flex items-center gap-1"><span className="material-symbols-outlined text-[10px]">check</span>Drive Link</span>}
                            </div>
                            <div className={`flex items-center gap-2 bg-surface-dark border rounded-xl px-4 py-3 transition-colors ${albumCover && albumCover.includes('drive.google.com') ? 'border-green-500/50' : 'border-zinc-700 focus-within:border-primary'}`}>
                                <span className="material-symbols-outlined text-zinc-500">image</span>
                                <input
                                    type="text"
                                    placeholder="Paste Drive Link or Image URL"
                                    className="w-full bg-transparent text-white focus:outline-none text-sm placeholder-zinc-600"
                                    value={albumCover}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        const direct = processLink(val);
                                        setAlbumCover(direct || val);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                            <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Tracklist</label>
                            <button onClick={addAlbumTrack} className="text-primary text-xs font-bold flex items-center gap-1 hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-sm">add</span> Add Track
                            </button>
                        </div>

                        <div className="flex flex-col gap-3">
                            {albumTracks.map((track, index) => (
                                <div key={track.id} className="bg-surface-dark p-3 rounded-xl border border-zinc-800 flex flex-col gap-3 relative animate-fadeIn">
                                    <div className="flex items-center gap-2">
                                        <div className="flex flex-col text-zinc-600">
                                            <button onClick={() => moveTrackUp(index)} disabled={index === 0} className="hover:text-white disabled:opacity-30 disabled:hover:text-zinc-600">
                                                <span className="material-symbols-outlined text-sm">expand_less</span>
                                            </button>
                                            <button onClick={() => moveTrackDown(index)} disabled={index === albumTracks.length - 1} className="hover:text-white disabled:opacity-30 disabled:hover:text-zinc-600">
                                                <span className="material-symbols-outlined text-sm">expand_more</span>
                                            </button>
                                        </div>
                                        <span className="text-zinc-500 text-xs font-mono w-4 text-center">{index + 1}</span>
                                        <input
                                            type="text"
                                            placeholder="Track Title"
                                            className="flex-1 bg-transparent text-white font-bold placeholder-zinc-600 focus:outline-none"
                                            value={track.title}
                                            onChange={(e) => updateAlbumTrack(track.id, 'title', e.target.value)}
                                        />
                                        {albumTracks.length > 1 && (
                                            <button onClick={() => removeAlbumTrack(track.id)} className="text-zinc-500 hover:text-red-400 ml-2">
                                                <span className="material-symbols-outlined text-lg">delete</span>
                                            </button>
                                        )}
                                    </div>
                                    <div className={`flex items-center gap-2 bg-black/30 rounded-lg px-2 py-1.5 border ${track.valid ? 'border-green-500/30' : 'border-transparent'} ml-8`}>
                                        <span className={`material-symbols-outlined text-sm ${track.valid ? 'text-green-500' : 'text-zinc-600'}`}>link</span>
                                        <input
                                            type="text"
                                            placeholder="Paste Drive Link..."
                                            className="flex-1 bg-transparent text-xs text-zinc-300 focus:outline-none"
                                            onChange={(e) => updateAlbumTrack(track.id, 'url', e.target.value)}
                                        />
                                        {track.valid && <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={addAlbumTrack} className="w-full py-3 rounded-xl border border-dashed border-zinc-700 text-zinc-400 text-sm font-medium hover:text-white hover:border-zinc-500 transition-colors">
                            + Add Another Track
                        </button>
                    </div>
                )}
            </main>
            <ArtistBottomNav />
        </div>
    )
}

export default ArtistABSetup;
