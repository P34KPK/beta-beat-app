import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TesterBottomNav from '../components/TesterBottomNav';
import { useData } from '../context/DataContext';

const TesterPlayer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { tracks, logSession, artistProfile } = useData();
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    // Waveform visualization data
    const [waveformData] = useState(() => Array.from({ length: 45 }, () => Math.random() * 0.5 + 0.3));
    const [hasLogged, setHasLogged] = useState(false); // Prevent double logging

    // State definitions
    const audioRef = useRef(null);
    const canvasRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);
    const [showUI, setShowUI] = useState(true);
    const [audioError, setAudioError] = useState(null);
    const [showPlaylist, setShowPlaylist] = useState(false);

    // Resolve Track
    const trackId = location.state?.trackId;
    const track = tracks.find(t => t.id === trackId) || tracks[0];

    useEffect(() => {
        if (!track) navigate('/tester-home');
    }, [track, navigate]);

    if (!track) return null;

    const rawAudioUrl = track?.isAlbum
        ? track.trackList[currentTrackIndex]?.audioUrl
        : track?.audioUrl;

    const currentAudioUrl = rawAudioUrl;

    const currentTitle = track?.isAlbum
        ? track.trackList[currentTrackIndex]?.title
        : track?.title;

    // Helper Functions
    const formatTime = (time) => {
        if (!time || isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const vibrate = (ms = 10) => {
        if (navigator.vibrate) navigator.vibrate(ms);
    };

    const handleSeek = (newTime) => {
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = newTime;
            setCurrentTime(newTime);
            setProgress((newTime / duration) * 100);
        }
    };

    // Audio Logic
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
            setProgress((audio.currentTime / audio.duration) * 100);
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
            if (isPlaying) audio.play().catch(e => console.error("Auto-play failed:", e));
        };

        const handleEnded = () => {
            if (!hasLogged) {
                logSession({
                    trackId: track.id,
                    trackTitle: currentTitle,
                    durationListened: audio.duration,
                    totalDuration: audio.duration,
                    completed: true,
                    timestamp: new Date().toISOString(),
                    testerId: sessionStorage.getItem('testerId') || 'Anonymous'
                });
                setHasLogged(true);
            }

            if (track.isAlbum && currentTrackIndex < track.trackList.length - 1) {
                setCurrentTrackIndex(prev => prev + 1);
            } else {
                setIsPlaying(false);
                setShowUI(true);
                setProgress(0);
                setCurrentTime(0);
            }
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);

        if (isPlaying) {
            audio.play().catch(e => console.error("Play failed:", e));
        } else {
            audio.pause();
        }

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [isPlaying, currentTrackIndex, track, currentTitle, hasLogged]);

    // Reset progress when track changes
    useEffect(() => {
        setProgress(0);
        setCurrentTime(0);
        if (isPlaying) {
            const audio = audioRef.current;
            if (audio) audio.play();
        }
    }, [currentTrackIndex]);


    // ...

    return (
        <div className="relative flex h-screen w-full flex-col bg-gradient-to-b from-zinc-900 via-black to-black text-white font-display overflow-y-auto no-scrollbar">
            {/* Top Bar / Drag Handle */}
            <div className="w-full h-14 flex items-center justify-center shrink-0 z-10 opacity-50">
                <div className="w-12 h-1 bg-white/20 rounded-full"></div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center px-8 pb-8 gap-8 w-full max-w-md mx-auto">

                {/* Cover Art - Enhanced Shadow */}
                <div className="w-full aspect-square relative shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 ring-1 ring-white/10">
                    <img src={track?.cover} alt={currentTitle} className="w-full h-full object-cover" />
                </div>

                {/* Track Info */}
                <div className="w-full text-center space-y-1">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight truncate px-2 text-white">{currentTitle}</h1>
                    <p className="text-zinc-400 text-sm font-medium tracking-wide uppercase opacity-80">
                        {track?.isAlbum ? `${artistProfile.name} • ${track.title}` : artistProfile.name}
                    </p>
                </div>

                {/* Progress Bar & Time (Cleaner than Waveform) */}
                <div className="w-full space-y-2 mt-4">
                    <div
                        className="group relative h-4 w-full flex items-center cursor-pointer"
                        onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const pct = (e.clientX - rect.left) / rect.width;
                            handleSeek(pct * duration);
                        }}
                    >
                        {/* Track Line */}
                        <div className="absolute inset-0 h-1 my-auto bg-white/20 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white transition-all duration-100 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        {/* Drag Knob (Visible on Hover) */}
                        <div
                            className="absolute h-3 w-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
                        />
                    </div>

                    <div className="flex justify-between text-[11px] font-medium text-zinc-500 font-mono tracking-wider px-1">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                {/* Main Controls - Refined */}
                <div className="flex items-center justify-center gap-8 w-full mt-2">
                    <button className="text-zinc-500 hover:text-white transition-colors p-2 active:scale-95">
                        <span className="material-symbols-outlined text-2xl">shuffle</span>
                    </button>

                    <button onClick={() => {
                        if (track.isAlbum && currentTrackIndex > 0) setCurrentTrackIndex(i => i - 1);
                        else handleSeek(0);
                        vibrate();
                    }} className="text-white hover:text-primary transition-colors p-2 active:scale-95">
                        <span className="material-symbols-outlined text-4xl">skip_previous</span>
                    </button>

                    <button
                        onClick={() => { setIsPlaying(!isPlaying); vibrate(20); }}
                        className="flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all p-4"
                    >
                        <span className="material-symbols-outlined text-6xl">
                            {isPlaying ? 'pause' : 'play_arrow'}
                        </span>
                    </button>

                    <button onClick={() => {
                        if (track.isAlbum && currentTrackIndex < track.trackList.length - 1) setCurrentTrackIndex(i => i + 1);
                        else handleSeek(duration);
                        vibrate();
                    }} className="text-white hover:text-primary transition-colors p-2 active:scale-95">
                        <span className="material-symbols-outlined text-4xl">skip_next</span>
                    </button>

                    <button className="text-zinc-500 hover:text-white transition-colors p-2 active:scale-95">
                        <span className="material-symbols-outlined text-2xl">repeat</span>
                    </button>
                </div>
            </div>

            {/* Bottom Footer Actions */}
            <div className="w-full max-w-md mx-auto px-8 pb-10 flex items-center justify-between shrink-0">
                <button
                    onClick={() => setShowPlaylist(true)}
                    className="text-zinc-600 hover:text-white transition-colors p-2"
                >
                    <span className="material-symbols-outlined text-2xl">queue_music</span>
                </button>

                <button
                    onClick={() => navigate('/tester-feedback', { state: { trackId: track.id } })}
                    className="h-9 px-5 bg-white/5 border border-white/10 rounded-full flex items-center gap-2 text-white hover:bg-white/10 transition-colors backdrop-blur-md"
                >
                    <span className="material-symbols-outlined text-sm">chat_bubble</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">Comment</span>
                </button>

                <button onClick={() => {
                    if (navigator.share) {
                        navigator.share({ title: currentTitle, text: 'Check out this track on Beta Beat!', url: window.location.href });
                    }
                }} className="text-zinc-600 hover:text-white transition-colors p-2">
                    <span className="material-symbols-outlined text-2xl">ios_share</span>
                </button>
            </div>

            {/* Scrollable Album Tracklist (Below Fold) */}
            {track.isAlbum && (
                <div className="w-full max-w-md mx-auto px-6 pb-24 mt-2 border-t border-white/5 pt-8">
                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6 px-2">Album Tracks</h3>
                    <div className="space-y-1">
                        {track.trackList.map((t, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentTrackIndex(i)}
                                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left group ${i === currentTrackIndex ? 'bg-white/10' : 'hover:bg-white/5'}`}
                            >
                                <span className={`text-xs font-mono w-6 text-center ${i === currentTrackIndex ? 'text-primary' : 'text-zinc-600 group-hover:text-zinc-400'}`}>{i + 1}</span>
                                <div className="flex-1 min-w-0">
                                    <div className={`text-sm font-bold truncate ${i === currentTrackIndex ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>{t.title}</div>
                                </div>
                                {i === currentTrackIndex && <span className="material-symbols-outlined text-sm text-primary">equalizer</span>}
                                {i !== currentTrackIndex && <span className="material-symbols-outlined text-sm text-zinc-700 group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">play_arrow</span>}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Audio Error Banner */}
            {audioError && (
                <div className="absolute top-20 left-4 right-4 bg-red-500/90 text-white p-4 rounded-xl z-50 backdrop-blur-md border border-white/10 shadow-xl max-w-md mx-auto">
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-xl mt-0.5">warning</span>
                        <div className="flex-1">
                            <h3 className="font-bold text-sm mb-1">Playback Error</h3>
                            <p className="text-xs opacity-90 mb-3">{audioError}</p>
                            <a
                                href={currentAudioUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white text-red-600 text-xs font-bold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 hover:bg-white/90 transition-colors"
                            >
                                Test Link <span className="material-symbols-outlined text-[10px]">open_in_new</span>
                            </a>
                        </div>
                        <button onClick={() => setAudioError(null)} className="text-white/70 hover:text-white">
                            <span className="material-symbols-outlined text-lg">close</span>
                        </button>
                    </div>
                </div>
            )}

            <audio
                ref={audioRef}
                src={currentAudioUrl}
                key={currentAudioUrl}
                preload="auto"
                onError={(e) => {
                    console.error("Audio playback error:", e.currentTarget.error);
                    setAudioError(`Unable to play "${currentTitle}". The link might be private, expired, or blocked. Click below to test.`);
                }}
            />

            {/* Playlist Overlay */}
            {showPlaylist && (
                <div className="absolute inset-0 bg-black/95 z-50 flex flex-col p-6 backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-8 pt-4">
                        <h2 className="text-xl font-bold tracking-tight">Up Next</h2>
                        <button onClick={() => setShowPlaylist(false)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                            <span className="material-symbols-outlined text-xl">close</span>
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-1 no-scrollbar">
                        {track.isAlbum && track.trackList ? track.trackList.map((t, i) => (
                            <button
                                key={i}
                                onClick={() => { setCurrentTrackIndex(i); setShowPlaylist(false); }}
                                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${i === currentTrackIndex ? 'bg-primary/20 text-primary border border-primary/20' : 'hover:bg-white/5 text-zinc-400 border border-transparent'}`}
                            >
                                <span className={`text-xs font-mono w-6 text-center ${i === currentTrackIndex ? 'opacity-100' : 'opacity-40'}`}>{i + 1}</span>
                                <div className="flex flex-col items-start min-w-0 flex-1">
                                    <span className={`text-sm font-bold truncate w-full text-left ${i === currentTrackIndex ? 'text-primary' : 'text-white'}`}>{t.title}</span>
                                    {i === currentTrackIndex && <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">Now Playing</span>}
                                </div>
                                {i === currentTrackIndex && <span className="material-symbols-outlined text-lg animate-pulse">equalizer</span>}
                            </button>
                        )) : (
                            <div className="text-zinc-500 text-center mt-10 flex flex-col items-center gap-2">
                                <span className="material-symbols-outlined text-4xl opacity-20">music_off</span>
                                <p className="text-sm">Single Track</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default TesterPlayer;
