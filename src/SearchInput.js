import React, { useState } from "react";

function SearchInput(props){
    //lo incluiré en el parent component const [userInput, setUserInput] = useState('')
    const handleInputChange = (event) => {
        props.setUserInput(event.target.value)


    }

    return (
        <div>
        <input value={props.userInput} onChange={handleInputChange}></input>
        </div>
    )

}

export default SearchInput