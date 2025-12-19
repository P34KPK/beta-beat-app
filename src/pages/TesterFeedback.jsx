import { useNavigate } from 'react-router-dom';
import TesterBottomNav from '../components/TesterBottomNav';

const TesterFeedback = () => {
    const navigate = useNavigate();
    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-24 max-w-md mx-auto">
            <header className="flex items-center justify-between p-4 pb-2 sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
                <button onClick={() => navigate(-1)} className="flex size-10 shrink-0 items-center justify-center rounded-full active:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Neon Nights - v2.1</h2>
            </header>

            <main className="flex-1 flex flex-col gap-6 px-5 pt-2">
                <div className="flex justify-center w-full">
                    <div className="flex h-12 w-full max-w-sm items-center justify-center rounded-full bg-surface-dark p-1 border border-white/5">
                        <label className="relative flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-full px-2 has-[:checked]:bg-primary has-[:checked]:text-white text-[#888888] transition-all duration-300">
                            <span className="truncate text-sm font-bold z-10">Version A</span>
                            <input defaultChecked className="peer invisible w-0 absolute" name="ab-test" type="radio" value="A" />
                        </label>
                        <label className="relative flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-full px-2 has-[:checked]:bg-primary has-[:checked]:text-white text-[#888888] transition-all duration-300">
                            <span className="truncate text-sm font-bold z-10">Version B</span>
                            <input className="peer invisible w-0 absolute" name="ab-test" type="radio" value="B" />
                        </label>
                    </div>
                </div>

                <div className="flex flex-col gap-5 items-center mt-2">
                    <div className="w-full max-w-[340px] aspect-square rounded-[2rem] bg-surface-dark shadow-[0_20px_40px_-10px_rgba(242,127,13,0.15)] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDjs7YCAr-Cv2eRG9Gby2OOZObh-9cEHpJMJCPgysHhb8W-51yfcAoXIf5WLBn9I2s_2F6ilf8XpgKI-mFtky3zoHixEeip7DVOUiDxr82_1t2gFAIymkZokS0beqVJcblw2XfuG5i1gyIZ-Zl2OlRERlGO0HO5VZ-WlLeaDYTPn30aM3NS1LGPQzC7zKWBYhD21s2725SpPj7F9Tweh72FW2sWKy0rVCRYK0hqUV-P_rLrSdptO9M9vbqHrIjfCkgMc2YX8Lji_nAy')" }}>
                        </div>
                    </div>

                    <div className="w-full max-w-[340px] flex flex-col gap-3">
                        <div className="group/scrubber relative h-6 flex items-center cursor-pointer">
                            <div className="h-1.5 w-full bg-surface-dark rounded-full overflow-hidden">
                                <div className="h-full w-[35%] bg-primary rounded-full relative"></div>
                            </div>
                            <div className="absolute left-[35%] -ml-2 size-4 rounded-full bg-white shadow-lg scale-0 group-hover/scrubber:scale-100 transition-transform"></div>
                        </div>
                        <div className="flex items-center justify-between text-xs font-medium text-[#888888] font-mono tracking-wide">
                            <span className="text-white">1:17</span>
                            <span>3:42</span>
                        </div>
                        <div className="flex items-center justify-center gap-8 mt-1">
                            <button className="flex items-center justify-center size-16 rounded-full bg-white text-background-dark hover:scale-105 active:scale-95 transition-all shadow-lg shadow-white/10">
                                <span className="material-symbols-outlined text-[36px] fill-1 ml-1">play_arrow</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="h-px w-full bg-surface-dark my-2"></div>

                <div className="flex flex-col gap-5 w-full max-w-[340px] mx-auto">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold text-white">Rate this Version</h3>
                        <div className="flex gap-3">
                            {[1, 2, 3].map(i => (
                                <button key={i} className="group focus:outline-none">
                                    <span className="material-symbols-outlined text-4xl text-primary fill-1 group-hover:scale-110 transition-transform">star</span>
                                </button>
                            ))}
                            {[4, 5].map(i => (
                                <button key={i} className="group focus:outline-none">
                                    <span className="material-symbols-outlined text-4xl text-surface-dark hover:text-primary transition-colors">star</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <label className="text-sm font-bold text-white flex items-center justify-between">
                            <span>Timestamped Comment</span>
                            <span className="text-xs font-normal text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">timer</span>
                                Auto-tagging
                            </span>
                        </label>
                        <div className="relative group">
                            <div className="absolute top-4 left-4 z-10">
                                <span className="inline-flex items-center justify-center rounded bg-primary text-[10px] font-bold text-white px-1.5 py-0.5 h-5 font-mono">
                                    1:17
                                </span>
                            </div>
                            <textarea className="w-full h-32 rounded-2xl bg-surface-dark border border-transparent focus:border-primary/50 text-white placeholder-[#888888] p-4 pt-12 text-sm leading-relaxed resize-none focus:ring-0 focus:outline-none transition-all shadow-inner" placeholder="Start typing to add a note at this timestamp..."></textarea>
                        </div>
                    </div>
                    <button className="w-full py-4 rounded-full bg-primary text-white font-bold text-base shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mb-4">
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
