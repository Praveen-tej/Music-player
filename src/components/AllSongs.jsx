import { useMusic } from "../contexts/MusicContext";

export const Allsongs = () => {
  const { allsongs, currentTrack, currentTrackIndex, handlePlaySong } = useMusic();

  return (
    <div className="all-songs">
      <h2>All Songs ({allsongs.length})</h2>
      <div className="all-songs-grid">
        {allsongs.map((song, index) => (
          <div
            key={song.id}
            className={`song-row ${currentTrackIndex === index ? "active-row" : ""}`}
            onClick={() => handlePlaySong(song, index)}
          >
            <div className="song-row-left">
              <div className="song-row-number">
                {currentTrackIndex === index ? (
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
            <span className="song-row-duration">{song.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
};