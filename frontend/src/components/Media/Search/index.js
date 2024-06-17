import { Link, withRouter  } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import AnimateLetters from '../../AnimatedLetters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; 
import './index.scss'

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedAPI, setSelectedAPI] = useState('IMDB');

    const allowedAPIs = ['IMDB', 'SPOTIFY', 'BOOKS'];

    // add a button that changes the search selection type: spotify, IMDB, goodreads etc.

    const handleAPIChange = (e) => {
        setSearchResults([]);
        setSelectedAPI(e.target.value);
    };
    
    const handleSearch = async (e) => {
        e.preventDefault();
        console.log(`search query: ${searchQuery}`);
        try {
            // const response = await axios.get(`http://localhost:3001/media/new?query=${searchQuery}`);
            const response = await axios.get(`http://localhost:3001/${selectedAPI.toLowerCase()}/search?query=${searchQuery}`);
            const data = response.data; // Extract data
            
            if (data) {
                // Check the selected API and set searchResults accordingly
                if (selectedAPI === 'IMDB') {
                    setSearchResults(data.d); 
                } else if (selectedAPI === 'SPOTIFY') {
                    setSearchResults(data.albums.items);
                } else if (selectedAPI === 'BOOKS') {
                    setSearchResults(data);
                }
                console.log('search results length:', searchResults.length);
                console.log('search results:', searchResults);
                console.log('search results:', searchResults);
            } else {
                console.log('data empty');
            }
            
            
        } catch (error) {
            console.error('Error searching for media:', error);
        }
    };

    return (
        <div className='container about-page'>
            <div className='search-zone'>
                <div className='search-bar'>
                    <div className='search-title'>
                        SEARCH  
                        <select value={selectedAPI} onChange={handleAPIChange} className="api-select">
                            {/* <option value="">Select an option</option> */}
                            {allowedAPIs.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <form className='search-form' onSubmit={handleSearch}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="add media ..."
                        />
                        
                        <button type="submit" className='flat-button find' data-after-text="SEARCH">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </form>
                </div>

                {searchResults.length <= 0 && (
                    <h1>*Fill with table of suggestions*</h1>
                )}

                {searchResults.length > 0 && (
                    <div>
                        {selectedAPI === 'IMDB' ? (
                            <div className='search-results'>
                                <ul>
                                    {searchResults.map((item, index) => {
                                        // default image is also search toggle dependant
                                        const imageUrl = item.i ? item.i.imageUrl : "https://m.media-amazon.com/images/M/MV5BYzZjMTk5NjctMDg1Yy00N2I1LTk1NTUtODcwOWRlOWVkNjlmXkEyXkFqcGdeQXVyMTk2ODc0MjY@._V1_.jpg";
                                        const title = item.l;
                                        const type = item.q;

                                        return (
                                            <li key={index}>
                                                <Link to="/new" state={{ item }}>
                                                    <img src={imageUrl} alt={title} />
                                                </Link>
                                                <div className='title'>
                                                    <h2>{title}</h2>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ) : selectedAPI === 'SPOTIFY' ? (
                            <div className='search-results'>
                                <ul>
                                    {searchResults.map((item, index) => {
                                        // default image is also search toggle dependant
                                        const imageUrl = item.data.coverArt.sources ? item.data.coverArt.sources[2].url : "https://m.media-amazon.com/images/M/MV5BYzZjMTk5NjctMDg1Yy00N2I1LTk1NTUtODcwOWRlOWVkNjlmXkEyXkFqcGdeQXVyMTk2ODc0MjY@._V1_.jpg";
                                        const title = item.data.name;
                                        const artist = item.data.artists.items[0].profile.name;
                                        const type = "music";

                                        return (
                                            <li key={index}>
                                                <Link to="/new" state={{ item }}>
                                                    <img src={imageUrl} alt={title} className='square-image'/>
                                                </Link>
                                                <div className='music-info'>
                                                    <div className='title'>
                                                        {title}
                                                    </div>
                                                    <div className='artist'>
                                                        {artist}
                                                    </div>
                                                </div>
                                               
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ) : selectedAPI === 'BOOKS' ? (
                            <div className='search-results'>
                                <ul>
                                    {searchResults.map((item, index) => {
                                        // Default image or cover image logic for books
                                        let imageUrl = item.imageUrl ? item.imageUrl : "https://m.media-amazon.com/images/M/MV5BYzZjMTk5NjctMDg1Yy00N2I1LTk1NTUtODcwOWRlOWVkNjlmXkEyXkFqcGdeQXVyMTk2ODc0MjY@._V1_.jpg";
                                        
                                        // Remove text between underscores which reformats image size
                                        if (imageUrl && imageUrl.includes("_")) {
                                            imageUrl = imageUrl.replace(/_[^_]*_\./g, "");
                                        }
                                        
                                        const title = item.title;
                                        const author = item.author[0].name;
                                        const type = "book";
                
                                        return (
                                            <li key={index}>
                                                <Link to="/new" state={{ item }}>
                                                    <img src={imageUrl} alt={title}/>
                                                </Link>
                                                <div className='book-info'>
                                                    <div className='title'>
                                                        {title}
                                                    </div>
                                                    <div className='author'>
                                                        {author}
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ) : null}
                    </div>
                )}

                
            </div>
        </div>
    );
}   

export default Search;
