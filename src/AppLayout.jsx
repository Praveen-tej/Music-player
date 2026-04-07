import { Home } from "./components/Home";
import { Allsongs } from "./components/AllSongs";
import Playlist from "./components/PlayList";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Player } from "./components/Player";
import { MusicProvider } from "./contexts/MusicContext";

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <MusicProvider>
      <BrowserRouter>
        <Navbar />
        <div className="main-content">
          <div className={isHome ? "audio-player small" : "audio-player"}>
            <Player />
          </div>

          <div className="content-section">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/playlist" element={<Playlist />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </MusicProvider>
  );
}

export default App;
