import { Link, withRouter  } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import AnimateLetters from '../../AnimatedLetters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTrash, faX } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; 
import './index.scss'

const Search = ({ user }) => {
    // search logic consts
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    
    // recent search consts
    const [searchesFetched, setSearchesFetched] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);

    // API filtering consts
    const [selectedAPI, setSelectedAPI] = useState('IMDB');
    const allowedAPIs = ['IMDB', 'SPOTIFY', 'BOOKS'];


    useEffect(() => {
        fetchSearches('movie');
     }, []);
 
     const fetchSearches = async (searchType) => {
         try {
            const response = await axios.get(`http://localhost:3001/search/${user._id}/${searchType}`);
            const fetchedSearches = response.data;
            setRecentSearches(fetchedSearches.reverse()); 
            console.log('recent searches: ', recentSearches);
            setSearchesFetched(true);
         } catch (error) {
            console.error('Error fetching user searches:', error);
         }
     };

    const handleAPIChange = (e) => {
        setSearchResults([]);
        setRecentSearches([]);
        // conduct new recent searches call, based on the API
        switch(e.target.value) {
            case 'IMDB':
                fetchSearches('movie');
              break;
            case 'SPOTIFY':
                fetchSearches('music');
              break;
            case 'BOOKS':
                fetchSearches('book');
                break;
            default:
                console.warn('Unknown API selected:', e.target.value);
                break;
          } 

        setSelectedAPI(e.target.value);
    };
    
    const handleSearch = async (e) => {
        e.preventDefault();
        console.log(`search query: ${searchQuery}`);
        try {
            const response = await axios.get(`http://localhost:3001/${selectedAPI.toLowerCase()}/search?query=${searchQuery}`);
            const data = response.data; // Extract data
            
            if (data) {
                let filteredResults = [];
    
                // Filter results based on the selected API
                if (selectedAPI === 'IMDB') {
                    filteredResults = data.d.filter(item => item.q && item.qid); 
                    setSearchResults(filteredResults);
                } else if (selectedAPI === 'SPOTIFY') {
                    setSearchResults(data.albums.items);
                } else if (selectedAPI === 'BOOKS') {
                    setSearchResults(data);
                }
    
                console.log('search results length:', filteredResults.length);
                console.log('search results:', filteredResults);
            } else {
                console.log('data empty');
            }
            
        } catch (error) {
            console.error('Error searching for media:', error);
        }
    };

    const handleSaveSearch = async (media) => {
        try {
            const response = await axios.post('http://localhost:3001/search/add', {
                name: media.title,
                type: media.type,
                coverImage: media.imageUrl,
                // creatorID: media.creatorID || null,
                userID: user._id, 
            });
    
            console.log('Search item saved:', response.data);
        } catch (error) {
            console.error('Error saving search item:', error);
        }
    };

    const handleRemoveSearch = (searchId,  event = null) => {
        console.log(`Remove search with ID: ${searchId}`);
        
        if (event) {
            event.stopPropagation();
            // Remove search from currently loaded list (frontend)
            const updatedSearches = recentSearches.filter(item => item._id !== searchId);
            console.log('updated searches: ', updatedSearches);
            setRecentSearches(updatedSearches);
        }

        // Use API to remove search from database
        axios.delete(`http://localhost:3001/search/${searchId}`)
        .then(response => {
            console.log('Search removed from database:', response.data);
        })
        .catch(error => {
            console.error('Error removing search from database:', error);
        });
    };

    const removeAllSearch = () => {
        const searchesToRemove = [...recentSearches];
    
        searchesToRemove.forEach(item => {
            handleRemoveSearch(item._id);
        });

        setRecentSearches([]);
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
                
                {searchResults.length <= 0 && (  // displaying the recent search history
                    <div>
                        <div className='recent-search'>
                            <div className='search-title'>RECENT SEARCHES</div>
                            <div className='clear-searches' onClick={removeAllSearch}><FontAwesomeIcon icon={faTrash}/></div>
                            <ul style={{ width: `${recentSearches.length * 22}%` }}>
                                {recentSearches.map((item, index) => {
                                    let title = item.name || '';
                                    let imageUrl = item.coverImage || '';
                                    let type = item.type || '';
                                    
                                    return (
                                        <li key={index}>
                                            <button className='close-button' onClick={(event) => handleRemoveSearch(item._id, event)}>
                                                <FontAwesomeIcon icon={faX} />
                                            </button>
                                            <Link to="/new" state={{ media: { title, imageUrl, type } }}>
                                                <img src={imageUrl} alt={title} className={type === 'Music' ? 'square-image' : ''} />
                                                <div className="title">
                                                    <span>{title}</span>
                                                </div>
                                            
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                )}

                {searchResults.length > 0 && (  // displaying search results
                    <div className='search-results'>
                        <ul>
                            {searchResults.map((item, index) => {
                                let media = {};
                                let imageUrl = "https://m.media-amazon.com/images/M/MV5BYzZjMTk5NjctMDg1Yy00N2I1LTk1NTUtODcwOWRlOWVkNjlmXkEyXkFqcGdeQXVyMTk2ODc0MjY@._V1_.jpg";
                                let title = "";
                                let mediaInfo = null;
                    
                                switch (selectedAPI) {
                                    case 'IMDB':
                                        imageUrl = item.i ? item.i.imageUrl : imageUrl;
                                        title = item.l;

                                        let visMediaType = '';
                                        if (item.q === 'TV series') {
                                            visMediaType = 'Show';
                                        } else if (item.q === 'TV movie' || item.q === 'feature') {
                                            visMediaType = 'Movie';
                                        } else {
                                            visMediaType = item.q; 
                                        }

                                        media = { title, imageUrl, type: visMediaType };
                                        mediaInfo = (
                                            <div className='title'>
                                                <h2>{title}</h2>
                                            </div>
                                        );
                                        break;
                    
                                    case 'SPOTIFY':
                                        imageUrl = item.data.coverArt.sources ? item.data.coverArt.sources[2].url : imageUrl;
                                        title = item.data.name;
                                        const artist = item.data.artists.items[0].profile.name;
                                        media = { title, imageUrl, artist, type: "Music" };
                                        mediaInfo = (
                                            <div className='music-info'>
                                                <div className='title'>{title}</div>
                                                <div className='artist'>{artist}</div>
                                            </div>
                                        );
                                        break;
                    
                                    case 'BOOKS':
                                        imageUrl = item.imageUrl ? (item.imageUrl.includes("_") ? item.imageUrl.replace(/_[^_]*_\./g, "") : item.imageUrl) : imageUrl;
                                        title = item.title;
                                        const author = item.author[0].name;
                                        media = { title, imageUrl, author, type: "Book" };
                                        mediaInfo = (
                                            <div className='book-info'>
                                                <div className='title'>{title}</div>
                                                <div className='author'>{author}</div>
                                            </div>
                                        );
                                        break;
                    
                                    default:
                                        break;
                                }
                    
                                return (
                                    <li key={index}>
                                        <Link to="/new" state={{ media }} onClick={() => handleSaveSearch(media)}>
                                            <img src={imageUrl} alt={title} className={selectedAPI === 'SPOTIFY' ? 'square-image' : ''} />
                                        </Link>
                                        {mediaInfo}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

                
            </div>
        </div>
    );
}   

export default Search;
