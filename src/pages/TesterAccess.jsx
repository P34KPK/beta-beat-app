import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useData } from '../context/DataContext';

const TesterAccess = () => {
    const navigate = useNavigate();
    const { inviteCode } = useData();
    const [inputCode, setInputCode] = useState('');
    const [error, setError] = useState('');

    const handleAccess = () => {
        if (inputCode.toUpperCase() === inviteCode) {
            navigate('/tester-home');
        } else {
            setError('Invalid access code. Please try again.');
        }
    };

    return (
        <div className="relative flex h-full w-full flex-col overflow-hidden max-w-md mx-auto min-h-screen">
            <div className="flex-none pt-12 pb-6 px-6 text-center z-10 flex justify-center">
                <img src="/beta-beat-logo.png" alt="BETA BEAT" className="w-24 h-auto opacity-80" />
            </div>

            <div className="flex-1 flex flex-col justify-center px-6 -mt-20">
                <div className="mb-10 text-center">
                    <h2 className="text-white text-[28px] font-bold leading-tight tracking-tight mb-2">Unlock the Beat</h2>
                    <p className="text-zinc-400 text-base font-normal">Enter the exclusive invite code shared by the artist.</p>
                </div>

                <div className="w-full mb-8 group">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-zinc-500 group-focus-within:text-primary transition-colors duration-300">key</span>
                        </div>
                        <input
                            className="block w-full rounded-full border-0 bg-zinc-900/80 py-5 pl-14 pr-5 text-white placeholder:text-zinc-600 focus:ring-2 focus:ring-primary focus:bg-zinc-900 text-lg tracking-[0.2em] font-mono shadow-inner transition-all duration-300 ease-out"
                            placeholder="ENTER CODE"
                            type="text"
                            value={inputCode}
                            onChange={(e) => {
                                setInputCode(e.target.value);
                                setError('');
                            }}
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
                </div>

                <button onClick={handleAccess} className="w-full rounded-full bg-primary hover:bg-white/90 active:scale-[0.98] transition-all duration-200 h-14 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                    <span className="text-black text-base font-bold tracking-wide uppercase">Access Project</span>
                    <span className="material-symbols-outlined text-black ml-2 text-xl">arrow_forward</span>
                </button>
            </div>
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-zinc-900/20 to-transparent -z-10 pointer-events-none"></div>
        </div>
    )
}

export default TesterAccess;
