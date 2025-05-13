import React, { useEffect, useState, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchBar.js'
import SearchResults from './SearchResults.js';
import mockList from './mockList.js';
import Playlist from './Playlist.js';
import Spotify from './Spotify.js';
//import getSpotifyToken from './Spotify.js';
import SpotifyTwo, { redirectToSpotifyAuth } from './SpotifyTwo.js';




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

  const clientId = '9f4b295396164fb185a1622cb8dca3d3'; // Insert client ID here.
  const clientSecret = '801505fd79994668bdf470e0b0fb156e';
  const authString = btoa(`${clientId}:${clientSecret}`);

  const [trackMap, setTrackMap] = useState([]);

  const [testList, setTestList] = useState();

  const [token, setToken] = useState(null);


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


  //HANDLE SEARCH FUNCTION
  async function handleSearchSpotify(inputValue){
    setUserInput(inputValue);

    const searchTerm = inputValue.toLowerCase();

    const spotifyToken = await Spotify.getSpotifyToken;
    const response = await fetch(`https://api.spotify.com/v1/search?q=remaster%2520ttrack%3A${searchTerm}&type=track`, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`
      }
    });
    const data = await response.json();
    const tracks = data.tracks.items;
    const tracksArray = [];
    for (let i in tracks){
      tracksArray.push(tracks[i]);
    }
    setFilteredResults(tracksArray);

  }

  async function createPlaylist(token, userId, name, description, isPublic) {
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        description: description,
        public: isPublic,
      }),
    });
  
    const data = await response.json();
    console.log("🎵 Playlist creada:", data);
    return data; // contien
    // 
    // e el playlistId, etc.
  }

  async function getUserId(token) {
    const res = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const data = await res.json();
    return data.id;
  }


    
  const handleCreatePlaylist = async (e) => {
    e.preventDefault(); // ← Evita que el formulario se recargue
  
    const token = await Spotify.getSpotifyToken;
    
    const userId = await getUserId(token);

    alert(userId)
    //const playlist = await createPlaylist(token, userId, playlistName, 'Descripción', false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const storedVerifier = localStorage.getItem('spotify_code_verifier');

    if (code && storedVerifier && !token) {
      const body = new URLSearchParams({
        client_id: 'TU_CLIENT_ID',
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'http://127.0.0.1:3000',
        code_verifier: storedVerifier,
      });

      fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      })
        .then(res => res.json())
        .then(data => {
          setToken(data.access_token);
          localStorage.removeItem('spotify_code_verifier');
          window.history.replaceState({}, null, '/'); // limpia la URL
        });
    }
  }, []);





  //const spotifySaveList = [];

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

        <SearchBar onSearch={handleSearchSpotify}/>

        <SearchResults onAdd={addSongToPlaylist} results={filteredResults}/>

        <Playlist setPlaylistName={setPlaylistName} playlistName={playlistName} /*savePlaylist={savePlaylist}*/  songs={playlistSongs} onRemove={removeSongFromPlaylist}/>

        <button onClick={handleCreatePlaylist}>TEST BUTTON</button>

        <h1>Spotify Login con PKCE</h1>
      {!token ? (
        <button onClick={() => redirectToSpotifyAuth()}>
          Iniciar sesión con Spotify
        </button>
      ) : (
        <p>✅ Token obtenido correctamente</p>
      )}
        


        


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
