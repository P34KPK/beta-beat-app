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
        testers: 142,
        tracks: 3,
        score: 8.7
    }
};

const initialTracks = [
    {
        id: 1,
        title: "Midnight Drive (Demo)",
        version: "v1.2",
        type: "Single",
        cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1JsYhn52C2ORr15d9_VZnuwQZMhMITRfi7JyppOheuWARbx4tYwEW4SrI4hIuCYSD6GL6qKG5CEgOug6Izy9KMCSW0knJr9wea6Ver6LmpGdpac6RQ5BlmhvXGbKOdN1ECFF2uyulNOPqhMhGCsKVDx19Iii0MZl_S5XQH-kR16ZMkgN1bXfPVLJnMG4mekd8W56vXdSwJ3owHOlcPiha8mmsDqEk4iG7uKKBn5n1NHraLaqUMwBc_ic4p4oQS7-0V7CGnteXbYUp",
        active: true
    },
    {
        id: 2,
        title: "Synthwave V2",
        version: "Mix 3",
        type: "Single",
        cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJzkbpUYWg1kv3f7vsz6hjSKO4Ib_3iCTAVfLAgB4bdlV-fezP2eYTUC8JjzJY1Ev_SJG13Its2HpYIVgXsWGjXzp6lWXbJA-rT0v1LokNgFBh1K4grtPjfZrB6C0xmAcVplL-DcO6WYBKyU3FYeAiiHCC55NTG7lNbz9EQzE307RsY157adIYGRziDkrTxF0JdG-AGfHhRVNVttta08d1Nrqabrd4QLh4919FsRCPinG17O0cVmZw8Q6U6xptu6JwDT7caG4axYeg",
        active: true
    }
];

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
