import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import MediaList from '../MediaList';
import axios from 'axios';
// import './index.scss'

const Watchlist = ({ user }) => {
    const [watchlist, setWatchlist] = useState([]);
    const [search, setSearch] = useState(''); 
    const [watchlistFetched, setWatchlistFetched] = useState(false);
    const [filteredWatchlist, setFilteredWatchlist] = useState(watchlist);
    const navigate = useNavigate();

    useEffect(() => {
       fetchWatchlist();
    }, []);

    const fetchWatchlist = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/media/${user._id}/watchlist`);
            setWatchlist(response.data);
            setWatchlistFetched(true);
        } catch (error) {
            console.error('Error fetching user watchlist:', error);
        }
    };

    useEffect(() => {
        if (watchlistFetched) {
            setFilteredWatchlist(watchlist);
        }
    }, [watchlistFetched]);
    
    return (
        <div className='container'>
            <div className='media-zone'>
                <span className="media-search-bar">
                    <h1>
                        WATCH LIST&nbsp;
                    </h1>
                    <input
                        type="text"
                        placeholder="Search watchlist ..."
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                    />
                </span> 

                <MediaList mediaItems={filteredWatchlist} mediaType="watchlist" />
            </div>
        </div>
    );
}   

export default Watchlist;