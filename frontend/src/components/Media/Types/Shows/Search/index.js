import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import MediaList from '../../../MediaList';
import MediaFilters from '../../../MediaFilters';
import axios from 'axios';
import './index.scss'

const Shows = ({ user }) => {
    const [shows, setShows] = useState([]);
    const [search, setSearch] = useState(''); 
    const [showsFetched, setShowsFetched] = useState(false);
    const [filteredShows, setFilteredShows] = useState(shows);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchShows();
    }, []);

    const fetchShows = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:3001/media/${user._id}/show`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            setShows(response.data);
            setShowsFetched(true);
            console.log('Shows fetched:', response.data); 
        } catch (error) {
            console.error('Error fetching user shows:', error);
        }
    };

    useEffect(() => {
        if (showsFetched) {
            setFilteredShows(shows);
        }
    }, [showsFetched]);

    return (
        <div className='container'>
            <div className='media-zone'>
                <span className="media-search-bar">
                    <h1>
                        SHOWS
                    </h1>
                    <input
                        type="text"
                        placeholder="Search shows ..."
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                    />
                </span>

                <MediaFilters 
                    initialMedia={shows}
                    search={search}
                    onFilter={setFilteredShows}
                />
                <MediaList mediaItems={filteredShows} mediaType="shows" />
                {/* {showsFetched ? (
                    <MediaList mediaItems={filteredShows} mediaType="shows" />
                ) : (
                    <p>Loading shows...</p> 
                )} */}
            </div>
        </div>
    );
}   

export default Shows;