import { useMusic } from "../contexts/MusicContext";
import { useState, useEffect, useRef } from "react";
import useClickOutside from "./useClickOutside";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

const getGreetingEmoji = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "🌅";
  if (hour < 17) return "☀️";
  return "🌙";
};

export const Home = () => {
  const {
    allsongs,
    handlePlaySong,
    currentTrack,
    isPlaying,
    play,
    filteredSongs,
    searchTerm,
    setSearchTerm,
    formatTime,
    song,
  } = useMusic();

  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  useClickOutside(searchRef, () => setShowDropdown(false))
  // Show first 4 songs as "recently played"
  const recentSongs = allsongs.slice(0, 4);

  // Show all songs in the grid
  const allSongsPreview = allsongs;

  const handleSongClick = (song, index) => {
    if (currentTrack?.id === song.id) {
      play(); // if same song, just play
    } else {
      handlePlaySong(song, index);
      setTimeout(() => play(), 100);
    }
  };

  return (
    <div className="home-page">
      {/* Greeting Section */}
      <div className="home-greeting">
        <div className="greeting-row">
          {/* LEFT SIDE */}
          <div className="greeting-left">
            <h1 className="greeting-title">
              {getGreetingEmoji()} {getGreeting()}
            </h1>
            <p className="greeting-subtitle">What do you want to play today?</p>
          </div>

          {/* RIGHT SIDE */}
          <div className="search-container" ref={searchRef} >
            <input
              className="search"
              type="text"
              placeholder="Search Songs to Play..."
              value={searchTerm}
              onChange={(e) => {setSearchTerm(e.target.value)
              setShowDropdown(true)}}
              onFocus={() => setShowDropdown(true)}

            />
            { showDropdown &&(
              <div className="song-dropdown">
                {filteredSongs.length > 0 ? 
                (
                  filteredSongs.slice(0,10).map((song, index) => (
                    <div
                      key={index}
                      className="dropdown-item"
                      onClick={() => handlePlaySong(song)}
                    >
                      <div>
                        <p className="song-title">{song.title}</p>
                        <p className="song-artist">{song.artist}</p>
                      </div>
                      <span className="search-play">▶</span>
                    </div>
                  ))
                ) : (
                  <div className="dropdown-item no-results">No songs found</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recently Played Section */}
      <section className="home-section">
        <h2 className="section-title">Recently Played</h2>
        <div className="recently-played">
          {recentSongs.map((song, index) => (
            <div
              key={song.id}
              className={`recent-card ${currentTrack?.id === song.id ? "active-card" : ""}`}
              onClick={() => handleSongClick(song, index)}
            >
              <div className="card-art">
                <span className="card-art-icon">🎵</span>
                {currentTrack?.id === song.id && isPlaying && (
                  <div className="playing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                )}
                {!(currentTrack?.id === song.id && isPlaying) && (
                  <div className="card-play-btn">▶</div>
                )}
              </div>
              <div className="card-info">
                <p className="card-title">{song.title}</p>
                <p className="card-artist">{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Songs Section */}
      <section className="home-section">
        <h2 className="section-title">All Songs</h2>
        <div className="all-songs-grid">
          {allSongsPreview.map((song, index) => (
            <div
              key={song.id}
              className={`song-row ${currentTrack?.id === song.id ? "active-row" : ""}`}
              onClick={() => handleSongClick(song, index)}
            >
              <div className="song-row-left">
                <div className="song-row-number">
                  {currentTrack?.id === song.id && isPlaying ? (
                    <div className="mini-bars">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  ) : (
                    <span className="row-num">{index + 1}</span>
                  )}
                </div>
                <div className="song-row-icon">🎵</div>
                <div className="song-row-info">
                  <p className="song-row-title">{song.title}</p>
                  <p className="song-row-artist">{song.artist}</p>
                </div>
              </div>
              <span className="song-row-duration">
                {formatTime(song.duration)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
