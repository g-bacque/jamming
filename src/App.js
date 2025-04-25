import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchBar.js'
import SearchResults from './SearchResults.js';
import mockList from './mockList.js';

function App() {
  const [userInput, setUserInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const handleSearch = (inputValue) => {
    setUserInput(inputValue);

    const searchTerm = inputValue.toLowerCase();

    const results = mockList.filter((song) =>
    Object.values(song).some((value) => String(value).toLowerCase().includes(searchTerm)));

    setFilteredResults(results);

  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <h2>JAMMING</h2>

        <SearchBar onSearch={handleSearch}/>

        <SearchResults results={filteredResults}/>

        

        <p> This is my first change to the React App.</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
