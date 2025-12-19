import { useNavigate } from 'react-router-dom';

const TesterBottomNav = ({ active }) => {
    const navigate = useNavigate();

    const isActive = (key) => active === key;
    const activeColor = "text-primary";
    const inactiveColor = "text-gray-400 hover:text-white";

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-black/90 border-t border-gray-200 dark:border-white/5 backdrop-blur-md pb-6 pt-2 px-6 z-50">
            <div className="flex justify-between items-end max-w-md mx-auto">
                <button onClick={() => navigate('/tester-home')} className={`flex flex-col items-center gap-1 w-16 ${isActive('listen') ? activeColor : inactiveColor}`}>
                    <span className="material-symbols-outlined" style={isActive('listen') ? { fontVariationSettings: "'FILL' 1" } : {}}>headphones</span>
                    <span className="text-[10px] font-bold uppercase tracking-wide">Listen</span>
                </button>
                <button onClick={() => navigate('/tester-feedback')} className={`flex flex-col items-center gap-1 w-16 ${isActive('feedback') ? activeColor : inactiveColor}`}>
                    <span className="material-symbols-outlined" style={isActive('feedback') ? { fontVariationSettings: "'FILL' 1" } : {}}>chat_bubble</span>
                    <span className="text-[10px] font-bold uppercase tracking-wide">Feedback</span>
                </button>
                <button onClick={() => navigate('/tester-support')} className={`flex flex-col items-center gap-1 w-16 ${isActive('donate') ? activeColor : inactiveColor}`}>
                    <span className="material-symbols-outlined" style={isActive('donate') ? { fontVariationSettings: "'FILL' 1" } : {}}>volunteer_activism</span>
                    <span className="text-[10px] font-bold uppercase tracking-wide">Donate</span>
                </button>
                <button className={`flex flex-col items-center gap-1 w-16 ${isActive('profile') ? activeColor : inactiveColor}`}>
                    <div className="w-6 h-6 rounded-full bg-gray-700 overflow-hidden relative border border-current">
                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCJ7H-319DJkqr-RyeU9cEkmih5kHLuAdPpVZqYRWjX4N-Ll0ppEa9K9EJTQYQuODW7KRaqMBykq7Jo44hWc4HREI5_MpptVxYnHwfSHNTuOVCZQvNdIVuVPEIOpCc8WKEbUu-YidXVoECXu-N3rwIn69WrK0v2sRHimK3-gvUeg-EaToPUfeBQniKeMCU4riQJmdlrZpCdfHuucGc_NYmdI9cpkn_z2YtylWo6ttsOMzHxcGvpgWULzZEqOXOTwaXI4DNUGipMZbym')" }}></div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wide">Profile</span>
                </button>
            </div>
        </div>
    )
}

export default TesterBottomNav;
