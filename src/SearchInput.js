import React, { useState } from "react";

function SearchInput(porps){
    //lo incluiré en el parent component const [userInput, setUserInput] = useState('')
    const handleInputChange = (event) => {
        porps.setUserInput(event.target.value)


    }

    return (
        <div>
        <input value={porps.userInput} onChange={handleInputChange}></input>
        </div>
    )

}

export default SearchInput