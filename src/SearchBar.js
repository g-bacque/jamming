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