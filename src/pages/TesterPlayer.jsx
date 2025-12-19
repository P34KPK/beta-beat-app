import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TesterBottomNav from '../components/TesterBottomNav';
import { useData } from '../context/DataContext';

const TesterPlayer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { tracks } = useData();
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [showUI, setShowUI] = useState(true);
    const activityTimer = useRef(null);
    const canvasRef = useRef(null);
    const audioRef = useRef(null);
    // Use state for duration to trigger re-renders
    const [duration, setDuration] = useState(0);

    // Get track
    const trackId = location.state?.trackId;
    const track = tracks.find(t => t.id === trackId) || tracks[0];

    // Haptics Helper
    const vibrate = (ms = 10) => {
        if (navigator.vibrate) navigator.vibrate(ms);
    };

    // Focus Mode: Hide UI on inactivity
    const resetActivity = () => {
        setShowUI(true);
        if (activityTimer.current) clearTimeout(activityTimer.current);
        if (isPlaying) {
            activityTimer.current = setTimeout(() => setShowUI(false), 3000);
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', resetActivity);
        window.addEventListener('touchstart', resetActivity);
        window.addEventListener('click', resetActivity);
        return () => {
            window.removeEventListener('mousemove', resetActivity);
            window.removeEventListener('touchstart', resetActivity);
            window.removeEventListener('click', resetActivity);
            if (activityTimer.current) clearTimeout(activityTimer.current);
        };
    }, [isPlaying]);

    // Real Audio Playback Logic
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
            setProgress((audio.currentTime / audio.duration) * 100);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setShowUI(true);
            setProgress(0);
            setCurrentTime(0);
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleEnded);

        if (isPlaying) {
            resetActivity();
            audio.play().catch(e => console.error("Playback failed:", e));
        } else {
            audio.pause();
            setShowUI(true);
        }

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [isPlaying]);

    // Handle seeking via progress bar
    const handleSeek = (newTime) => {
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    // Format time helper (remains same)
    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Update duration when metadata loads
        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        return () => audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    }, []);

    // Canvas Visualizer (Agent A)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const render = () => {
            if (!ctx) return;
            const width = canvas.width;
            const height = canvas.height;
            ctx.clearRect(0, 0, width, height);

            if (!isPlaying) {
                // Draw static line
                ctx.beginPath();
                ctx.moveTo(0, height / 2);
                ctx.lineTo(width, height / 2);
                ctx.strokeStyle = '#333';
                ctx.lineWidth = 2;
                ctx.stroke();
                return;
            }

            const bars = 40;
            const barWidth = width / bars;

            for (let i = 0; i < bars; i++) {
                const time = Date.now() / 200;
                // Create a "wave" effect with noise
                const noise = Math.sin(i * 0.5 + time) * Math.cos(i * 0.2 - time) * 0.8;
                const barHeight = Math.max(4, Math.abs(noise) * height * 0.8);

                const x = i * barWidth;
                const y = (height - barHeight) / 2;

                const gradient = ctx.createLinearGradient(0, 0, 0, height);
                gradient.addColorStop(0, '#ff7e5f');
                gradient.addColorStop(1, '#feb47b');

                ctx.fillStyle = gradient; // Primary color approximation

                // Rounded bars
                ctx.beginPath();
                ctx.roundRect(x + 1, y, barWidth - 2, barHeight, 5);
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(animationFrameId);
    }, [isPlaying]);



    if (!track) return <div>Loading...</div>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative flex h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-hidden max-w-md mx-auto"
        >
            <audio ref={audioRef} src={track.audioUrl} preload="metadata" />

            {/* Header */}
            <motion.div
                className="flex items-center p-6 justify-between shrink-0 z-20 transition-opacity duration-500"
                style={{ opacity: showUI ? 1 : 0, pointerEvents: showUI ? 'auto' : 'none' }}
            >
                <button onClick={() => { vibrate(); navigate(-1); }} className="text-black dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>arrow_back</span>
                </button>
                <h2 className="text-black dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center uppercase text-sm">Now Testing</h2>
                <div className="flex items-center justify-end">
                    <span className="bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Beta Mode</span>
                </div>
            </motion.div>

            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto px-6 relative z-10">
                {/* Track Info */}
                <motion.div
                    className="w-full text-center mb-10 transition-all duration-500"
                    animate={{ scale: showUI ? 1 : 1.1, y: showUI ? 0 : 20 }}
                >
                    <h1 className="text-black dark:text-white text-3xl font-bold leading-tight tracking-tight mb-2">{track.title}</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">{track.version}</p>
                    <motion.div
                        className="mt-4 flex items-center justify-center gap-2"
                        animate={{ opacity: showUI ? 1 : 0 }}
                    >
                        <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></span>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{isPlaying ? 'Playing Now' : 'Paused'}</p>
                    </motion.div>
                </motion.div>

                {/* Canvas Visualizer */}
                <div className="w-full h-48 flex items-center justify-center mb-4 relative overflow-hidden">
                    <canvas ref={canvasRef} width={400} height={192} className="w-full h-full" />
                </div>

                {/* Progress Bar & Controls Wrapper */}
                <motion.div
                    className="w-full transition-opacity duration-500"
                    style={{ opacity: showUI ? 1 : 0, pointerEvents: showUI ? 'auto' : 'none' }}
                >
                    <div className="w-full mb-2 cursor-pointer group" onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const pct = x / rect.width;
                        handleSeek(pct * duration); // Use handleSeek
                        vibrate(5);
                    }}>
                        <div className="w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden group-hover:h-2 transition-all">
                            <div className="h-full bg-primary transition-all duration-100 ease-linear" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>

                    <div className="w-full flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-10 px-0">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>

                    <div className="flex items-center justify-between w-full gap-4 mb-8">
                        <button className="group flex flex-col items-center gap-1 focus:outline-none" onClick={() => vibrate()}>
                            <div className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 group-hover:border-primary group-hover:text-primary transition-all group-active:scale-95">
                                <span className="material-symbols-outlined filled-icon">thumb_down</span>
                            </div>
                        </button>
                        <div className="flex items-center gap-6">
                            <button className="text-black dark:text-white hover:text-primary transition-colors focus:outline-none p-2" onClick={() => { handleSeek(Math.max(0, currentTime - 10)); vibrate(); }}>
                                <span className="material-symbols-outlined text-4xl">replay_10</span>
                            </button>
                            <button onClick={() => { setIsPlaying(!isPlaying); vibrate(20); }} className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 active:scale-95 transition-all focus:outline-none">
                                <span className="material-symbols-outlined" style={{ fontSize: '48px', fontVariationSettings: "'FILL' 1" }}>{isPlaying ? 'pause' : 'play_arrow'}</span>
                            </button>
                            <button className="text-black dark:text-white hover:text-primary transition-colors focus:outline-none p-2" onClick={() => { handleSeek(Math.min(duration, currentTime + 10)); vibrate(); }}>
                                <span className="material-symbols-outlined text-4xl">forward_10</span>
                            </button>
                        </div>
                        <button className="group flex flex-col items-center gap-1 focus:outline-none" onClick={() => vibrate()}>
                            <div className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 group-hover:border-primary group-hover:text-primary transition-all group-active:scale-95">
                                <span className="material-symbols-outlined filled-icon">thumb_up</span>
                            </div>
                        </button>
                    </div>

                    <button onClick={() => { vibrate(); navigate('/tester-feedback', { state: { trackId: track.id, timestamp: currentTime } }); }} className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-gray-300 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-white/10 transition-colors mb-4 mx-auto w-fit">
                        <span className="material-symbols-outlined text-lg">add_comment</span>
                        <span>Add Timestamp Comment</span>
                    </button>
                </motion.div>
            </div>

            <motion.div style={{ opacity: showUI ? 1 : 0 }} className="transition-opacity duration-500">
                <TesterBottomNav active="listen" />
            </motion.div>
        </motion.div>
    )
}

export default TesterPlayer;
