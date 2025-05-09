import React, { useEffect, useState, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchBar.js'
import SearchResults from './SearchResults.js';
import mockList from './mockList.js';
import Playlist from './Playlist.js';
import Spotify from './Spotify.js';
//import getSpotifyToken from './Spotify.js'



//REACT COMPONENT:
function App() {



  //HOOKS:

  //User input: gets value from the searchInput component.
  const [userInput, setUserInput] = useState('');
  //Filtered results: is setted after submiting the userInput clicking on searchbutton.
  const [filteredResults, setFilteredResults] = useState([]);
  //PlaylistSongs: it updates every time the user clicks on the 'add' button from the filtered results, or the remove button from the playlist.
  const [playlistSongs, setPlaylistSongs] = useState([]);
  
  const [playlistName, setPlaylistName] = useState('');

  const [savePlaylist, setSavePlaylist] = useState('');

  /*async function spotifyToken(){
    const spotifyToken = await getSpotifyToken();
    return spotifyToken;
  }*/



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
    setSavePlaylist(playlistName);
    alert(`PLaylistname is ${playlistName} and saved play list name is ${savePlaylist}`);
  }

  //handleSearch: it handles the submition of the searchBar form. When the user clicks on the searchButton, handleSearch lowercases the text and compare it to the data base (mock list for now) and filter the results.
  

  /*async function handleSearch(inputValue){
    const spotifyResult = Spotify.search(inputValue);
    alert(spotifyResult);
  }*/

  
  const handleSearch = (inputValue) => {
    setUserInput(inputValue);

    const searchTerm = inputValue.toLowerCase();

    const results = mockList.filter((song) =>
    Object.values(song).some((value) => String(value).toLowerCase().includes(searchTerm)));

    setFilteredResults(results);

  }


  
// Esta es tu función personalizada para buscar en Spotify
/*function search(inputValue) {
  setUserInput(inputValue);
  const searchTerm = inputValue.toLowerCase();
  const accessToken = Spotify.getAccessToken();
  
  
  return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }).then(response => {
    return response.json();
  }).then(jsonResponse => {
    if (!jsonResponse.tracks) {
      return [];
    }
    return jsonResponse.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri
    }));
  });
}*/

/*// Esta es la función que usas en SearchBar como onSearch
function handleSearch(inputValue) {
  search(inputValue).then(results => {
    setFilteredResults(results);
  });
}*/


  const spotifySaveList = [];

  /*const savePlaylist = () => {
    const trackUris = playlistSongs.map((song)=> song.uri);
    setPlaylistName = 
  }*/

  /*const savePlaylist = useCallback(() => {
    const trackUris = playlistSongs.map((song) => song.uri);
    mockList.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistSongs([]);
    });
  }, [playlistName, playlistSongs]);*/
  

  //RETURN:
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

        <Playlist setPlaylistName={setPlaylistName} playlistName={playlistName} /*savePlaylist={savePlaylist}*/ alertTest={alertTest} songs={playlistSongs} onRemove={removeSongFromPlaylist}/>

        


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
