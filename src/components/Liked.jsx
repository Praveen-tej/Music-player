import { useMusic } from "../contexts/MusicContext";

export default function Liked() {
  const { likedSongs, currentTrack, handlePlaySong, formatTime, isPlaying } =
    useMusic();
  return (
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
              style={{ cursor: "pointer" }}
            >
              {song.title}
            </p>
          ))
        )}
      </div>
    </div>
  );
}