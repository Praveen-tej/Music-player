import { useEffect, useRef } from "react";
import { useMusic } from "../hooks/useMusic";

export const Player = () => {
  const { currentTrack, 
    formatTime, 
    currentTime, 
    duration , 
    setDuration , 
    setCurrentTrack , 
    setCurrentTime ,
     prevTrack , 
     nextTrack,
     play,
     pause,
     isPlaying
    } = useMusic();
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if(!audio) return 

    if(isPlaying){
        audio.play().catch((err) => console.log(err))
    }
    else{
        audio.pause()
    }

  },[isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if(!audio) return 

    const handleLoadMetadata = () => {
        setDuration(audio.duration)
    }

    const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
    }

    audio.addEventListener("loadedmetadata" , handleLoadMetadata)

    return () => {
        audio.removeEventListener("loadedmetadata" , handleLoadMetadata)
    }

  },[setDuration , setCurrentTrack , currentTrack])

  return (
    <div className="music-player">
      <audio  ref={audioRef} src={currentTrack.url}  preload="metadata" crossOrigin="anonymous" />

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
        />
        <span className="duration">{formatTime(duration)}</span>
      </div>
      <div className="controls" >
        <div className="control-prev" onClick={prevTrack} >⏮</div>
        <div className="control-play" onClick={() => (isPlaying) ? pause() : play()}>{isPlaying ? "⏸" : "▶" }</div>
        <div className="control-next" onClick={nextTrack} >⏭</div>
      </div>
    </div>
  );
}; 