

//This input is a component to be exported to the SearchBar.

import React, { useState } from "react";

function SearchInput(props){
    
    const handleInputChange = (event) => {
        //it gets the prop from the parent Component. This allows to be accessed in App.js and interactuate with other components.
        props.setUserInput(event.target.value)


    }

    return (
        <div>
        <input value={props.userInput} onChange={handleInputChange}></input>
        </div>
    )

}

export default SearchInput