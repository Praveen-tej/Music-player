import { useEffect, useRef } from "react";
import { useMusic } from "../contexts/MusicContext";

export const Player = () => {
  const loopIcons = {
    none: "➡️",
    all: "🔁",
    one: "🔂",
  };

  const {
    currentTrack,
    formatTime,
    currentTime,
    duration,
    setDuration,
    setCurrentTrack,
    currentTrackIndex,
    setCurrentTime,
    prevTrack,
    nextTrack,
    play,
    pause,
    isPlaying,
    setIsPlaying,
    volume,
    setVolume,
    loopMode,
    setLoopMode,
    loopEvent,
  } = useMusic();

  const audioRef = useRef(null);

  const handleTimeChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // audio.load();
    setCurrentTime(0);
    setDuration(0);

    if (isPlaying) {
      audio.play().catch((err) => console.log("Play error:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      if (loopMode === "one") {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else if (loopMode === "all") {
        nextTrack();
        setTimeout(() => play(),100)
      }
    };

    audio.addEventListener("loadedmetadata", handleLoadMetadata);
    audio.addEventListener("canplay", handleLoadMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadMetadata);
      audio.removeEventListener("canplay", handleLoadMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [setDuration, setCurrentTrack, currentTrack, nextTrack, loopMode]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.load();
    setCurrentTime(0);
    setDuration(0);
  }, [currentTrack]);

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  return (
    <div className="music-player">
      <audio ref={audioRef} src={currentTrack.url} preload="metadata" />

      <div className="track-info">
        <h3 className="track-title">{currentTrack.title}</h3>
        <p className="track-artist">{currentTrack.artist}</p>
      </div>

      <div className="progress-container">
        <span className="time">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={currentTime}
          className="progress-bar"
          onChange={handleTimeChange}
          style={{ "--progress": `${progressPercentage}%` }}
        />
        <span className="duration">{formatTime(duration)}</span>
      </div>
      <div className="controls">
        <span className="loop" onClick={loopEvent}>
          {loopIcons[loopMode]}
        </span>
        <div className="control-prev" onClick={prevTrack}>
          ⏮
        </div>
        <div
          className="control-play"
          onClick={() => (isPlaying ? pause() : play())}
        >
          {isPlaying ? "⏸" : "▶"}
        </div>
        <div className="control-next" onClick={nextTrack}>
          ⏭
        </div>
      </div>
      <div className="volume-container">
        <span className="volume-icon">🔊</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          className="volume-bar"
          value={volume}
          style={{ "--volume": volume }}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};
