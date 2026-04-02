import { Home } from "./components/Home";
import { Allsongs } from "./components/AllSongs";
import Playlist from "./components/PlayList";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Player } from "./components/Player";
import { MusicProvider, useMusic } from "./contexts/MusicContext";
import { Loader } from "./components/Loader";

function AppLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const { isLoading } = useMusic();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className="main-content">
        <div className={isHome ? "audio-player small" : "audio-player"}>
          <Player />
        </div>
        <div className="content-section">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allsongs" element={<Allsongs />} />
            <Route path="/playlist" element={<Playlist />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <MusicProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </MusicProvider>
  );
}

export default App;
