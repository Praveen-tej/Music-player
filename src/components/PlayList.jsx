import { useState } from "react";
import { useMusic } from "../contexts/MusicContext";

export default function Playlist() {
  const [newPlayListName, setNewPlayListName] = useState("");
  const [selectedPlayList, setSelectedPlayList] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const { playLists, createPlaylists, allsongs } = useMusic();

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

  return (
    <div>
      <div className="all-songs">
        <h2>Play List</h2>
      </div>
      <div>
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
      </div>

      {/* Playlist lits */}
      <div className="playlist-list">
        {playLists.length === 0 ? (
          <p className="empty-message">No Playlists created Yet</p>
        ) : (
          playLists.map((Playlist, key) => (
            <div className="playlist-item" key={key}>
              <div className="plalist-header">
                <h3>{Playlist.name}</h3>
                <div className="playlist-actions">
                  <button className="delete-btn">Delete</button>
                </div>
              </div>

              {/* Add song search */}
              <div className="add-song-selection">
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="search songs to add..."
                    value={
                      selectedPlayList?.id === Playlist.id ? searchQuery : ""
                    }
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSelectedPlayList(Playlist);
                      setShowDropdown(e.target.value.length > 0);
                    }}
                    onFocus={() => {
                      setSelectedPlayList(Playlist);
                      setShowDropdown(e.target.value.length > 0);
                    }}
                    className="song-search-input"
                  />
                  {selectedPlayList?.id === Playlist.id && showDropdown && (
                    <div className="song-dropdown">
                      {filteredSongs.length === 0 ? (
                        <div className="dropdown-item no-results">
                          No songs Found
                        </div>
                      ) : (
                        filteredSongs.map((song, key) => (
                          <div key={key} className="dropdown item">
                            <span className="song-title">{song.title}</span>
                            <span className="song-artist">{song.artist}</span>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
