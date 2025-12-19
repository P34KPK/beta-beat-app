import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TesterBottomNav from '../components/TesterBottomNav';
import { useData } from '../context/DataContext';

const TesterProfile = () => {
    const navigate = useNavigate();
    const { testerProfile, updateTesterProfile, testerSessions, feedback } = useData();
    const fileInputRef = useRef(null);
    const [name, setName] = useState(testerProfile.name || '');
    const [email, setEmail] = useState(testerProfile.email || '');

    const handlePhotoClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateTesterProfile({ photo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        updateTesterProfile({ name, email });
        // Animation or toast could go here
        alert('Profile Saved!');
    };

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col pb-32 max-w-md mx-auto bg-background-light dark:bg-black">
            {/* Header */}
            <div className="flex items-center p-4 sticky top-0 z-10 bg-background-light/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800/50">
                <div onClick={() => navigate(-1)} className="flex size-12 shrink-0 items-center justify-center cursor-pointer text-black dark:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors">
                    <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>chevron_left</span>
                </div>
                <h2 className="text-black dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12 font-mono uppercase">Tester Profile</h2>
            </div>

            <div className="flex flex-col px-6 mt-6 flex-1 overflow-y-auto">

                {/* Profile Photo */}
                <div className="flex justify-center mb-8">
                    <div className="relative group cursor-pointer" onClick={handlePhotoClick}>
                        <div className={`size-32 bg-center bg-cover border-2 border-white/20 group-hover:border-primary transition-colors bg-zinc-900 flex items-center justify-center`} style={{ backgroundImage: testerProfile.photo ? `url("${testerProfile.photo}")` : 'none' }}>
                            {!testerProfile.photo && (
                                <span className="material-symbols-outlined text-4xl text-zinc-600">person</span>
                            )}
                        </div>
                        <div className="absolute -bottom-3 -right-3 bg-black border border-white/20 p-2 text-white group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-colors">
                            <span className="material-symbols-outlined text-sm">edit</span>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                </div>

                {/* Form */}
                <div className="flex flex-col gap-5 mb-10">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider">Tester Name / Alias</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="ENTER NAME"
                            className="bg-black border-2 border-zinc-800 focus:border-primary text-white p-4 font-mono outline-none transition-colors placeholder:text-zinc-700"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider">Contact Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ENTER EMAIL"
                            className="bg-black border-2 border-zinc-800 focus:border-primary text-white p-4 font-mono outline-none transition-colors placeholder:text-zinc-700"
                        />
                    </div>
                    <button onClick={handleSave} className="bg-[#FF5500] hover:bg-[#FF5500]/90 text-black font-mono font-bold uppercase py-4 px-6 mt-2 border border-transparent hover:border-white transition-all flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">save</span>
                        <span>Save Profile</span>
                    </button>
                </div>

                {/* History Stats */}
                <div className="flex gap-4 mb-8">
                    <div className="flex-1 bg-black border border-white/10 p-4 flex flex-col items-center">
                        <span className="text-2xl font-bold font-mono text-white">{testerSessions?.length || 0}</span>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase mt-1">Sessions</span>
                    </div>
                    <div className="flex-1 bg-black border border-white/10 p-4 flex flex-col items-center">
                        <span className="text-2xl font-bold font-mono text-white">{feedback?.length || 0}</span>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase mt-1">Reviews</span>
                    </div>
                </div>

                {/* History List */}
                <h3 className="text-sm font-bold font-mono uppercase text-white mb-4 tracking-wider border-b border-white/10 pb-2">Recent Activity</h3>
                <div className="flex flex-col gap-3">
                    {testerSessions && testerSessions.slice().reverse().map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-3 bg-white/5 border border-white/5">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-white font-mono uppercase">{session.trackTitle || 'Unknown Track'}</span>
                                <span className="text-[10px] text-zinc-500 font-mono">{new Date(session.id).toLocaleDateString()}</span>
                            </div>
                            <span className="text-[10px] font-mono text-primary border border-primary/30 px-1.5 py-0.5">LISTEN</span>
                        </div>
                    ))}
                    {(!testerSessions || testerSessions.length === 0) && (
                        <p className="text-center text-xs text-zinc-600 font-mono py-4">NO ACTIVITY RECORDED</p>
                    )}
                </div>

            </div>
            <TesterBottomNav active="profile" />
        </div>
    );
};

export default TesterProfile;
