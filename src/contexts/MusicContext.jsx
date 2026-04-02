import { createContext, useContext, useEffect, useState } from "react";

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [allsongs, setAllsongs] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1);
  const [playLists, setPlayList] = useState([]);
  const [loopMode, setLoopMode] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading , setIsLoading] = useState(true);

  const filteredSongs = allsongs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetch(
      `https://api.jamendo.com/v3.0/tracks/?client_id=5e2ae395&format=json&limit=20`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        const formattedSongs = data.results.map((track) => ({
          id: track.id,
          title: track.name,
          artist: track.artist_name,
          url: track.audio,
          duration: track.duration,
        }));
        setAllsongs(formattedSongs);
        setCurrentTrack(formattedSongs[0]);
        setIsLoading(false)
      })
      .catch((err) => console.log("Error Message :", err));
  }, []);

  useEffect(() => {
    const savedPlaylist = localStorage.getItem("musicPlayerPlaylist");
    if (savedPlaylist) {
      const playLists = JSON.parse(savedPlaylist);
      setPlayList(playLists);
    }
  }, []);

  useEffect(() => {
    if (playLists.length > 0) {
      localStorage.setItem("musicPlayerPlaylist", JSON.stringify(playLists));
    } else {
      localStorage.removeItem("musicPlayerPlaylist");
    }
  }, [playLists]);

  const handlePlaySong = (song, index) => {
    setCurrentTrack(song);
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setSearchTerm("")
  };

  const nextTrack = (shouldPlay) => {
    if (currentTrackIndex === allsongs.length - 1) {
      setCurrentTrackIndex(0);
      setCurrentTrack(allsongs[0]);
    } else {
      setCurrentTrackIndex(currentTrackIndex + 1);
      setCurrentTrack(allsongs[currentTrackIndex + 1]);
    }
    setIsPlaying(false);
  };

  const prevTrack = () => {
    if (currentTrackIndex === 0) {
      setCurrentTrackIndex(allsongs.length - 1);
      setCurrentTrack(allsongs[allsongs.length - 1]);
    } else {
      setCurrentTrackIndex(currentTrackIndex - 1);
      setCurrentTrack(allsongs[currentTrackIndex - 1]);
    }
    setIsPlaying(false);
  };

  const loopEvent = () => {
    if (loopMode === "none") {
      setLoopMode("all");
    } else if (loopMode === "all") {
      setLoopMode("one");
    } else {
      setLoopMode("none");
    }
  };

  const formatTime = (time) => {
    if (isNaN(time) || time === undefined) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const createPlaylists = (name) => {
    const newPlaylist = {
      id: Date.now(),
      name,
      songs: [],
    };

    setPlayList((prev) => [...prev, newPlaylist]);
  };

  const addSongToPlaylist = (playlistId, song) => {
    setPlayList((prev) =>
      prev.map((playlist) => {
        if (playlist.id === playlistId) {
          return { ...playlist, songs: [...playlist.songs, song] };
        } else {
          return playlist;
        }
      }),
    );
  };

  const removePlaylist = (playlistId) => {
    setPlayList((prev) =>
      prev.filter((playlist) => playlist.id !== playlistId),
    );
  };

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  return (
    <MusicContext.Provider
      value={{
        allsongs,
        handlePlaySong,
        currentTrack,
        currentTrackIndex,
        formatTime,
        currentTime,
        duration,
        setDuration,
        setCurrentTrack,
        setCurrentTime,
        nextTrack,
        prevTrack,
        play,
        pause,
        isPlaying,
        setIsPlaying,
        volume,
        setVolume,
        playLists,
        setPlayList,
        createPlaylists,
        addSongToPlaylist,
        removePlaylist,
        loopMode,
        setLoopMode,
        loopEvent,
        filteredSongs,
        searchTerm,
        setSearchTerm,
        isLoading
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const contextValue = useContext(MusicContext);

  if (!contextValue) {
    throw new Error("useMusic must be inside MusicProvider");
  }

  return contextValue;
};
