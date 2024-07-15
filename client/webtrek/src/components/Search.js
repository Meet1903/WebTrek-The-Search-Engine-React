import React, { useState, useEffect } from 'react';
import WebTrekLogo from '../assets/webtrek-logo.png';
import { Link, useNavigate } from 'react-router-dom';

export default function Search() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/search?query=${query}&page=1`);
    };

    return (
        <div className='flex-container'>
            <div className="header">
                <h1>
                    <Link to='/'>
                        <img src={WebTrekLogo} alt="WebTrek" className="webtrek-font" />
                    </Link>
                </h1>
            </div>
            <div className="search-box">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="search-bar"
                        placeholder="Search..."
                        required
                    />
                    <input type="submit" value="Search" className="search-button" onClick={handleSearch} />
                </form>
            </div>
        </div>
    );
};
