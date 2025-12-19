import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

const initialArtistProfile = {
    name: "The Weeknd",
    bio: "Global superstar. Testing new sounds for the next era.",
    photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbjdHnzRjSCUvUK5qdqxGw0IzOaJgerou5YGSEAt8rt9dksWdUHnKR_MwsNaBhL5zTLooPJQ3Y17PWQDvh_S8j4Egx0DJEnuF93Xs8zTE90K5m5q41Mi4mTpji2waMba0AYmoDJAGWRRLi_3gQh0cJ1CwotDnKy6dr8xdvfzv34jMTKlm5s14Konro7moagYNdNgbhC7btc6BVc_uvCcqQ8d77nQVAJgrfrRz79A9O2NvytH-EzlDx5GRrmVmSs4xn4CIyvrFedFme",
    socials: {
        instagram: "",
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
