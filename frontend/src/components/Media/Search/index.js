import { Link, withRouter  } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import AnimateLetters from '../../AnimatedLetters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as faSolidBookmark, faList, faListCheck, faMagnifyingGlass, faSave, faSquareCheck, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faRegularBookmark} from '@fortawesome/free-regular-svg-icons';
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

    // image loading consts
    const [recentImageLoaded, setRecentImageLoaded] = useState(recentSearches.map(() => false));

    // watchlisted consts
    const [watchlistedArray, setWatchlistedArray] = useState(recentSearches.map(() => false));

    // TODO: need to check watchlist on load & map watchlistedarray to true if watchlisted already


    useEffect(() => {
        fetchSearches('movie');
     }, []);
     
     const fetchSearches = async (searchType) => {
         try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:3001/search/${user._id}/${searchType}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
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
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:3001/${selectedAPI.toLowerCase()}/search?query=${searchQuery}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
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


    // functions for 'Recent searches' mechanic
    const handleSaveSearch = async (media) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3001/search/add', {
                name: media.title,
                type: media.type,
                coverImage: media.imageUrl,
                userID: user._id,
            }, {
                headers: { Authorization: `Bearer ${token}` }
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

    const handleWatchListAdd = async (media, index) => {
        const { title, imageUrl, type } = media;
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3001/watchlist/add', {
                name: title,
                type: type,
                coverImage: imageUrl,
                userID: user._id,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            console.log('Watchlist item saved:', response.data);
            const newWatchlistedArray = [...watchlistedArray];
            newWatchlistedArray[index] = true;
            setWatchlistedArray(newWatchlistedArray);
        } catch (error) {
            console.error('Error saving watchlist item:', error);
        }
    };

    const toggleWatchListed = async (media, index) => {
        const { title, imageUrl, type } = media;
        const newWatchlistedArray = [...watchlistedArray];

        if(!watchlistedArray[index]){
            try {
                // const token = localStorage.getItem('token');
                // const response = await axios.post('http://localhost:3001/watchlist/add', {
                //     name: title,
                //     type: type,
                //     coverImage: imageUrl,
                //     userID: user._id,
                // }, {
                //     headers: { Authorization: `Bearer ${token}` }
                // });
        
                console.log('Watchlist item saved:');
                newWatchlistedArray[index] = true;
                setWatchlistedArray(newWatchlistedArray);
            } catch (error) {
                console.error('Error saving watchlist item:', error);
            }
        } else {
            try {
                // const token = localStorage.getItem('token');
                // const response = await axios.post('http://localhost:3001/watchlist/add', {
                //     name: title,
                //     type: type,
                //     coverImage: imageUrl,
                //     userID: user._id,
                // }, {
                //     headers: { Authorization: `Bearer ${token}` }
                // });
        
                console.log('Watchlist item removed:');
                newWatchlistedArray[index] = false;
                setWatchlistedArray(newWatchlistedArray);
            } catch (error) {
                console.error('Error saving watchlist item:', error);
            }
        }
        
    };
    
    const handleRecentImageLoad = (index) => {
        const newImageLoaded = [...recentImageLoaded];
        newImageLoaded[index] = true;
        setRecentImageLoaded(newImageLoaded);
    };

    return (
        <div className='container about-page'>
            <div className='search-zone'>
                <div className='search-bar'>
                    <div className='search-api'>
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
                        <div className='recent-search' style={selectedAPI === 'SPOTIFY' ? {height: `${35}vh`} : {height: `${50}vh`}}>
                            <div className='search-title'>RECENT SEARCHES</div>
                            <div className='clear-searches' onClick={removeAllSearch}><FontAwesomeIcon icon={faTrash}/></div>
                            <ul style={{ width: `${recentSearches.length * 22}%` }} className={selectedAPI === 'SPOTIFY' ? 'music-searches' : ''}>
                                {recentSearches.map((item, index) => {
                                    let title = item.name || '';
                                    let imageUrl = item.coverImage || '';
                                    let type = item.type || '';
                                    
                                    return (
                                        <li key={index} style={selectedAPI === 'SPOTIFY' ? {width: `235px`} : {width: `calc(10% - 70px)`}}>
                                            <button className='watchlist-button' onClick={(event) => {
                                                // handleWatchListAdd({ title: item.name, imageUrl: item.coverImage, type: item.type }, index);
                                                toggleWatchListed({ title: item.name, imageUrl: item.coverImage, type: item.type }, index);
                                                
                                            }}>
                                                <FontAwesomeIcon icon={watchlistedArray[index] ? faSolidBookmark : faRegularBookmark} />
                                                
                                            </button>

                                            <button className='close-button' onClick={(event) => handleRemoveSearch(item._id, event)}>
                                                <FontAwesomeIcon icon={faXmark} />  
                                            </button>

                                            <Link to="/new" state={{ media: { title, imageUrl, type } }}>
                                                {/* <img src={imageUrl} alt={title} className={selectedAPI === 'SPOTIFY' ? 'square-image' : ''}/> */}
                                                <div className='image-container' style={selectedAPI === 'SPOTIFY' ? { aspectRatio: `2/2` } : { aspectRatio: `9/16` }}>
                                                    {!recentImageLoaded[index] && <div className='image-loading' />}
                                                    <img
                                                        src={imageUrl}
                                                        alt={title}
                                                        onLoad={() => handleRecentImageLoad(index)}
                                                        style={!recentImageLoaded[index] ? { display: 'none' } : {}}
                                                    />
                                                </div>

                                                <div className='title-container'>
                                                    <div className="title">
                                                        {title}
                                                    </div>
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
                                        imageUrl = item.cover ? (item.cover.includes("_") ? item.cover.replace(/_[^_]*_\./g, "") : item.cover) : imageUrl;
                                        title = item.name;
                                        const author = item.authors[0];
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
                                            {/* <div className='image-container' style={selectedAPI === 'SPOTIFY' ? { aspectRatio: `2/2` } : { aspectRatio: `2/3` }}>
                                                {!imageLoaded[index] && <div className='image-loading' />}
                                                <img
                                                    src={imageUrl}
                                                    alt={title}
                                                    onLoad={() => handleImageLoad(index)}
                                                    style={!imageLoaded[index] ? { display: 'none' } : {}}
                                                />
                                            </div> */}
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
