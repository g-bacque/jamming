import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchBar.js'
import SearchResults from './SearchResults.js';
import Playlist from './Playlist.js';
import { redirectToSpotifyAuth } from './SpotifyLogin';




//REACT COMPONENT:
function App() {

  //HOOKS:

  //User input: gets value from the searchInput component.
  const [userInput, setUserInput] = useState();
  //Filtered results: is setted after submiting the userInput clicking on searchbutton.
  const [filteredResults, setFilteredResults] = useState([]);
  //PlaylistSongs: it updates every time the user clicks on the 'add' button from the filtered results, or the remove button from the playlist.
  const [playlistSongs, setPlaylistSongs] = useState([]);
  
  const [playlistName, setPlaylistName] = useState('');

  //const clientId = '9f4b295396164fb185a1622cb8dca3d3'; // Insert client ID here.

  const [token, setToken] = useState(null);

  const [authInProgress, setAuthInProgress] = useState(false);

  
  //------------------------------------------------------------

  //FUNCTIONS:

  //HANDLE SEARCH FUNCTION
  async function handleSearchSpotify(inputValue){
    setUserInput(inputValue);

    const searchTerm = userInput.toLowerCase();

    const spotifyToken = token;
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
    if (!response.ok) {
      console.error("❌ Error al crear playlist:", data);
      throw new Error(data.error?.message || 'Error creando playlist');
    }
  
    console.log("🎵 Playlist creada:", data);
    return data;
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

  async function addTracksToPlaylist(token, playlistId, uris) {
    const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uris: uris
      })
    });
  
    const data = await res.json();
    console.log("🎶 Canciones añadidas:", data);
  }
  


    
  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
  
    const spotifyToken = token;
    const spotifyPlaylistName = playlistName;
  
    try {
      const userId = await getUserId(spotifyToken);
      const playlist = await createPlaylist(spotifyToken, userId, spotifyPlaylistName, 'Descripción', true);
      
      const uris = playlistSongs.map(song => song.uri);
  
      if (uris.length > 0) {
        await addTracksToPlaylist(spotifyToken, playlist.id, uris);
        alert('✅ Playlist creada y canciones añadidas.');
      } else {
        alert('🆗 Playlist creada, pero no se añadieron canciones (lista vacía).');
      }
    } catch (error) {
      console.error("❌ Error creando playlist:", error);
      alert('Hubo un problema creando la playlist.');
    }
  };
  


  //FUNCION PARA INCIAR SESION EN SPORIFY:
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const verifier = localStorage.getItem('spotify_code_verifier');

    if (code && verifier && !token) {
      const body = new URLSearchParams();
      body.append('client_id', '9f4b295396164fb185a1622cb8dca3d3');
      body.append('grant_type', 'authorization_code');
      body.append('code', code);
      body.append('redirect_uri', 'http://127.0.0.1:3000');
      body.append('code_verifier', verifier);

      fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      })
        .then(res => res.json())
        .then(data => {
          console.log('🔐 Token response:', data);
          if (data.access_token) {
            setToken(data.access_token);
            localStorage.removeItem('spotify_code_verifier');
            window.history.replaceState({}, null, '/');
          } else {
            console.error("❌ Error al obtener token:", data);
          }
        });
    }
  }, [token]);

  const handleLogin = async () => {
    setAuthInProgress(true);
    await redirectToSpotifyAuth(); // redirige fuera, no volverá a esta línea
  };


  //TEST FUNCIONTS:

  function showToken(){
    alert(token);
  }


  //RETURN:
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

       
        <div className='navegationbar'>
          <h2>JAMMING</h2>
          <SearchBar onSearch={handleSearchSpotify}/>
        </div>

        <div className='appcontainer'>
          <div className='leftSide'>
            <SearchResults onAdd={addSongToPlaylist} results={filteredResults}/>
          </div>
          <div className='rightside'>
            <Playlist setPlaylistName={setPlaylistName} playlistName={playlistName} savePlaylist={handleCreatePlaylist}  songs={playlistSongs} onRemove={removeSongFromPlaylist}/>
          </div>
        </div>


        


      {!token ? (
        <button onClick={handleLogin} disabled={authInProgress}>
        Iniciar sesión con Spotify
      </button>

      ) : (
        <p>✅ Token obtenido correctamente</p>
      )}

      <button onClick={showToken}>show token</button>
        


        


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
