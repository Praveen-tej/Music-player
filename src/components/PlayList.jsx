import { useEffect, useRef, useState } from "react";
import { useMusic } from "../contexts/MusicContext";

export default function Playlist() {
  const [newPlayListName, setNewPlayListName] = useState("");
  const [selectedPlayList, setSelectedPlayList] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const {
    playLists,
    createPlaylists,
    allsongs,
    addSongToPlaylist,
    currentTrackIndex,
    handlePlaySong,
    removePlaylist,
  } = useMusic();

  const clickRef = useRef(null)

  useEffect(() => {
    const handler = (e) =>{
      if(clickRef.current && !(clickRef.current.contains(e.target))){
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown",handler)
    return () =>{
      document.removeEventListener("mousedown",handler)
    }
  },[])

  const filteredSongs = allsongs.filter((song) => {
    const matching =
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase());

    const songAlreadyInPlaylist = selectedPlayList?.songs.some(
      (playlistSong) => playlistSong.id === song.id,
    );
    return matching && !songAlreadyInPlaylist;
  });

  const handleCreatePlaylist = () => {
    if (newPlayListName.trim()) {
      createPlaylists(newPlayListName.trim());
      setNewPlayListName("");
    }
  };

  const handleAddSong = (song) => {
    if (selectedPlayList) {
      addSongToPlaylist(selectedPlayList.id, song);
      setSearchQuery("");
      setShowDropdown(false);
    }
  };

  const handlePlayFromPlaylist = (song) => {
    const globalIndex = allsongs.findIndex((s) => s.id === song.id);
    handlePlaySong(song, globalIndex);
  };

  const deletePlaylistmessage = (playlist) => {
    if (window.confirm(`Are you sure to delete "${playlist.name}" playlist?`)) {
      removePlaylist(playlist.id);
    }
  };

  return (
    <div className="all-songs">
      <h2>Play List</h2>

      {/* Create form */}
      <div className="playlist-form">
        <input
          type="text"
          placeholder="Playlist Name..."
          className="playlist0input"
          onChange={(e) => setNewPlayListName(e.target.value)}
          value={newPlayListName}
        />
        <button className="create-btn" onClick={handleCreatePlaylist}>
          Create
        </button>
      </div>

      {/* Playlist list */}
      <div className="playlist-list">
        {playLists.length === 0 ? (
          <p className="empty-message">No Playlists created Yet</p>
        ) : (
          playLists.map((Playlist) => (
            <div className="playlist-item" key={Playlist.id}>
              <div className="plalist-header">
                <h3>{Playlist.name}</h3>
                <div className="playlist-actions">
                  <button
                    className="delete-btn"
                    onClick={() => deletePlaylistmessage(Playlist)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Search box */}
              <div className="add-song-selection">
                <div className="search-container" ref={clickRef} >
                  <input
                    type="text"
                    placeholder="search songs to add..."
                    value={
                      selectedPlayList?.id === Playlist.id ? searchQuery : ""
                    }
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSelectedPlayList(Playlist);
                    }}
                    onFocus={(e) => {
                      setSelectedPlayList(Playlist);
                      setShowDropdown(true);
                    }}
                    className="song-search-input"
                  />

                  {/* Dropdown */}
                  {selectedPlayList?.id === Playlist.id && showDropdown && (
                    <div className="song-dropdown">
                      {filteredSongs.length === 0 ? (
                        <div className="dropdown-item no-results">
                          No songs found
                        </div>
                      ) : (
                        filteredSongs.map((song) => (
                          <div
                            key={song.id}
                            className="dropdown-item"
                            onClick={() => handleAddSong(song)}
                          >
                            <span className="song-title">{song.title}</span>
                            <span className="song-artist">{song.artist}</span>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Songs in playlist */}
              <div className="playlist-songs">
                {Playlist.songs.length === 0 ? (
                  <p className="empty-message">No Songs in the Playlist</p>
                ) : (
                  Playlist.songs.map((song) => (
                    <div
                      key={song.id}
                      className={`playlist-song ${currentTrackIndex === allsongs.findIndex((s) => s.id === song.id) ? "active" : ""}`}
                      onClick={() => handlePlayFromPlaylist(song)}
                    >
                      <div className="playlist-song-info">
                        <span className="song-title">{song.title}</span>
                        <span className="song-artist">{song.artist}</span>
                      </div>
                      <span className="song-duration">{song.duration}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
