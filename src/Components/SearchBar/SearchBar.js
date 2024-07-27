import React from 'react';
import './SearchBar.css';

const SearchBar = ({ setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Pesquisar Heróis"
      className="search-bar"
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchBar;
