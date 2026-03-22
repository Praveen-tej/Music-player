import {Allsongs} from "./components/AllSongs";
import Playlist from "./components/PlayList";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Player } from "./components/Player";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="main-content">        
        <div className="audio-player">
          <Player />
        </div>
        <div className="content-section">
          <Routes>
            <Route path="/" element={<Allsongs />} />
            <Route path="/playlist" element={<Playlist />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
export default App