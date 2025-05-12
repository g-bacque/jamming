import React, { useEffect, useState, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchBar.js'
import SearchResults from './SearchResults.js';
import mockList from './mockList.js';
import Playlist from './Playlist.js';
//import Spotify from './Spotify.js';
import getSpotifyToken from './Spotify.js';



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

  

  /*async function spotifyToken(){
    const spotifyToken = await getSpotifyToken();
    return spotifyToken;
  }*/





    /*function search(userInput) {
      async function getSpotifyToken() {
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${authString}`
          },
          body: 'grant_type=client_credentials'
        });
      
        const data = await response.json();
        const spotifyToken = data.access_token;
        return spotifyToken;
      }
      const accessToken = getSpotifyToken();
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${userInput}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        }
        setTrackMap(jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        })));
      });
    };*/



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

  async function handleSearchTwo() {
    const spotifyToken = await getSpotifyToken();
    const response = await fetch('https://api.spotify.com/v1/search?q=remaster%2520track%3AGiros%2520artist%3AFito%2520Paez&type=album', {
      headers: {
        Authorization: `Bearer ${spotifyToken}`
      }
    });
    const data = await response.json();
    const albums = data.albums.items;
    const albumsArray = [];
    for (let i in albums){
      albumsArray.push(albums[i]);
    }
    const albumData = Object.keys(albumsArray[0])
    alert(`${albumsArray[0].id}, ${albumsArray[0].name}, ${albumsArray[0].artists[0]}`);
    //alert(albums[2].name);
  }

  async function alertTest() {
    const spotifyToken = await getSpotifyToken();
    /*const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${authString}`
      },
      body: 'grant_type=client_credentials'
    });
  
    const data = await response.json();
    const spotifyToken = data.access_token;*/
    alert(spotifyToken);
  }

  /*const alertTest = () => {
    
    alert(spotifyToken)
    setSavePlaylist(playlistName);
    alert(`PLaylistname is ${playlistName} and saved play list name is ${savePlaylist}`);
  }*/

  //handleSearch: it handles the submition of the searchBar form. When the user clicks on the searchButton, handleSearch lowercases the text and compare it to the data base (mock list for now) and filter the results.
  

  /*async function handleSearch(inputValue){
    const spotifyResult = Spotify.search(inputValue);
    alert(spotifyResult);
  }*/

    async function handleSearchZ() {
      
      //setUserInput(inputValue);
      //const searchTerm = inputValue.toLowerCase();
      const track = 'Doxy';
      const artist = 'Miles Davis';
      const query = encodeURIComponent(`track:${track} artist:${artist}`);
      const url = `https://api.spotify.com/v1/search?q=${query}&type=album`;      
      const spotifyToken = await getSpotifyToken();
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${spotifyToken}`
        }
      });
      const data = await response.json();
      const albums = data.albums.items;
      for (let i in albums){
        alert(`nº${i} album`)
      }
      //alert(albums[0].name);

  
    }

  
  const handleSearch = (inputValue) => {
    setUserInput(inputValue);

    const searchTerm = inputValue.toLowerCase();

    const results = mockList.filter((song) =>
    Object.values(song).some((value) => String(value).toLowerCase().includes(searchTerm)));

    setFilteredResults(results);

  }

  async function handleSearchSpotify(inputValue){
    setUserInput(inputValue);

    const searchTerm = inputValue.toLowerCase();

    const spotifyToken = await getSpotifyToken();
    const response = await fetch(`https://api.spotify.com/v1/search?q=remaster%2520ttrack%3A${searchTerm}&type=track`, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`
      }
    });
    const data = await response.json();
    const tracks = data.tracks.items;
    const tracksArray = [];
    for (let i in tracks){
      tracksArray.push({'artist': tracks[i].artists[0].name, 'track':tracks[i].name});
    }
    //const albumData = Object.keys(albumsArray[0])
    alert(tracksArray[0].artist + ' - ' + tracksArray[0].track)
    //alert(`${albumsArray[0].id}, ${albumsArray[0].name}, ${albumsArray[0].artists[0]}`);
    //alert(albums[2].name);
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

        <SearchBar onSearch={handleSearchSpotify}/>

        <button onClick={handleSearchTwo}>example button</button>

        <SearchResults onAdd={addSongToPlaylist} results={filteredResults}/>

        <Playlist setPlaylistName={setPlaylistName} playlistName={playlistName} /*savePlaylist={savePlaylist}*/ alertTest={alertTest} songs={playlistSongs} onRemove={removeSongFromPlaylist}/>

        <button handleClick={alertTest}>CLICK ME</button>

        


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
