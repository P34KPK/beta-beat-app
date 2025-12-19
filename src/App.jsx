import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import ArtistDashboard from './pages/ArtistDashboard';
import ArtistTracks from './pages/ArtistTracks';
import ArtistFeedback from './pages/ArtistFeedback';
import ArtistABSetup from './pages/ArtistABSetup';
import ArtistSettings from './pages/ArtistSettings';
import ArtistStats from './pages/ArtistStats';
import TesterAccess from './pages/TesterAccess';
import TesterHome from './pages/TesterHome';
import TesterPlayer from './pages/TesterPlayer';
import TesterFeedback from './pages/TesterFeedback';
import TesterSupport from './pages/TesterSupport';
import TesterProfile from './pages/TesterProfile';

import { DataProvider } from './context/DataContext';

function App() {
  const location = useLocation();

  return (
    <DataProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />

          {/* Artist Flows */}
          <Route path="/artist-dashboard" element={<ArtistDashboard />} />
          <Route path="/artist-tracks" element={<ArtistTracks />} />
          <Route path="/artist-feedback" element={<ArtistFeedback />} />
          <Route path="/artist-ab-setup" element={<ArtistABSetup />} />
          <Route path="/artist-settings" element={<ArtistSettings />} />
          <Route path="/artist-stats" element={<ArtistStats />} /> {/* Added route */}

          {/* Tester Flows */}
          <Route path="/tester-access" element={<TesterAccess />} />
          <Route path="/tester-home" element={<TesterHome />} />
          <Route path="/tester-player" element={<TesterPlayer />} />
          <Route path="/tester-feedback" element={<TesterFeedback />} />
          <Route path="/tester-support" element={<TesterSupport />} />
          <Route path="/tester-profile" element={<TesterProfile />} />
        </Routes>
      </AnimatePresence>
    </DataProvider>
  );
}

export default App;
