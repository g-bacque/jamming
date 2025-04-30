//This component is to be export to main App. Its purpose is to act as a filter for the user. Whetever word typed in the input should be sunmited after clicking on the search button.

import React, { useState } from "react";
import SearchButton from "./SearchButton";
import SearchInput from "./SearchInput";

function SearchBar(props){

    const [localInput, setLocalInput] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSearch(localInput);
    }

    return (
        <form onSubmit={handleSubmit}>
        <SearchInput userInput={localInput} setUserInput={setLocalInput} />
        <SearchButton />
        </form>
    )

}

export default SearchBar