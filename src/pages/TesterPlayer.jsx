import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TesterBottomNav from '../components/TesterBottomNav';
import { useData } from '../context/DataContext';

const TesterPlayer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { tracks } = useData();
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    const currentAudioUrl = track?.isAlbum
        ? track.trackList[currentTrackIndex]?.audioUrl
        : track?.audioUrl;

    const currentTitle = track?.isAlbum
        ? track.trackList[currentTrackIndex]?.title
        : track?.title;

    // ... (rest of effects)

    // Real Audio Playback Logic
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
            setProgress((audio.currentTime / audio.duration) * 100);
        };

        const handleEnded = () => {
            if (track.isAlbum && currentTrackIndex < track.trackList.length - 1) {
                // Auto-advance to next track
                setCurrentTrackIndex(prev => prev + 1);
                // Wait small delay for state update to propagate to ref src (React quirk)
                // Actually easier: let the effect re-run when index changes. 
                // We just need to ensure it autoplay when index changes if it was playing.
            } else {
                setIsPlaying(false);
                setShowUI(true);
                setProgress(0);
                setCurrentTime(0);
            }
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleEnded);

        // Auto-play on mount or track change if isPlaying is true
        if (isPlaying) {
            resetActivity();
            // Small timeout to ensure src is updated
            setTimeout(() => {
                audio.play().catch(e => console.error("Playback failed:", e));
            }, 50);
        } else {
            audio.pause();
            setShowUI(true);
        }

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [isPlaying, currentTrackIndex, track]);

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
        <motion.div
            // ... (keep initial props)
            className="relative flex h-full min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-y-auto max-w-md mx-auto no-scrollbar"
        >
            <audio ref={audioRef} src={currentAudioUrl} preload="metadata" />

            {/* Header */}
            {/* ... (keep header) ... */}

            <div className="flex-1 flex flex-col items-center justify-start w-full max-w-md mx-auto px-6 relative z-10 pt-10 pb-32">
                {/* Track Info */}
                <motion.div
                    className="w-full text-center mb-6 transition-all duration-500"
                    animate={{ scale: showUI ? 1 : 1.05, y: showUI ? 0 : 20 }}
                >
                    <div className="text-xs font-bold text-primary tracking-widest uppercase mb-1">{track.isAlbum ? track.title : 'SINGLE'}</div>
                    <h1 className="text-black dark:text-white text-2xl font-bold leading-tight tracking-tight mb-1">{currentTitle}</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{track.version}</p>

                    <motion.div
                        className="mt-2 flex items-center justify-center gap-2"
                        animate={{ opacity: showUI ? 1 : 0 }}
                    >
                        <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></span>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{isPlaying ? 'Playing Now' : 'Paused'}</p>
                    </motion.div>
                </motion.div>

                {/* Canvas Visualizer */}
                <div className="w-full h-32 flex items-center justify-center mb-4 relative overflow-hidden">
                    <canvas ref={canvasRef} width={400} height={128} className="w-full h-full" />
                </div>

                {/* Progress Bar & Controls Wrapper */}
                <motion.div
                    className="w-full transition-opacity duration-500 mb-8"
                    style={{ opacity: showUI ? 1 : 0, pointerEvents: showUI ? 'auto' : 'none' }}
                >
                    {/* ... (Keep Scrub Bar & Time) ... */}
                    <div className="w-full mb-2 cursor-pointer group" onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const pct = x / rect.width;
                        handleSeek(pct * duration);
                        vibrate(5);
                    }}>
                        <div className="w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden group-hover:h-2 transition-all">
                            <div className="h-full bg-primary transition-all duration-100 ease-linear" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>

                    <div className="w-full flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 px-0">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between w-full gap-4 mb-4">
                        {/* ... (Keep Controls, update logic if needed for prev/next track later) ... */}
                        <button className="group flex flex-col items-center gap-1 focus:outline-none" onClick={() => vibrate()}>
                            <div className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 group-hover:border-primary group-hover:text-primary transition-all group-active:scale-95">
                                <span className="material-symbols-outlined filled-icon text-lg">thumb_down</span>
                            </div>
                        </button>
                        <div className="flex items-center gap-4">
                            <button className="text-black dark:text-white hover:text-primary transition-colors focus:outline-none p-2" onClick={() => {
                                if (track.isAlbum && currentTrackIndex > 0) { setCurrentTrackIndex(i => i - 1); }
                                else { handleSeek(Math.max(0, currentTime - 10)); }
                                vibrate();
                            }}>
                                <span className="material-symbols-outlined text-3xl">{track.isAlbum ? 'skip_previous' : 'replay_10'}</span>
                            </button>
                            <button onClick={() => { setIsPlaying(!isPlaying); vibrate(20); }} className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 active:scale-95 transition-all focus:outline-none">
                                <span className="material-symbols-outlined" style={{ fontSize: '36px', fontVariationSettings: "'FILL' 1" }}>{isPlaying ? 'pause' : 'play_arrow'}</span>
                            </button>
                            <button className="text-black dark:text-white hover:text-primary transition-colors focus:outline-none p-2" onClick={() => {
                                if (track.isAlbum && currentTrackIndex < track.trackList.length - 1) { setCurrentTrackIndex(i => i + 1); }
                                else { handleSeek(Math.min(duration, currentTime + 10)); }
                                vibrate();
                            }}>
                                <span className="material-symbols-outlined text-3xl">{track.isAlbum ? 'skip_next' : 'forward_10'}</span>
                            </button>
                        </div>
                        <button className="group flex flex-col items-center gap-1 focus:outline-none" onClick={() => vibrate()}>
                            <div className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 group-hover:border-primary group-hover:text-primary transition-all group-active:scale-95">
                                <span className="material-symbols-outlined filled-icon text-lg">thumb_up</span>
                            </div>
                        </button>
                    </div>
                </motion.div>

                {/* Album Tracklist */}
                {track.isAlbum && (
                    <motion.div
                        className="w-full bg-surface-dark/50 rounded-2xl border border-white/5 p-2 flex flex-col gap-1"
                        animate={{ opacity: showUI ? 1 : 0 }}
                    >
                        {track.trackList.map((t, idx) => (
                            <button
                                key={idx}
                                onClick={() => { setCurrentTrackIndex(idx); setIsPlaying(true); vibrate(); }}
                                className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors ${currentTrackIndex === idx ? 'bg-primary text-black' : 'hover:bg-white/5 text-zinc-400'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`text-xs font-mono font-bold w-4 ${currentTrackIndex === idx ? 'text-black' : 'text-zinc-600'}`}>{idx + 1}</span>
                                    <div className="flex flex-col">
                                        <span className={`text-sm font-bold leading-tight ${currentTrackIndex === idx ? 'text-black' : 'text-white'}`}>{t.title}</span>
                                    </div>
                                </div>
                                {currentTrackIndex === idx && <span className="material-symbols-outlined text-lg animate-pulse">graphic_eq</span>}
                            </button>
                        ))}
                    </motion.div>
                )}
            </div>

            <motion.div style={{ opacity: showUI ? 1 : 0 }} className="transition-opacity duration-500">
                <TesterBottomNav active="listen" />
            </motion.div>
        </motion.div>
    )
}

export default TesterPlayer;
