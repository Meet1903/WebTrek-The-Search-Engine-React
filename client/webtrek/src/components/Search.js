import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WebTrekLogoFont from '../assets/webtrek-font.png';

export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [nextPage, setNextPage] = useState(false);
    const [prevPage, setPrevPage] = useState(false);

    const fetchResults = async (query, page = 1) => {
        try {
            const response = await axios.get(`/search`, {
                params: { query, page }
            });
            const data = response.data;
            setResults(data.results);
            //   setCurrentPage(data.current_page);
            setNextPage(data.next_page);
            setPrevPage(data.prev_page);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const handleSearch = (event) => {
        event.preventDefault();
        fetchResults(query, currentPage);
    };

    useEffect(() => {
        if (query) {
            fetchResults(query, currentPage);
        }
    }, [currentPage]);

    return (
        <div className='serach-container'>
            <div className="header">
                <h1>
                    <a href="/" className="title-name">
                        <img src={WebTrekLogoFont} alt="WebTrek" className="webtrek-font" />
                    </a>
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
            <div className='search-result-container'>
                <h2>Search Results for "{query}"</h2>
                <div className="results-list">
                    {results.length > 0 ? (
                        <>
                            {results.map((result, index) => (
                                <div className="result-item" key={index}>
                                    <a href={result.url} target="_blank" className="result-title" rel="noopener noreferrer">
                                        {result.title}
                                    </a>
                                    <br />
                                    <span className="result-domain">{result.domain}</span>
                                    <p className="result-snippet">{result.snippet}</p>
                                </div>
                            ))}
                            <div className="pagination">
                                <div className="button-2-container" style={{ marginTop: '20px' }}>
                                    {prevPage && (
                                        <button onClick={() => { setCurrentPage(currentPage - 1) }} className="button-2">
                                            &lt;&lt; Previous
                                        </button>
                                    )}
                                    {nextPage && (
                                        <button onClick={() => { setCurrentPage(currentPage + 1) }} className="button-2">
                                            Next &gt;&gt;
                                        </button>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <p>No results found for "{query}".</p>
                    )}
                </div>
            </div>
        </div>
    );
};
