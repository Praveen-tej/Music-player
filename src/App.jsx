import {Allsongs} from "./components/AllSongs";
import Playlist from "./components/PlayList";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
      <div className="player-section">
        <Navbar />
      </div>

      <div className="content-section">
      <Routes>
        <Route path="/" element={<Allsongs/>} />
        <Route path="/playlist" element={<Playlist/>} />
      </Routes>
      </div>
      </BrowserRouter>
    </>
  );
}

export default App;