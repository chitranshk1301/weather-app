import React, { useState } from 'react';

const Search = ({ onSearch }) => {
 const [input, setInput] = useState('');

 const search = (event) => {
    if (event.key === 'Enter') {
      onSearch(input);
      setInput('');
    }
 };

 return (
    <div className="search-container">
      <input
        type="text"
        className="city-search"
        placeholder="Enter City Name.."
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyPress={search}
      />
    </div>
 );
};

export default Search;
