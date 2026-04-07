import { useEffect } from "react";
import { useMusic } from "../contexts/MusicContext";

export default function Liked() {
  const {
    likedSongs,
    currentTrack,
    handlePlaySong,
    formatTime,
    isPlaying,
    setLikedSongs,
    removeLikedSongs,
  } = useMusic();

  return (
    <>
      <div className="all-songs">
        <h2>Liked Songs ❤️ ({likedSongs.length})</h2>
        <div className="all-songs-grid">
          {likedSongs.length === 0 ? (
            <p className="empty-message">
              Add your Favourite songs to enjoy the listening Non stop
            </p>
          ) : (
            likedSongs.map((song, index) => (
              <p
                key={song.id}
                onClick={() => handlePlaySong(song)}
                style={{ cursor: "pointer", color: "white" }}
              >
                {song.title}
                <button className="removeLikedsongs"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeLikedSongs(song.id);
                  }}
                >
                  Delete
                </button>
              </p>
            ))
          )}
        </div>
      </div>
    </>
  );
}
