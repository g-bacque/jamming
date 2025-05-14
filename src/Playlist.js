import React from "react";

function Playlist(props) {

  const handleChange = (event)=>{
    props.setPlaylistName(event.target.value);
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
      <input onChange={handleChange} value={props.playlistName}></input>

      <ul>
        {props.songs.map((song) => (
          <li key={song.id}>
            <strong>{song.name}</strong> - {song.artists[0].name}
            <button onClick={()=> handleRemove(song.id)}>x</button>
          </li>
        ))}
        
        
        
      </ul>
      <button onClick={props.savePlaylist}>SAVE PLAYLIST</button>
    </div>
  );
}

export default Playlist;