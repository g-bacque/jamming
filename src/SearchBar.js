import React, { useState } from "react";
import SearchButton from "./SearchButton";
import SearchInput from "./SearchInput";
import mockList from "./mockList";

function SearchBar(){


    const [userInput, setUserInput] = useState('');
    const [userSubmit, setUserSubmit] = useState('');

    const [userInputArray, setUserInputArray] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        for(const i in mockList){
            for(const y in mockList[i]){
                if(mockList[i][y] === userInput){
                    setUserInputArray([...userInputArray, userInput])
                }
            } }   
        alert(userInputArray);
    }

    return (
        <div>
        <h4>Write:</h4>
        <form onSubmit={handleSubmit}>
        <SearchInput userInput={userInput} setUserInput={setUserInput} />
        <SearchButton />
        </form>
        </div>
    )

}

export default SearchBar