import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

const initialArtistProfile = {
    name: "PEAKAFELLER",
    bio: "Testing new sounds for the next era.",
    photo: "/peakafeller_profile.jpg",
    socials: {
        instagram: "https://www.instagram.com/peakafeller?igsh=MWw4YjZjeDB6OTlidw%3D%3D&utm_source=qr",
        tiktok: "https://www.tiktok.com/@peakafeller_lerecycleur?_r=1&_t=ZS-92LGYgBsift",
        facebook: "https://www.facebook.com/share/17MuE6JEfo/?mibextid=wwXIfr",
        soundcloud: "https://on.soundcloud.com/bkxyp24SNcZKtF0Ay8",
        snapchat: "https://snapchat.com/t/c8hBxBU7",
        linktree: "https://linktr.ee/Peakafeller",
        discord: "https://discord.gg/HSKXZkXeH",
        twitter: "",
        website: ""
    },
    stats: {
        testers: 0,
        tracks: 0,
        score: 0
    }
};

const initialTracks = [];

export const DataProvider = ({ children }) => {
    // Load initial state from localStorage if available, else use defaults
    const [artistProfile, setArtistProfile] = useState(() => {
        const saved = localStorage.getItem('artistProfile');
        return saved ? JSON.parse(saved) : initialArtistProfile;
    });

    const [tracks, setTracks] = useState(() => {
        const saved = localStorage.getItem('tracks');
        return saved ? JSON.parse(saved) : initialTracks;
    });

    const [feedback, setFeedback] = useState(() => {
        const saved = localStorage.getItem('feedback');
        return saved ? JSON.parse(saved) : [];
    });

    const [testerSessions, setTesterSessions] = useState(() => {
        const saved = localStorage.getItem('testerSessions');
        return saved ? JSON.parse(saved) : [];
    });

    const [inviteCode] = useState("PEAKAFELLER");

    // Persist to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('artistProfile', JSON.stringify(artistProfile));
    }, [artistProfile]);

    useEffect(() => {
        localStorage.setItem('tracks', JSON.stringify(tracks));
    }, [tracks]);

    useEffect(() => {
        localStorage.setItem('feedback', JSON.stringify(feedback));
    }, [feedback]);

    useEffect(() => {
        localStorage.setItem('testerSessions', JSON.stringify(testerSessions));
    }, [testerSessions]);

    const updateProfile = (newProfileData) => {
        setArtistProfile(prev => ({
            ...prev,
            ...newProfileData
        }));
    };

    const addTrack = (newTrack) => {
        setTracks(prev => [...prev, { ...newTrack, id: Date.now() }]);
    };

    const addFeedback = (newFeedback) => {
        setFeedback(prev => [...prev, { ...newFeedback, id: Date.now(), date: new Date().toISOString() }]);
        // Update Stats Score
        setArtistProfile(prev => ({
            ...prev,
            stats: {
                ...prev.stats,
                score: prev.stats.score + (newFeedback.rating || 0),
                testers: prev.stats.testers + 1
            }
        }));
    };

    const logSession = (sessionData) => {
        // sessionData: { trackId, trackTitle, durationListened, totalDuration, completed, timestamp, testerId }
        setTesterSessions(prev => [...prev, { ...sessionData, id: Date.now() }]);
    };

    const [testerProfile, setTesterProfile] = useState(() => {
        const saved = localStorage.getItem('testerProfile');
        return saved ? JSON.parse(saved) : { name: '', email: '', photo: '', history: [] };
    });

    useEffect(() => {
        localStorage.setItem('testerProfile', JSON.stringify(testerProfile));
    }, [testerProfile]);

    const updateTesterProfile = (newData) => {
        setTesterProfile(prev => ({ ...prev, ...newData }));
    };

    return (
        <DataContext.Provider value={{
            artistProfile,
            updateProfile,
            tracks,
            addTrack,
            inviteCode,
            feedback,
            addFeedback,
            testerSessions,
            logSession,
            testerProfile,
            updateTesterProfile
        }}>
            {children}
        </DataContext.Provider>
    );
};
