import React, { useState } from 'react';

function Search() {
    const [files, setFiles] = useState([])
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };
    if (searchInput.length > 0) {
        files.filter((country) => {
            return files.name.match(searchInput);
        });
    }
    <input
        type="text"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput} />
}

export default Search;