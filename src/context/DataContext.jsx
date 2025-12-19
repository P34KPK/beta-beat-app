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

    const [inviteCode] = useState("XYZ-000"); // Hardcoded for demo

    // Persist to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('artistProfile', JSON.stringify(artistProfile));
    }, [artistProfile]);

    useEffect(() => {
        localStorage.setItem('tracks', JSON.stringify(tracks));
    }, [tracks]);

    const updateProfile = (newProfileData) => {
        setArtistProfile(prev => ({
            ...prev,
            ...newProfileData
        }));
    };

    const addTrack = (newTrack) => {
        setTracks(prev => [...prev, { ...newTrack, id: Date.now() }]);
    };

    return (
        <DataContext.Provider value={{
            artistProfile,
            updateProfile,
            tracks,
            addTrack,
            inviteCode
        }}>
            {children}
        </DataContext.Provider>
    );
};
