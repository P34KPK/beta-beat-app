import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

const initialArtistProfile = {
    name: "PEAKAFELLER",
    bio: "Testing new sounds for the next era.",
    photo: "/peakafeller_profile_final.jpg",
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

    // Authenticate Anonymously to allow Firebase Storage/Database access
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                signInAnonymously(auth)
                    .then(() => console.log("Connected to Cloud Services (Anonymous)"))
                    .catch(error => console.error("Cloud Connection Failed:", error));
            }
        });
        return () => unsubscribe();
    }, []);

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

    // Force clear legacy fake data if detected
    useEffect(() => {
        if (artistProfile.stats.testers === 142 && artistProfile.stats.tracks === 3) {
            console.log("Cleaning up legacy fake stats...");
            setArtistProfile(prev => ({
                ...prev,
                stats: { testers: 0, tracks: 0, score: 0 }
            }));
        }

        const hasFakeTracks = tracks.some(t => t.title.includes("Midnight Drive") || t.title.includes("Experiment"));
        // Only clear if it matches the specific mock data pattern AND we want to be aggressive, 
        // but maybe the user created "Experiment" tracks? 
        // The user complained about "fake songs".
        // Let's specifically target "Midnight Drive" which is the known fake one.
        if (tracks.some(t => t.title.includes("Midnight Drive"))) {
            console.log("Cleaning up legacy fake tracks...");
            setTracks(prev => prev.filter(t => !t.title.includes("Midnight Drive")));
        }

        // Force hard update of the photo one time to clear any old base64 or cached paths
        const hasFixedPhoto = localStorage.getItem('has_fixed_photo_v3');
        if (!hasFixedPhoto) {
            console.log("Forcing profile photo update to final version...");
            setArtistProfile(prev => ({ ...prev, photo: "/peakafeller_profile_final.jpg" }));
            localStorage.setItem('has_fixed_photo_v3', 'true');
        }
    }, []); // Run once on mount

    const updateProfile = (newProfileData) => {
        setArtistProfile(prev => ({
            ...prev,
            ...newProfileData
        }));
    };

    const addTrack = (newTrack) => {
        setTracks(prev => [...prev, { ...newTrack, id: Date.now(), isVisible: true }]);
    };

    const deleteTrack = (trackId) => {
        setTracks(prev => prev.filter(t => t.id !== trackId));
    };

    const toggleTrackVisibility = (trackId) => {
        setTracks(prev => prev.map(t =>
            t.id === trackId ? { ...t, isVisible: !(t.isVisible ?? true) } : t
        ));
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
            deleteTrack,
            toggleTrackVisibility,
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
