import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ArtistLogin = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (password === 'sebaspk123') {
            navigate('/artist-dashboard');
        } else {
            setError('Invalid password. Please try again.');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="relative flex h-full w-full flex-col overflow-hidden max-w-md mx-auto min-h-screen">
            <div className="flex-none pt-12 pb-6 px-6 text-center z-10 flex justify-center">
                <img src="/beta-beat-logo.png" alt="BETA BEAT" className="w-48 h-auto opacity-80 grayscale contrast-125" />
            </div>

            <div className="flex-1 flex flex-col justify-center px-6 -mt-20">
                <div className="mb-10 text-center">
                    <h2 className="text-white text-[28px] font-bold leading-tight tracking-tight mb-2 font-mono uppercase">Artist Access</h2>
                    <p className="text-zinc-400 text-sm font-mono font-normal">Enter your secure password to verify your identity.</p>
                </div>

                <div className="w-full mb-8 group">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-zinc-500 group-focus-within:text-primary transition-colors duration-300">lock</span>
                        </div>
                        <input
                            className="block w-full border-2 border-zinc-700 bg-black py-5 pl-14 pr-5 text-white placeholder:text-zinc-600 focus:border-primary focus:bg-black text-lg tracking-[0.2em] font-mono transition-all duration-300 ease-out"
                            placeholder="PASSWORD"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                            }}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
                </div>

                <button onClick={handleLogin} className="w-full bg-primary hover:bg-white text-black h-14 flex items-center justify-center transition-transform active:scale-[0.98] border-2 border-transparent hover:border-black">
                    <span className="text-base font-bold tracking-wide uppercase font-mono">Login</span>
                    <span className="material-symbols-outlined text-black ml-2 text-xl">login</span>
                </button>
            </div>
        </div>
    );
};

export default ArtistLogin;
