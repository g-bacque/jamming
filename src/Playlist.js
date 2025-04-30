import React, { useState, onChange } from "react";

function Playlist(props) {

  const [playlistLocalName, setPlaylistLocalName] = useState('');

  const handleChange = (event)=>{
    setPlaylistLocalName(event.target.value)
  }

  if (props.songs.length === 0) {
    return <p>Tu playlist está vacía.</p>;
  }


  const handleRemove = (id) => {
    props.onRemove(id);
  }

  return (
    <div >
        <h6>Input playlist name</h6>
      <input onChange={handleChange}></input>
      <h4>{playlistLocalName}</h4>
      <ul>
        {props.songs.map((song) => (
          <li key={song.id}>
            <strong>{song.name}</strong> - {song.artist} ({song.album})
            <button onClick={()=> handleRemove(song.id)}>x</button>
          </li>
        ))}
        
        
        
      </ul>
      <button onClick={props.savePlaylist}>SAVE PLAYLIST</button>
    </div>
  );
}

export default Playlist;