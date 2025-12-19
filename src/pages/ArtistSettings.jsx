import { useNavigate } from 'react-router-dom';
import ArtistBottomNav from '../components/ArtistBottomNav';
import { useData } from '../context/DataContext';
import { useState } from 'react';

const ArtistSettings = () => {
    const navigate = useNavigate();
    const { artistProfile, updateProfile } = useData();

    // Local state for form management
    const [formData, setFormData] = useState({
        name: artistProfile.name,
        bio: artistProfile.bio,
        instagram: artistProfile.socials.instagram,
        tiktok: artistProfile.socials.tiktok,
        facebook: artistProfile.socials.facebook,
        soundcloud: artistProfile.socials.soundcloud,
        snapchat: artistProfile.socials.snapchat,
        linktree: artistProfile.socials.linktree,
        discord: artistProfile.socials.discord,
        twitter: artistProfile.socials.twitter,
        website: artistProfile.socials.website
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        updateProfile({
            name: formData.name,
            bio: formData.bio,
            socials: {
                instagram: formData.instagram,
                tiktok: formData.tiktok,
                facebook: formData.facebook,
                soundcloud: formData.soundcloud,
                snapchat: formData.snapchat,
                linktree: formData.linktree,
                discord: formData.discord,
                twitter: formData.twitter,
                website: formData.website
            }
        });
        alert('Profile saved!');
    };

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-32 max-w-md mx-auto bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
            <header className="flex items-center justify-between p-4 pb-2 sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5">
                <button onClick={() => navigate(-1)} className="flex size-10 shrink-0 items-center justify-center rounded-full active:bg-black/5 dark:active:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Artist Profile</h2>
            </header>

            <main className="flex-1 flex flex-col gap-6 px-6 pt-6">
                {/* Profile Photo Section */}
                <div className="flex flex-col items-center gap-3">
                    <div className="relative group cursor-pointer">
                        <div className="size-28 rounded-full bg-surface-dark border-2 border-primary/50 relative overflow-hidden">
                            <img
                                src={artistProfile.photo}
                                alt="Profile"
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-50 transition-opacity"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="material-symbols-outlined text-white text-3xl">add_a_photo</span>
                            </div>
                        </div>
                        <div className="absolute bottom-0 right-1 bg-primary text-black p-1.5 rounded-full border-2 border-background-dark">
                            <span className="material-symbols-outlined text-[16px] leading-none">edit</span>
                        </div>
                    </div>
                    <p className="text-sm font-medium text-primary">Change Profile Photo</p>
                </div>

                {/* Form Section */}
                <div className="flex flex-col gap-5">

                    {/* Basic Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Basic Info</h3>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold ml-1">Artist Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full h-12 rounded-2xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 px-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                placeholder="Enter artist name"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold ml-1">Bio</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                className="w-full h-32 rounded-2xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 p-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                                placeholder="Tell your story..."
                            ></textarea>
                            <p className="text-right text-xs text-gray-400">{formData.bio.length}/500</p>
                        </div>
                    </div>

                    <div className="h-px bg-gray-200 dark:bg-white/5 w-full"></div>

                    {/* Social Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Social Connections</h3>

                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 flex items-center justify-center shrink-0">
                                <span className="font-bold">IG</span>
                            </div>
                            <input
                                type="text"
                                name="instagram"
                                value={formData.instagram}
                                onChange={handleChange}
                                placeholder="Instagram"
                                className="flex-1 h-12 rounded-2xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 px-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 flex items-center justify-center shrink-0">
                                <span className="font-bold">TT</span>
                            </div>
                            <input
                                type="text"
                                name="tiktok"
                                value={formData.tiktok}
                                onChange={handleChange}
                                placeholder="TikTok"
                                className="flex-1 h-12 rounded-2xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 px-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 flex items-center justify-center shrink-0">
                                <span className="font-bold">FB</span>
                            </div>
                            <input
                                type="text"
                                name="facebook"
                                value={formData.facebook}
                                onChange={handleChange}
                                placeholder="Facebook"
                                className="flex-1 h-12 rounded-2xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 px-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 flex items-center justify-center shrink-0">
                                <span className="font-bold">SC</span>
                            </div>
                            <input
                                type="text"
                                name="soundcloud"
                                value={formData.soundcloud}
                                onChange={handleChange}
                                placeholder="SoundCloud"
                                className="flex-1 h-12 rounded-2xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 px-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 flex items-center justify-center shrink-0">
                                <span className="font-bold">SN</span>
                            </div>
                            <input
                                type="text"
                                name="snapchat"
                                value={formData.snapchat}
                                onChange={handleChange}
                                placeholder="Snapchat"
                                className="flex-1 h-12 rounded-2xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 px-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 flex items-center justify-center shrink-0">
                                <span className="font-bold">LT</span>
                            </div>
                            <input
                                type="text"
                                name="linktree"
                                value={formData.linktree}
                                onChange={handleChange}
                                placeholder="LinkTree"
                                className="flex-1 h-12 rounded-2xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 px-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 flex items-center justify-center shrink-0">
                                <span className="font-bold">DC</span>
                            </div>
                            <input
                                type="text"
                                name="discord"
                                value={formData.discord}
                                onChange={handleChange}
                                placeholder="Discord"
                                className="flex-1 h-12 rounded-2xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 px-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="h-8"></div> {/* Spacer */}
            </main>

            <div className="fixed bottom-[88px] left-0 right-0 px-6 z-30 max-w-md mx-auto pointer-events-none">
                <button onClick={handleSave} className="pointer-events-auto w-full bg-primary hover:bg-white/90 active:bg-white/80 text-black font-bold h-14 rounded-full shadow-[0_4px_14px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2 transition-transform active:scale-[0.98]">
                    Save Changes
                </button>
            </div>

            <ArtistBottomNav active="settings" />
        </div>
    );
};

export default ArtistSettings;
