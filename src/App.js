import React, { useState, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchBar.js'
import SearchResults from './SearchResults.js';
import mockList from './mockList.js';
import Playlist from './Playlist.js';


function App() {
  //HOOKS:
  //User input: gets value from the searchInput component.
  const [userInput, setUserInput] = useState('');
  //Filtered results: is setted after submiting the userInput clicking on searchbutton.
  const [filteredResults, setFilteredResults] = useState([]);
  //PlaylistSongs: it updates every time the user clicks on the 'add' button from the filtered results, or the remove button from the playlist.
  const [playlistSongs, setPlaylistSongs] = useState([]);
  
  const [playlistName, setPlaylistName] = useState('');

  //FUNCTIONS

  // addSongToPLaylist uses 'setPlaylistSongs' hook to update the playlist adding songs.
  const addSongToPlaylist = (song)=>{
    if (!playlistSongs.some((s) => s.id === song.id)) {
      setPlaylistSongs([...playlistSongs, song]);
    }
  }
  //removeSongFromPLaylist uses 'setPlaylistSongs' hook to update the playlist removing songs
  const removeSongFromPlaylist = (songId) => {
    setPlaylistSongs(playlistSongs.filter((song) => song.id !== songId));
  };

  const alertTest = () => {
    alert('it works!')
  }

  //handleSearch: it handles the submition of the searchBar form. When the user clicks on the searchButton, handleSearch lowercases the text and compare it to the data base (mock list for now) and filter the results.
  const handleSearch = (inputValue) => {
    setUserInput(inputValue);

    const searchTerm = inputValue.toLowerCase();

    const results = mockList.filter((song) =>
    Object.values(song).some((value) => String(value).toLowerCase().includes(searchTerm)));

    setFilteredResults(results);

  }

  const savePlaylist = useCallback(() => {
    const trackUris = playlistSongs.map((song) => song.uri);
    mockList.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistSongs([]);
    });
  }, [playlistName, playlistSongs]);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <h2>JAMMING</h2>

        <SearchBar onSearch={handleSearch}/>

        <SearchResults onAdd={addSongToPlaylist} results={filteredResults}/>

        <Playlist savePlaylist={savePlaylist} alertTest={alertTest} songs={playlistSongs} onRemove={removeSongFromPlaylist}/>

        


        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
