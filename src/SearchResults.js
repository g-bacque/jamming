import React, {useState} from "react";

function SearchResults(props){
    if(props.results.length === 0){
        return <p>No hay resultados.</p>
    }

    return (
        <ul>
            {props.results.map((song) => (
                <li key={song.id}>
                    <strong>{song.name}</strong> - {song.artist} ({song.album})
                </li>
            ))}
        </ul>
    )
}

export default SearchResults;