import { useNavigate } from 'react-router-dom';

const ArtistFeedback = () => {
    const navigate = useNavigate();
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
                {/* Comment 1 */}
                <div className="flex w-full flex-row items-start justify-start gap-4 p-5 border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-12 h-12 shrink-0 border border-white/10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAn46DrDjwJbu_aF8qhzKnz2S0aHMax6HAA8sXj--xD2f_F2F9Sdpd-T-v1yv69VaGpIu9XKS0D9CnWI8079SrxnUJ0LXOI4fN_hfnA-lsxdu-gHBQYocUwedhQ67Y-oOSII0ZH2GOGGZezduBGKzwlmpbBYn3H-Huug8oWnU__mXeDcZXWi-zZ_F-JTk2LjZ3B69i_aFyR1qX7C1_mZNj6aPdPUVTywnCp7MA8w9BrL9hhIVATST4NfTWxpHrH-D1sN46B3PRa6no0")' }}></div>
                    <div className="flex h-full flex-1 flex-col items-start justify-start gap-1">
                        <div className="flex w-full flex-row items-start justify-between">
                            <div className="flex flex-col">
                                <p className="text-white text-base font-bold leading-normal tracking-wide">Alex M.</p>
                                <div className="mt-1 flex items-center">
                                    <span className="bg-white/10 text-gray-300 text-[10px] uppercase font-bold px-2 py-0.5 rounded tracking-wider">Midnight Drive (Ver A)</span>
                                </div>
                            </div>
                            <p className="text-primary text-xs font-bold leading-normal">15m ago</p>
                        </div>
                        <p className="text-gray-300 text-sm font-normal leading-relaxed mt-2">
                            The bass drop at 2:15 is insane, but the vocals feel a bit buried in the mix during the chorus. Love the artwork!
                        </p>
                    </div>
                </div>
                {/* Comment 2 */}
                <div className="flex w-full flex-row items-start justify-start gap-4 p-5 border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-12 h-12 shrink-0 border border-white/10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCaU9SUaM2mZC8TbZmeHS-kDJtgm_LuVxLfyrXOW3hdvtNjzmR51v2J-BEAXIVvcoyzUK0In23X54CE8yZsn8BJthjf9rIEipTqv7nrcc5XFM5NztndzfGVdTwCTqa4nz443TTRbA7yrEP_zWO-CBeluRwwPCV4CJrDSWolscd634NinksRHy3MK6e60r2yiwdqxj68fvz2EwuEys3lrrJ9AiO3iCWswVEcG7oZPD-FmAL6J3e1LR_NtohLJGFnq345wpmFENA8NstE")' }}></div>
                    <div className="flex h-full flex-1 flex-col items-start justify-start gap-1">
                        <div className="flex w-full flex-row items-start justify-between">
                            <div className="flex flex-col">
                                <p className="text-white text-base font-bold leading-normal tracking-wide">Sarah J.</p>
                                <div className="mt-1 flex items-center">
                                    <span className="bg-white/10 text-gray-300 text-[10px] uppercase font-bold px-2 py-0.5 rounded tracking-wider">Midnight Drive (Ver B)</span>
                                </div>
                            </div>
                            <p className="text-primary text-xs font-bold leading-normal">2h ago</p>
                        </div>
                        <p className="text-gray-300 text-sm font-normal leading-relaxed mt-2">
                            Version B feels much punchier. Definitely the way to go for the single release.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArtistFeedback;
