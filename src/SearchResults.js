import React, {useState} from "react";

function SearchResults(props){
    if(props.results.length === 0){
        return <p>No hay resultados.</p>
    };

    const handleClick = (song)=>{
        props.onAdd(song);
    }

    return (
        <ul>
            {props.results.map((song) => (
                <li key={song.id}>
                    <strong>{song.name}</strong> - {song.artists[0].name}
                    <button onClick={()=> handleClick(song)}>+</button>
                </li>
            ))}
        </ul>
    )
}

export default SearchResults;