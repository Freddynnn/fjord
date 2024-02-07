import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import AnimateLetters from '../AnimatedLetters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; 
import './index.scss'

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent default form submission

        console.log(`search query: ${searchQuery}`);

        try {
            const response = await axios.get(`http://localhost:3001/media/new?query=${searchQuery}`);
            const data = response.data; // Extract data
            if(data){
                setSearchResults(data.d); // Update search results
                console.log('search results:', data);
            }else{
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
                    <h1>
                        SEARCH IMDB:
                    </h1>
                    <form onSubmit={handleSearch}>
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
                    <h1>body test</h1>
                )}

                {searchResults.length > 0 && (
                    <div className='search-results'>
                        <ul>
                            {searchResults.map((item, index) => (
                                item && (
                                <li key={index}>  
                                    
                                    {item.i ? (
                                        <img src={item.i.imageUrl} alt={item.l} />
                                    ) : (
                                        <img src="https://m.media-amazon.com/images/M/MV5BYzZjMTk5NjctMDg1Yy00N2I1LTk1NTUtODcwOWRlOWVkNjlmXkEyXkFqcGdeQXVyMTk2ODc0MjY@._V1_.jpg" alt="Default Image" />
                                    )}
                                    <div className='title'>
                                        <h2>{item.l}</h2>
                                    </div>  
                                </li>
                                )
                            ))}
                        </ul>
                    </div>
                )}
                
            </div>
        </div>
    );
}   

export default Search;
